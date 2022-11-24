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
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.gson.Gson;

import pt.unl.fct.di.adc.firstwebapp.util.FilterData;
import pt.unl.fct.di.adc.firstwebapp.util.FilterIngredients;
import pt.unl.fct.di.adc.firstwebapp.util.GetIngredientData;
import pt.unl.fct.di.adc.firstwebapp.util.GetPantryData;
import pt.unl.fct.di.adc.firstwebapp.util.LoginData;
import pt.unl.fct.di.adc.firstwebapp.util.RateRecipe;
import pt.unl.fct.di.adc.firstwebapp.util.RecipeData;
import pt.unl.fct.di.adc.firstwebapp.util.RegisterData;
import pt.unl.fct.di.adc.firstwebapp.util.RemoveFromPantry;
import pt.unl.fct.di.adc.firstwebapp.util.info.IngredientInfo;
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
	private static final String PHOTO = "photo";
	private static final String COMPLETEMEAL = "complete meal";
	private static final String LIGHTMEAL = "light meal";
	private static final String INGREDIENT_TYPE = "type";
	private static final String FRUIT = "fruit";
	private static final String VEGETABLE = "vegetable";
	private static final String MEAT = "meat";
	private static final String FISH = "fish";
	private static final String SEA_FOOD = "sea_food";
	private static final String OTHER = "other";
	private static final String CEREAL = "cereal";
	private static final String RATING = "rating";
	private static final String RATING_COUNT = "rating_count";
	private static final String INGREDIENTSDESC = "ingredients_description";

	// Bucket info
	private static final String URL = "https://storage.googleapis.com/silent-blade-368222.appspot.com/";
	private static final String PROJECT_ID = "Interactive Home Meals";
	private static final String BUCKET_NAME = "silent-blade-368222.appspot.com";

	public UserResource() {
	}

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response doRegister(RegisterData data) {

		Transaction txn = datastore.newTransaction();

		User u = new User(data.username, data.password);

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
				user = Entity.newBuilder(userKey).set(USERNAME, u.getUsername())
						.set(PASSWORD, DigestUtils.sha512Hex(u.getPassword())).set(PANTRY, pantryJson).build();

				txn.add(user);
				txn.commit();
				LOG.fine("Successful registration");
				return Response.ok(g.toJson(u)).build();
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
				User u = new User(data.username, hashedPwd);
				if (hashedPwd.equals(DigestUtils.sha512Hex(data.password))) {

					txn.commit();
					LOG.info("User logged in: " + g.toJson(u));
					return Response.ok(g.toJson(u)).build();

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
			String uniqueId = getUniqueId();

			while (recipe != null) {
				recipeKey = datastore.newKeyFactory().setKind(RECIPE).newKey(uniqueId);
				recipe = datastore.get(recipeKey);
			}

			if (user == null) {
				LOG.warning("User: " + data.author + " does not exist");
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity("User: " + data.author + " does not exist.").build();
			} else {
				String category = data.category;

				if (!category.equalsIgnoreCase(LIGHTMEAL) && !category.equalsIgnoreCase(COMPLETEMEAL)) {
					return Response.status(Status.NOT_ACCEPTABLE)
							.entity("Bad Category. Please use Light Meal or Complete Meal!").build();
				} else if (data.difficulty < 1 || data.difficulty > 5) {
					return Response.status(Status.NOT_ACCEPTABLE).entity("Difficulty must be between 1 and 5!").build();
				}

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

				recipe = Entity.newBuilder(recipeKey).set(RECIPENAME, data.recipeName).set(AUTHOR, data.author)
						.set(DESCRIPTION, data.description).set(ISVEGETARIAN, isVegetarian).set(ISVEGAN, isVegan)
						.set(ISKOSHER, isKosher).set(ISGLUTENFREE, isGlutenFree).set(ISLACTOSEFREE, isLactoseFree)
						.set(CATEGORY, data.category).set(CALORIES, data.calories).set(DIFFICULTY, data.difficulty)
						.set(INGREDIENTS, ingredientsToString(data.ingredients))
						.set(PHOTO, uploadPhoto(uniqueId, data.photo))
						.set(RATING, 0.0)
						.set(RATING_COUNT, 0)
						.set(INGREDIENTSDESC, data.ingredientsDescription).build();

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

	@GET
	@Path("/allRecipes")
	@Produces(MediaType.APPLICATION_JSON)
	public Response allRecipes() {
		Query<Entity> recipeQuery = Query.newEntityQueryBuilder().setKind(RECIPE).build();
		QueryResults<Entity> recipes = datastore.run(recipeQuery);
		List<RecipeInfo> recipeList = new ArrayList<>();

		recipes.forEachRemaining((recipe) -> {
			recipeList.add(recipeInfoBuilder(recipe));
		});

		return Response.ok(g.toJson(recipeList)).build();
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
		List<RecipeInfo> filteredRecipesFinal = new ArrayList<>();

		recipes.forEachRemaining((recipe) -> {
			recipeList.add(recipeInfoBuilder(recipe));
		});

		if (data.searchText != null) {
			for (int i = recipeList.size() - 1; i >= 0; i--) {
				if (!(recipeList.get(i).name).contains(data.searchText)) {
					recipeList.remove(i);
				}
			}
			return Response.ok(g.toJson(recipeList)).build();
		}

		filteredRecipes = mainFilter(recipeList, data.ingredients, data.vegetarian, data.vegan, data.kosher,
				data.lactoseFree, data.glutenFree);

		if (!(data.lightMeal && data.completeMeal)) {
			filteredRecipesFinal = filterCategory(filteredRecipes, data.completeMeal, data.lightMeal);
			return Response.ok(g.toJson(filteredRecipesFinal)).build();
		}

		return Response.ok(g.toJson(filteredRecipes)).build();
	}

	@POST
	@Path("/addExistingIngredients")
	public Response addExistingIngredients() {
		LOG.fine("Adding all ingredients to db");

		String fruits[] = { "apple", "banana", "pear", "strawberry", "grape", "watermelon", "orange", "blueberry",
				"lemon", "peach", "avocado", "pineapple", "cherry", "cantaloupe", "raspberry", "lime", "blackberry",
				"clementine", "mango", "plum", "kiwi" };
		String vegetables[] = { "potato", "tomato", "onion", "carrot", "bell_pepper", "broccoli", "cucumber", "lettuce",
				"celery", "mushroom", "garlic", "spinach", "green_bean", "cabbage", "sweet_potato", "green_onion",
				"cauliflower", "aspargo", "peas", "basil" };
		String meat[] = { "pork", "chicken", "beef", "lamb", "goat", "turkey", "duck", "buffalo", "goose", "rabbit" };
		String fish[] = { "tuna", "salmon", "catfish", "cod" };
		String seaFood[] = { "shrimp", "tilapia", "crab", "clam", "pangasius" };
		String others[] = { "egg", "milk", "chocolate", "sugar", "salt", "pepper", "cinnamon", "cream", "olive_oil",
				"tomato_sauce", "soy_sauce", "hot_sauce", "oregano", "paprika", "curry", "cheese", "butter", "yogurt" };
		String cereals[] = { "bread", "croissant", "grain", "oat", "rice", "pasta", "quinoa", "corn", "lentils" };

		Transaction txn = datastore.newTransaction();

		try {
			Key ingredientKey;
			Entity ingredient;

			for (int i = 0; i < fruits.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(fruits[i]);
				ingredient = datastore.get(ingredientKey);
				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, true).set(ISVEGAN, true)
							.set(ISKOSHER, true).set(ISGLUTENFREE, true).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, FRUIT)
							.set(PHOTO, URL + fruits[i] + ".jpg")
							.build();

					txn.add(ingredient);
				}
			}

			for (int i = 0; i < vegetables.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(vegetables[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, true).set(ISVEGAN, true)
							.set(ISKOSHER, true).set(ISGLUTENFREE, true).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, VEGETABLE).set(PHOTO, URL + vegetables[i] + ".jpg").build();

					txn.add(ingredient);
				}
			}

			for (int i = 0; i < meat.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(meat[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, false).set(ISVEGAN, false)
							.set(ISKOSHER, true).set(ISGLUTENFREE, true).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, MEAT).set(PHOTO, URL + meat[i] + ".jpg").build();

					txn.add(ingredient);
				}
			}

			for (int i = 0; i < fish.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(fish[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, false).set(ISVEGAN, false)
							.set(ISKOSHER, true).set(ISGLUTENFREE, true).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, FISH).set(PHOTO, URL + fish[i] + ".jpg").build();

					txn.add(ingredient);
				}
			}

			for (int i = 0; i < seaFood.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(seaFood[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, false).set(ISVEGAN, false)
							.set(ISKOSHER, true).set(ISGLUTENFREE, true).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, SEA_FOOD).set(PHOTO, URL + seaFood[i] + ".jpg").build();

					txn.add(ingredient);
				}
			}

			for (int i = 0; i < cereals.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(cereals[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, true).set(ISVEGAN, true)
							.set(ISKOSHER, true).set(ISGLUTENFREE, false).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, CEREAL).set(PHOTO, URL + cereals[i] + ".jpg").build();

					txn.add(ingredient);
				}
			}

			for (int i = 0; i < others.length; i++) {
				ingredientKey = datastore.newKeyFactory().setKind(INGREDIENT).newKey(others[i]);
				ingredient = datastore.get(ingredientKey);

				if (ingredient == null) {
					ingredient = Entity.newBuilder(ingredientKey).set(ISVEGETARIAN, true).set(ISVEGAN, true)
							.set(ISKOSHER, true).set(ISGLUTENFREE, false).set(ISLACTOSEFREE, true)
							.set(INGREDIENT_TYPE, OTHER).set(PHOTO, URL + others[i] + ".jpg").build();

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

	@POST
	@Path("/pantry")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyPantry(GetPantryData data) {

		Transaction txn = datastore.newTransaction();

		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try {
			Entity user = datastore.get(userKey);
			if (user != null) {
				String pantryString = user.getString(PANTRY);
				txn.commit();
				return Response.ok(pantryString).build();
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
	public Response updatePantry(UpdatePantry data) {

		Transaction txn = datastore.newTransaction();

		Key userKey = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try {
			Entity user = datastore.get(userKey);

			if (user != null) {
				List<String> pantry = g.fromJson(user.getString(PANTRY), List.class);
				if (pantry == null) {
					pantry = new ArrayList<>();
					for (String entry : data.entries) {
						pantry.add(entry);
					}
				} else {
					for (String entry : data.entries) {
						PantryEntry p = new PantryEntry(entry);
						String prevEntry = pantryContainsIngredient(p.getIngredient(), pantry);
						if (prevEntry != null) {
							PantryEntry prev = new PantryEntry(prevEntry);
							int newCount = prev.getCount() + p.getCount();
							String newEntry = prev.getIngredient() + " " + newCount;
							pantry.add(newEntry);
						} else {
							pantry.add(entry);
						}

					}

				}

				String updatedPantry = g.toJson(pantry);

				Entity updatedUser = Entity.newBuilder(userKey)
						.set(USERNAME, user.getString(USERNAME))
						.set(PASSWORD, user.getString(PASSWORD))
						.set(PANTRY, updatedPantry)
						.build();

				datastore.update(updatedUser);
				txn.put(updatedUser);
				txn.commit();
				LOG.fine("Pantry updated successfully");
				return Response.ok(pantry).build();
			} else {
				txn.rollback();
				LOG.fine("Something wrong happened. Update failed.");
				return Response.status(Status.BAD_REQUEST).build();
			}

		} finally

		{
			if (txn.isActive())
				txn.rollback();
		}

	}

	public String uploadPhoto(String id, byte[] data) {
		if (data == null || data.length == 0)
			return "undefined";

		Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).build().getService();
		BlobId blobId = BlobId.of(BUCKET_NAME, id);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();
		storage.create(blobInfo, data);
		storage.createAcl(blobId, Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

		return URL + id;
	}

	public List<RecipeInfo> filterCategory(List<RecipeInfo> recipes, boolean completeMeal, boolean lightMeal) {
		for (int i = 0; i < recipes.size(); i++) {
			if (!completeMeal && !lightMeal) {
				recipes.remove(i);
				i--;
			} else if (!lightMeal && recipes.get(i).category.equals(LIGHTMEAL)) {
				recipes.remove(i);
				i--;
			} else if (!completeMeal && recipes.get(i).category.equals(COMPLETEMEAL)) {
				recipes.remove(i);
				i--;
			}
		}
		return recipes;
	}

	public List<RecipeInfo> mainFilter(List<RecipeInfo> recipes, List<String> ingredients, boolean vegetarian,
			boolean vegan, boolean kosher, boolean lactoseFree, boolean glutenFree) {
		if (recipes.size() == 0) {
			return recipes;
		}

		for (int i = 0; i < recipes.size(); i++) {
			if (vegetarian && !recipes.get(i).isVegetarian) {
				recipes.remove(i);
				i--;
			} else if (vegan && !recipes.get(i).isVegan) {
				recipes.remove(i);
				i--;
			} else if (kosher && !recipes.get(i).isKosher) {
				recipes.remove(i);
				i--;
			} else if (lactoseFree && !recipes.get(i).isLactoseFree) {
				recipes.remove(i);
				i--;
			} else if (glutenFree && !recipes.get(i).isGlutenFree) {
				recipes.remove(i);
				i--;
			}

		}

		if (ingredients != null) {
			for (int i = 0; i < recipes.size(); i++) {
				String[] auxIngredients = recipes.get(i).ingredients.split(" ");
				List<String> tempIngredients = new ArrayList<>();
				for (int j = 0; j < auxIngredients.length; j++) {
					tempIngredients.add(auxIngredients[j]);
				}
				if (!tempIngredients.containsAll(ingredients)) {
					recipes.remove(i);
					i--;
				}
			}
		}

		return recipes;
	}

	public RecipeInfo recipeInfoBuilder(Entity recipe) {
		return new RecipeInfo(recipe.getKey().getName(), recipe.getString(AUTHOR), recipe.getLong(CALORIES),
				recipe.getString(CATEGORY), recipe.getString(DESCRIPTION), recipe.getLong(DIFFICULTY),
				recipe.getString(INGREDIENTS), recipe.getString(RECIPENAME), recipe.getBoolean(ISGLUTENFREE),
				recipe.getBoolean(ISKOSHER), recipe.getBoolean(ISLACTOSEFREE), recipe.getBoolean(ISVEGAN),
				recipe.getBoolean(ISVEGETARIAN), recipe.getString(PHOTO), recipe.getDouble(RATING),
				recipe.getLong(RATING_COUNT), recipe.getString(INGREDIENTSDESC));
	}

	@POST
	@Path("/pantry/ingredient")
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response getIngredientInPantry(GetIngredientData data) {

		Transaction txn = datastore.newTransaction();

		Key key = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try {

			Entity user = datastore.get(key);

			if (user != null) {

				List<String> pantry = g.fromJson(user.getString(PANTRY), List.class);

				String entry = pantryContainsIngredient(data.ingredient, pantry);

				List<String> ret = new ArrayList<>();

				ret.add(entry);

				if (entry != null) {
					txn.commit();
					return Response.ok(g.toJson(ret)).build();
				}
			}
			return Response.status(Status.NOT_FOUND).build();

		} finally {
			if (txn.isActive())
				txn.rollback();
		}

	}

	@POST
	@Path("/pantry/ingredient/remove")
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response getIngredientInPantry(RemoveFromPantry data) {

		Transaction txn = datastore.newTransaction();

		Key key = datastore.newKeyFactory().setKind(USER).newKey(data.username);

		try {

			Entity user = datastore.get(key);

			if (user != null) {

				List<String> pantry = g.fromJson(user.getString(PANTRY), List.class);

				PantryEntry p = new PantryEntry(data.ingredient);

				String entry = pantryContainsIngredient(p.getIngredient(), pantry);

				if (entry != null) {
					PantryEntry prev = new PantryEntry(entry);
					PantryEntry rm = new PantryEntry(data.ingredient);
					int newCount = prev.getCount() - rm.getCount();

					if(newCount == 0){
						pantry.remove(entry);
					} else {
						String newEntry = prev.getIngredient() + " " + newCount;
						pantry.remove(entry);
						pantry.add(newEntry);
					}

					String updatedPantry = g.toJson(pantry);

					Entity updatedUser = Entity.newBuilder(key)
							.set(USERNAME, user.getString(USERNAME))
							.set(PASSWORD, user.getString(PASSWORD))
							.set(PANTRY, updatedPantry)
							.build();

					datastore.update(updatedUser);
					txn.put(updatedUser);

					txn.commit();
					return Response.ok(updatedPantry).build();
				} else {
					return Response.status(Status.NOT_FOUND).build();
				}
			}
			return Response.status(Status.NOT_FOUND).build();

		} finally {
			if (txn.isActive())
				txn.rollback();
		}

	}

	@POST
	@Path("/recipes/rate")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response rateRecipe(RateRecipe data) {
		Transaction txn = datastore.newTransaction();

		Query<Entity> query = Query.newEntityQueryBuilder().setKind(RECIPE).build();
		QueryResults<Entity> result = datastore.run(query);
		List<RecipeInfo> list = new ArrayList<>();

		result.forEachRemaining((r) -> {
			if (r.getString(RECIPENAME).equals(data.name)) {
				list.add(recipeInfoBuilder(r));
			}
		});

		try {

			if (list.size() > 0) {
				if (data.rating > 5.0 && data.rating < 1.0) {
					return Response.status(Status.NOT_ACCEPTABLE).entity("Rating must be between 1 and 5!").build();
				}
				RecipeInfo recipe = list.get(0);

				double currRate = recipe.rating;

				long nRates = recipe.rateCount;
				long updatedRateCount = nRates + 1;

				double newRate = ((currRate * (double) nRates) + data.rating) / (double) (updatedRateCount);

				Key key = datastore.newKeyFactory().setKind(RECIPE).newKey(recipe.id);

				Entity updatedRecipe = Entity.newBuilder(key).set(RECIPENAME, data.name).set(AUTHOR, recipe.author)
						.set(DESCRIPTION, recipe.description).set(ISVEGETARIAN, recipe.isVegetarian)
						.set(ISVEGAN, recipe.isVegan)
						.set(ISKOSHER, recipe.isKosher).set(ISGLUTENFREE, recipe.isGlutenFree)
						.set(ISLACTOSEFREE, recipe.isLactoseFree)
						.set(CATEGORY, recipe.category).set(CALORIES, recipe.calories)
						.set(DIFFICULTY, recipe.difficulty)
						.set(INGREDIENTS, recipe.ingredients)
						.set(PHOTO, recipe.photo)
						.set(RATING, newRate)
						.set(RATING_COUNT, updatedRateCount)
						.set(INGREDIENTSDESC, recipe.ingredientsDescription).build();

				txn.update(updatedRecipe);
				txn.commit();

				return Response.ok(updatedRecipe).build();
			} else {
				return Response.status(Status.NOT_FOUND).entity("Recipe doesn't exist!").build();
			}

		} finally {
			if (txn.isActive())
				txn.rollback();
		}
	}


	@POST
	@Path("/pantry/filter")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response filterIngredients(FilterIngredients data) {
		LOG.info("filtering recipes");

		Response getPantryResponse = getMyPantry(new GetPantryData(data.username));
		Query<Entity> query = Query.newEntityQueryBuilder().setKind(INGREDIENT).build();
		QueryResults<Entity> ingredients = datastore.run(query);
		List<IngredientInfo> ingredientsList = new ArrayList<>();
		List<String> filteredPantry = new ArrayList<>();

		String pantryString = (String)getPantryResponse.getEntity();

		List<String> pantry = g.fromJson(pantryString, List.class);

		ingredients.forEachRemaining((ingredient) -> {
			IngredientInfo info = ingredientInfoBuilder(ingredient);
			String contains = pantryContainsIngredient(info.name, pantry);
			if(contains != null){
				ingredientsList.add(ingredientInfoBuilder(ingredient));
			}
		});

		if (data.type != null) {
			for (int i = ingredientsList.size() - 1; i >= 0; i--) {
				if (!((ingredientsList.get(i).type).equals(data.type)) ) {
					ingredientsList.remove(i);
				}
			}

			for(IngredientInfo info: ingredientsList){
				String pantryEntry = pantryContainsIngredient(info.name, pantry);
				filteredPantry.add(pantryEntry);
			}
			return Response.ok(g.toJson(filteredPantry)).build();
		} else {
			return Response.status(Status.NOT_FOUND).entity("No ingredient found for the current filter").build();
		}


	}

	@GET
	@Path("/allIngredients")
	@Produces(MediaType.APPLICATION_JSON)
	public Response allIngredients() {
		Query<Entity> query = Query.newEntityQueryBuilder().setKind(INGREDIENT).build();
		QueryResults<Entity> ingredients = datastore.run(query);
		List<IngredientInfo> ingredientList = new ArrayList<>();

		ingredients.forEachRemaining((ingredient) -> {
			ingredientList.add(ingredientInfoBuilder(ingredient));
		});

		return Response.ok(g.toJson(ingredientList)).build();
	}

	public IngredientInfo ingredientInfoBuilder(Entity ingredient) {
		return new IngredientInfo(ingredient.getKey().getName(), ingredient.getString(INGREDIENT_TYPE),
				ingredient.getString(PHOTO), ingredient.getBoolean(ISGLUTENFREE), ingredient.getBoolean(ISKOSHER),
				ingredient.getBoolean(ISLACTOSEFREE), ingredient.getBoolean(ISVEGAN),
				ingredient.getBoolean(ISVEGETARIAN));

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

	private String pantryContainsIngredient(String ingredient, List<String> list) {
		for (String s : list) {
			if (s.contains(ingredient)) {
				return s;
			}
		}
		return null;

	}

}
