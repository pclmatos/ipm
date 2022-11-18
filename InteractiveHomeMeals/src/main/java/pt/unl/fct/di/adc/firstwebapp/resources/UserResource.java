package pt.unl.fct.di.adc.firstwebapp.resources;

import java.util.ArrayList;
import java.util.List;
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
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;

import pt.unl.fct.di.adc.firstwebapp.util.FilterData;
import pt.unl.fct.di.adc.firstwebapp.util.GetIngredientData;
import pt.unl.fct.di.adc.firstwebapp.util.GetPantryData;
import pt.unl.fct.di.adc.firstwebapp.util.LoginData;
import pt.unl.fct.di.adc.firstwebapp.util.RecipeData;
import pt.unl.fct.di.adc.firstwebapp.util.RegisterData;
import pt.unl.fct.di.adc.firstwebapp.util.info.PantryEntry;
import pt.unl.fct.di.adc.firstwebapp.util.info.RecipeInfo;
import pt.unl.fct.di.adc.firstwebapp.util.SearchRecipeData;
import pt.unl.fct.di.adc.firstwebapp.util.UpdatePantry;
import pt.unl.fct.di.adc.firstwebapp.util.entity.User;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UserResource {
	private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	private final Gson g = new Gson();

	// kinds of the database
	private static final String USER = "User";
	private static final String RECIPE = "Recipe";
	private static final String INGREDIENT = "Ingredient";

	// attributes
	private static final String USERNAME = "username";
	private static final String PASSWORD = "password";
	private static final String PANTRY = "pantry";
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

	public UserResource() {
	}

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response doRegister(RegisterData data) {

		Transaction txn = datastore.newTransaction();

		User u = new User(data.username,data.password);

		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try {
			Entity user = txn.get(userKey);

			if (user != null) {
				txn.rollback();
				LOG.fine(data.username + " already has registered");
				return Response.status(Status.FORBIDDEN).build();
			} else if (!data.password.equals(data.confirmation)) {
				txn.rollback();
				LOG.fine("incorrect confirmation password");
				return Response.status(Status.FORBIDDEN).build();
			} else {
				
				String pantryJson = g.toJson(u.getPantry());
				user = Entity.newBuilder(userKey)
						.set(USERNAME, u.getUsername())
						.set(PASSWORD, DigestUtils.sha512Hex(u.getPassword()))
						.set(PANTRY, pantryJson)
						.build();

				txn.add(user);
				txn.commit();
				LOG.fine("Successful registration");
				return Response.ok("valid registration").build();
			}
		} finally {
			if (txn.isActive()) {
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

		try {
			Entity user = datastore.get(userKey);

			if (user != null) {
				String hashedPwd = user.getString(PASSWORD);

				if (hashedPwd.equals(DigestUtils.sha512Hex(data.password))) {

					txn.commit();
					LOG.info("User logged in: " + data.username);
					return Response.ok("valid login").build();

				} else {
					LOG.warning("Wrong password for user:" + data.username);
					txn.rollback();
					return Response.status(Status.FORBIDDEN).entity("Wrong password.").build();
				}
			} else {
				LOG.warning("User: " + data.username + " does not exist");
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity("User: " + data.username + " does not exist.").build();
			}
		} finally {
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

			while (recipe != null) {
				recipeKey = datastore.newKeyFactory().setKind(RECIPE).newKey(getUniqueId());
				recipe = datastore.get(recipeKey);
			}

			if (user == null) {
				LOG.warning("User: " + data.author + " does not exist");
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity("User: " + data.author + " does not exist.").build();
			} else {
				for (int i = 1; i < data.ingredients.length; i += 2) {
					ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(data.ingredients[i]);
					ingredient = datastore.get(ingredientKey);

					if (ingredient != null) {
						if (!ingredient.getBoolean(ISVEGETARIAN)) {
							isVegetarian = false;
						}
						if (!ingredient.getBoolean(ISVEGAN)) {
							isVegan = false;
						}
						if (!ingredient.getBoolean(ISKOSHER)) {
							isKosher = false;
						}
						if (!ingredient.getBoolean(ISGLUTENFREE)) {
							isGlutenFree = false;
						}
						if (!ingredient.getBoolean(ISLACTOSEFREE)) {
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

		} finally {
			if (txn.isActive())
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
		
		filteredRecipes = filtering(recipeList, data.ingredients, data.vegetarian, data.vegan, data.kosher, data.lactoseFree, data.glutenFree); 
		
		return Response.ok(g.toJson(filteredRecipes)).build();
	}
	
	
	public List<RecipeInfo> filtering(List<RecipeInfo> recipes, List<String> ingredients, boolean vegetarian, boolean vegan, boolean kosher, 
			boolean lactoseFree, boolean glutenFree) {
		if (recipes.size() == 0) {
			return recipes;
		}
		
		for(int i = 0; i < recipes.size(); i++) {
			if(vegetarian && !recipes.get(i).isVegetarian) {
				recipes.remove(i);
				i--;
			}
			else if(vegan && !recipes.get(i).isVegan) {
				recipes.remove(i);
				i--;
			}
			else if(kosher && !recipes.get(i).isKosher) {
				recipes.remove(i);
				i--;
			}
			else if(lactoseFree && !recipes.get(i).isLactoseFree) {
				recipes.remove(i);
				i--;
			}
			else if(glutenFree && !recipes.get(i).isGlutenFree) {
				recipes.remove(i);
				i--;
			}
			
		}
		
		for(int i=0; i<recipes.size(); i++) {
			String[] auxIngredients = recipes.get(i).ingredients.split(" ");
			List<String> tempIngredients = new ArrayList<>();
			for(int j=0; j<auxIngredients.length; j++) {
				tempIngredients.add(auxIngredients[j]);
			}
			if(!tempIngredients.containsAll(ingredients)) {
				recipes.remove(i);
				i--;
			}
		}
		
		return recipes;
	}

	public RecipeInfo recipeInfoBuilder(Entity recipe) {
		return new RecipeInfo(recipe.getKey().getName(), recipe.getString(AUTHOR), recipe.getString(CALORIES), recipe.getString(CATEGORY), recipe.getString(DESCRIPTION), 
				recipe.getString(DIFFICULTY), recipe.getString(INGREDIENTS), recipe.getString(RECIPENAME), recipe.getBoolean(ISGLUTENFREE), 
				recipe.getBoolean(ISKOSHER), recipe.getBoolean(ISLACTOSEFREE),recipe.getBoolean(ISVEGAN), recipe.getBoolean(ISVEGETARIAN));	
	}

	@POST
	@Path("/addExistingIngredients")
	public Response addExistingIngredients() {
		LOG.fine("Adding all ingredients to db");
		
		String fruits[] = {"apple", "banana", "pear", "strawberry", "grape", "watermelon", "orange", "blueberry", "lemon", "peach", "avocado", "pineapple", "cherry", "cantaloupe", "raspberry", "lime", "blackberry", "clementine", "mango", "plum", "kiwi"};
		String vegetables[] = {"potato", "tomato", "onion", "carrot", "bell_pepper", "broccoli", "cucumber", "lettuce", "celery", "mushroom", "garlic", "spinach", "green_bean", "cabbage", "sweet_potato", "green_onion", "cauliflower", "aspargo", "peas", "basil"};
		String meat[] = {"pork_meat", "chicken_meat", "beef", "lamb_meat", "goat_meat", "turkey", "duck_meat", "buffalo_meat", "goose_meat", "rabbit_meat"};
		String seaFood[] = {"shrimp", "tuna", "salmon", "tilapia", "catfish", "crab", "cod", "clam", "pangasius"};
		String others[] = {"egg", "milk", "chocolate", "sugar", "salt", "pepper", "cinnamon", "cream", "olive_oil", "tomato_sauce", "soy_sauce", "hot_sauce", "oregano", "paprika", "curry", "cheese", "butter", "yogurt"};
		String cereals[] = {"bread", "croissant", "grain", "oat", "rice", "pasta", "quinoa", "corn", "lentils"};
		
		Transaction txn = datastore.newTransaction();

		try {
			Key ingredientKey;
			Entity ingredient;

			for (int i = 0; i < fruits.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(fruits[i]);
				ingredient = datastore.get(ingredientKey);
				if (ingredient == null) {
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

			for (int i = 0; i < vegetables.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(vegetables[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
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

			for (int i = 0; i < meat.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(meat[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
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

			for (int i = 0; i < seaFood.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(seaFood[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
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

			for (int i = 0; i < cereals.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(cereals[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
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

			for (int i = 0; i < others.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(others[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
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
		} finally {
			if (txn.isActive())
				txn.rollback();
		}
	}

	@GET
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchRecipe(SearchRecipeData data) {
		LOG.fine("Searching for recipe " + data.searchKey);

		Transaction txn = datastore.newTransaction();

		Key searchKey = datastore.newKeyFactory().setKind(RECIPE).newKey(data.searchKey);

		try {
			Entity recipe = datastore.get(searchKey);

			if (recipe != null) {
				txn.commit();
				return Response.ok(recipe).build();
			} else {
				txn.rollback();
				return Response.status(Status.NOT_FOUND).build();
			}
		} finally {
			if (txn.isActive())
				txn.rollback();
		}
	}

	@GET
	@Path("/pantry")
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response getMyPantry(GetPantryData data) {

		Transaction txn = datastore.newTransaction();

		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try {
			Entity user = datastore.get(userKey);

			if (user != null) {
				List<PantryEntry> pantry = g.fromJson(user.getString(PANTRY), List.class);
				txn.commit();
				return Response.ok(pantry).build();
			} else {
				txn.rollback();
				return Response.status(Status.NOT_FOUND).build();
			}

		} finally {
			if (txn.isActive())
				txn.rollback();
		}
	}

	@POST
	@Path("/pantry/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response updatePantry(UpdatePantry data){

		Transaction txn = datastore.newTransaction();

		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try{

			Entity user = datastore.get(userKey);

			if(user != null){
				List<PantryEntry> pantry = g.fromJson(user.getString(PANTRY), List.class);
				for(PantryEntry entry: data.entries){
					for(PantryEntry e: pantry){
						if(entry.getIngredient().equals(e.getIngredient())){
							e.setCount(e.getCount() + entry.getCount());
						}
					}
				}

				String updatedPantry = g.toJson(pantry);

				Entity updatedUser = Entity.newBuilder(userKey)
										.set(USERNAME, data.username)
										.set(PASSWORD, DigestUtils.sha512Hex(user.getString(PASSWORD)))
										.set(PANTRY, updatedPantry)
										.build();

				txn.commit();
				LOG.fine("Pantry updated successfully");
				return Response.ok(updatedUser).build();
			} else {
				txn.rollback();
				LOG.fine("Something wrong happened. Update failed.");
				return Response.status(Status.BAD_REQUEST).build();
			}

		}finally{
			if(txn.isActive())
				txn.rollback();
		}

	}
	
	@GET
	@Path("/pantry/ingredient")
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response getIngredientInPantry(GetIngredientData data) {
		
		Transaction txn = datastore.newTransaction();
		
		Key key = datastore.newKeyFactory().setKind(USER).newKey(data.username);
		
		try {
			
			Entity user = datastore.get(key);
			
			if(user != null) {
				
				List<PantryEntry> pantry = g.fromJson(user.getString(PANTRY), List.class);

				for(PantryEntry entry: pantry){
					if(entry.getIngredient().equalsIgnoreCase(data.ingredient)){
						txn.commit();
						return Response.ok(entry).build();
					}
				}

			}

			return Response.status(Status.NOT_FOUND).build();
			
		} finally {
			if(txn.isActive())
				txn.rollback();
		}
		
	}

	public String ingredientsToString(String[] ingredients) {
		String aux = "";
		for (int i = 0; i < ingredients.length; i++) {
			if (i != ingredients.length - 1) {
				aux += ingredients[i] + " ";
			} else {
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
