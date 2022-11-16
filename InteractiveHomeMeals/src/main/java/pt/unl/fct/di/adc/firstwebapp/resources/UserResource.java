package pt.unl.fct.di.adc.firstwebapp.resources;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import javax.print.attribute.standard.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.digest.DigestUtils;

import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.EntityQuery.Builder;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.Filter;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;

import pt.unl.fct.di.adc.firstwebapp.util.FilterData;
import pt.unl.fct.di.adc.firstwebapp.util.LoginData;
import pt.unl.fct.di.adc.firstwebapp.util.RecipeData;
import pt.unl.fct.di.adc.firstwebapp.util.RegisterData;
import pt.unl.fct.di.adc.firstwebapp.util.info.RecipeInfo;
import pt.unl.fct.di.adc.firstwebapp.util.SearchRecipeData;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UserResource {
	private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	private final Gson g = new Gson();

	//kinds of the database
	private static final String USER = "User";
	private static final String RECIPE = "Recipe";
	private static final String INGREDIENT = "Ingredient";
	
	//attributes
	private static final String USERNAME= "username";
	private static final String PASSWORD = "password";
	private static final String AUTHOR = "author";
	private static final String DESCRIPTION = "description";
	private static final String INGREDIENTS = "ingredients";
	private static final String RECIPENAME = "name";
	private static final String ISVEGETARIAN = "isVegetarian";
	private static final String ISVEGAN = "isVegan";
	private static final String ISKOSHER = "isKosher";
	private static final String ISGLUTENFREE = "isGlutenFree";
	private static final String ISLACTOSEFREE = "isLactoseFree";
	private static final String CATEGORY = "category";
	private static final String CALORIES = "calories";
	private static final String DIFFICULTY = "difficulty";
	
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

		boolean isVegetarian = true, isVegan = true, isKosher = true, isGlutenFree = true, isLactoseFree = true;
		Key recipeKey = datastore.newKeyFactory().setKind(RECIPE).newKey(getUniqueId());
		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.author);
		
		Transaction txn = datastore.newTransaction();
		
		try {
			Key ingredientKey;
			Entity ingredient;
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
				for(int i = 1; i < data.ingredients.length; i+=2) {
					ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(data.ingredients[i]);
					ingredient = datastore.get(ingredientKey);
					
					if(ingredient != null) {
						if(!ingredient.getBoolean(ISVEGETARIAN)) {
							isVegetarian = false;
						}
						if(!ingredient.getBoolean(ISVEGAN)) {
							isVegan = false;
						}
						if(!ingredient.getBoolean(ISKOSHER)) {
							isKosher = false;
						}
						if(!ingredient.getBoolean(ISGLUTENFREE)) {
							isGlutenFree = false;
						}
						if(!ingredient.getBoolean(ISLACTOSEFREE)) {
							isLactoseFree = false;
						}
					}
				}
				
				recipe = Entity.newBuilder(recipeKey)
					.set(RECIPENAME, data.recipeName)
					.set(AUTHOR, data.author)
					.set(DESCRIPTION, data.description)
					.set(ISVEGETARIAN, isVegetarian)
					.set(ISVEGAN, isVegan)
					.set(ISKOSHER, isKosher)
					.set(ISGLUTENFREE, isGlutenFree)
					.set(ISLACTOSEFREE, isLactoseFree)
					.set(CATEGORY, data.category)
					.set(CALORIES, data.calories)
					.set(DIFFICULTY, data.difficulty)
					.set(INGREDIENTS, ingredientsToString(data.ingredients))
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
	
	@POST
	@Path("/filterSearching")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response filterSearching(FilterData data) {
		LOG.info("filtering recipes");
		
		Query<Entity> recipeQuery = Query.newEntityQueryBuilder().setKind(RECIPE).build();
		QueryResults<Entity> recipes = datastore.run(recipeQuery);
		List<RecipeInfo> recipeList = new ArrayList<>();
		List<RecipeInfo> filteredRecipes = new ArrayList<>();
		
		
		recipes.forEachRemaining((recipe) -> {
			recipeList.add(recipeInfoBuilder(recipe));
		});
		
		filteredRecipes = filtering(recipeList, data.vegetarian, data.vegan, data.kosher, data.lactoseFree, data.glutenFree); 
		
		return Response.ok(g.toJson(filteredRecipes)).build();
	}
	
	
	public List<RecipeInfo> filtering(List<RecipeInfo> recipes, boolean vegetarian, boolean vegan, boolean kosher, 
			boolean lactoseFree, boolean glutenFree) {
		List<RecipeInfo> temp = recipes;
		if(recipes.size() == 0) {
			return recipes;
		}
		
		for(int i = 0; i < recipes.size(); i++) {
			if(vegetarian && !recipes.get(i).isVegetarian) {
				temp.remove(i);
				i--;
			}
			else if(vegan && !recipes.get(i).isVegan) {
				temp.remove(i);
				i--;
			}
			else if(kosher && !recipes.get(i).isKosher) {
				temp.remove(i);
				i--;
			}
			else if(lactoseFree && !recipes.get(i).isLactoseFree) {
				temp.remove(i);
				i--;
			}
			else if(glutenFree && !recipes.get(i).isGlutenFree) {
				temp.remove(i);
				i--;
			}
		}
		
		return temp;
	}
	
	public RecipeInfo recipeInfoBuilder(Entity recipe) {
		return new RecipeInfo(recipe.getString(AUTHOR), recipe.getString(CALORIES), recipe.getString(CATEGORY), recipe.getString(DESCRIPTION), 
				recipe.getString(DIFFICULTY), recipe.getString(INGREDIENTS), recipe.getString(RECIPENAME), recipe.getBoolean(ISGLUTENFREE), 
				recipe.getBoolean(ISKOSHER), recipe.getBoolean(ISLACTOSEFREE),recipe.getBoolean(ISVEGAN), recipe.getBoolean(ISVEGETARIAN));	
	}
	
	@POST
	@Path("/addExistingIngredients")
	public Response addExistingIngredients() {
		LOG.fine("Adding all ingredients to db");
		
		String fruits[] = {"apple", "banana", "pear", "strawberry", "grape", "watermelon", "orange", "blueberry", "lemon", "peach", "avocado", "pineapple", "cherry", "cantaloupe", "raspberry", "lime", "blackberry", "clementine", "mango", "plum", "kiwi"};
		String vegetables[] = {"potato", "tomato", "onion", "carrot", "bell pepper", "broccoli", "cucumber", "lettuce", "celery", "mushroom", "garlic", "spinach", "green bean", "cabbage", "sweet potato", "green onion", "cauliflower", "aspargo", "peas", "basil"};
		String meat[] = {"pork meat", "chicken meat", "beef", "lamb meat", "goat meat", "turkey", "duck meat", "buffalo meat", "goose meat", "rabbit meat"};
		String seaFood[] = {"shrimp", "tuna", "salmon", "tilapia", "catfish", "crab", "cod", "clam", "pangasius"};
		String others[] = {"egg", "milk", "chocolate", "sugar", "salt", "pepper", "cinnamon", "cream", "olive oil", "tomato sauce", "soy sauce", "hot sauce", "oregano", "paprika", "curry", "cheese", "butter", "yogurt"};
		String cereals[] = {"bread", "croissant", "grain", "oat", "rice", "pasta", "quinoa", "corn", "lentils"};
		
		Transaction txn = datastore.newTransaction();
		
		try {
			Key ingredientKey;
			Entity ingredient;
			
			for(int i = 0; i < fruits.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(fruits[i]);
				ingredient = datastore.get(ingredientKey);
				if(ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey)
						.set(ISVEGETARIAN, true)
						.set(ISVEGAN, true)
						.set(ISKOSHER, true)
						.set(ISGLUTENFREE, true)
						.set(ISLACTOSEFREE, true)
						.build();
			
					txn.add(ingredient);
				}
			}
			
			for(int i = 0; i < vegetables.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(vegetables[i]);
				ingredient = datastore.get(ingredientKey);
				
				if(ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey)
						.set(ISVEGETARIAN, true)
						.set(ISVEGAN, true)
						.set(ISKOSHER, true)
						.set(ISGLUTENFREE, true)
						.set(ISLACTOSEFREE, true)
						.build();
				
					txn.add(ingredient);
				}
			}
			
			for(int i = 0; i < meat.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(meat[i]);
				ingredient = datastore.get(ingredientKey);
				
				if(ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey)
						.set(ISVEGETARIAN, false)
						.set(ISVEGAN, false)
						.set(ISKOSHER, true)
						.set(ISGLUTENFREE, true)
						.set(ISLACTOSEFREE, true)
						.build();
				
					txn.add(ingredient);
				}
			}
			
			for(int i = 0; i < seaFood.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(seaFood[i]);
				ingredient = datastore.get(ingredientKey);
				
				if(ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey)
						.set(ISVEGETARIAN, false)
						.set(ISVEGAN, false)
						.set(ISKOSHER, true)
						.set(ISGLUTENFREE, true)
						.set(ISLACTOSEFREE, true)
						.build();
				
					txn.add(ingredient);
				}
			}
			
			for(int i = 0; i < cereals.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(cereals[i]);
				ingredient = datastore.get(ingredientKey);
				
				if(ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey)
						.set(ISVEGETARIAN, true)
						.set(ISVEGAN, true)
						.set(ISKOSHER, true)
						.set(ISGLUTENFREE, false)
						.set(ISLACTOSEFREE, true)
						.build();
				
					txn.add(ingredient);
				}
			}
			
			for(int i = 0; i < others.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(others[i]);
				ingredient = datastore.get(ingredientKey);
				
				if(ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey)
						.set(ISVEGETARIAN, true)
						.set(ISVEGAN, true)
						.set(ISKOSHER, true)
						.set(ISGLUTENFREE, false)
						.set(ISLACTOSEFREE, true)
						.build();
				
					txn.add(ingredient);
				}
			}
			
			txn.commit();
			return Response.ok("All ingredients added").build();
		}finally {
			if(txn.isActive())
				txn.rollback();
		}
	}

	@GET
	@Path("/home")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchRecipe(SearchRecipeData data){
		LOG.fine("Searching for recipe " + data.searchKey);

		Transaction txn = datastore.newTransaction();

		Key searchKey = datastore.newKeyFactory().setKind(RECIPE).newKey(data.searchKey);

		try{
			Entity recipe = datastore.get(searchKey);

			if(recipe != null){
				return Response.ok(recipe).build();
			} else {
				return Response.status(Status.NOT_FOUND).build();
			}
		} finally {
			if(txn.isActive())
				txn.rollback();
		}
	}

	public String ingredientsToString(String[] ingredients) {
		String aux = "";
		for(int i = 0; i < ingredients.length; i++) {
			if(i != ingredients.length-1) {
				aux += ingredients[i] + " ";
			}
			else {
				aux += ingredients[i];
			}
		}
		return aux;
	}
	
	public String getUniqueId() {
		String uniqueId = UUID.randomUUID().toString();
		return uniqueId;
	}

}
