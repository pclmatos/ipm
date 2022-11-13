package pt.unl.fct.di.adc.firstwebapp.resources;

import java.util.UUID;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.digest.DigestUtils;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;

import pt.unl.fct.di.adc.firstwebapp.util.LoginData;
import pt.unl.fct.di.adc.firstwebapp.util.RecipeData;
import pt.unl.fct.di.adc.firstwebapp.util.RegisterData;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UserResource {
	private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	private final Gson g = new Gson();

	private static final String USER = "User";
	private static final String RECIPE = "Recipe";
	private static final String USERNAME= "username";
	private static final String PASSWORD = "password";
	private static final String AUTHOR = "author";
	private static final String DESCRIPTION = "description";
	private static final String INGREDIENTS = "ingredients";
	private static final String RECIPENAME = "name";
	
	public UserResource() {}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response doRegister(RegisterData data) {
		
		Transaction txn = datastore.newTransaction();

		Key userKey = datastore.newKeyFactory().setKind("User").newKey(data.username);

		try {
			Entity user = txn.get(userKey);
			
			if(user != null) {
				txn.rollback();
				LOG.fine(data.username + " already has registered");
				return Response.status(Status.FORBIDDEN).build();
			}
			else if(!data.password.equals(data.confirmation)) {
				txn.rollback();
				LOG.fine("incorrect confirmation password");
				return Response.status(Status.FORBIDDEN).build();
			}
			else {
				user = Entity.newBuilder(userKey)
						.set(USERNAME, data.username)
						.set(PASSWORD, DigestUtils.sha512Hex(data.password))
						.build();
				
				txn.add(user);
				txn.commit();
				LOG.fine("Successful registration");
				return Response.ok("valid registration").build();
			}
		}
		finally {
			if(txn.isActive()) {
				txn.rollback();
			}
		}
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(LoginData data) {
		LOG.fine("Login attempt by user: " + data.username);

		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.username);
		
		Transaction txn = datastore.newTransaction();
		
		try{
			Entity user = datastore.get(userKey);
			
			if (user != null){
				String hashedPwd = user.getString(PASSWORD);

				if(hashedPwd.equals(DigestUtils.sha512Hex(data.password))) {            
						
						txn.commit();
						LOG.info("User logged in: " + data.username);
						return Response.ok("valid login").build();

					}else {
						LOG.warning("Wrong password for user:" + data.username);
						txn.rollback();
						return Response.status(Status.FORBIDDEN).entity("Wrong password.").build();
					}
			}else{
				LOG.warning("User: " + data.username +" does not exist");
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity("User: " + data.username +" does not exist.").build();
			}
		}finally{
			if (txn.isActive())
				txn.rollback();		
		}
	}
	
	@POST
	@Path("/shareRecipe")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response shareRecipe(RecipeData data) {
		LOG.fine("Share recipe attempt by: " + data.author);

		Key recipeKey = datastore.newKeyFactory().setKind(RECIPE).newKey(getUniqueId());
		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.author);
		
		Transaction txn = datastore.newTransaction();
		
		try {
			Entity user = datastore.get(userKey);
			Entity recipe = datastore.get(recipeKey);
			
			while(recipe != null) {
				recipeKey = datastore.newKeyFactory().setKind(RECIPE).newKey(getUniqueId());
				recipe = datastore.get(recipeKey);
			}
			
			if(user == null) {
				LOG.warning("User: " + data.author +" does not exist");
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity("User: " + data.author +" does not exist.").build();
			}
			else {
				recipe = Entity.newBuilder(recipeKey)
					.set(RECIPENAME, data.recipeName)
					.set(AUTHOR, data.author)
					.set(DESCRIPTION, data.description)
					.set(INGREDIENTS, data.ingredients)
					.build();
			
				txn.add(recipe);
				LOG.info(data.recipeName + " was successfully shared");
				txn.commit();
				return Response.ok("Recipe shared").build();
			}
			
		}finally {
			if(txn.isActive())
				txn.rollback();
		}
	}
	
	public String getUniqueId() {
		String uniqueId = UUID.randomUUID().toString();
		return uniqueId;
	}

}
