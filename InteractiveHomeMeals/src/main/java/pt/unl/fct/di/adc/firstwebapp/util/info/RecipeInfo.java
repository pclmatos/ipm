package pt.unl.fct.di.adc.firstwebapp.util.info;

public class RecipeInfo {
	
	public String author, category, description, ingredients, name, id, photo, ingredientsDescription;
	public long difficulty, calories;
	public boolean isLactoseFree, isGlutenFree, isVegan, isVegetarian, isKosher;
	
	public RecipeInfo(String id, String author, long calories, String category, String description, long difficulty, String ingredients, 
			String name, boolean isGlutenFree, boolean isKosher, boolean isLactoseFree, boolean isVegan, boolean isVegetarian, 
			String photo, String ingredientsDescription) {
		this.id = id;
		this.author = author;
		this.calories = calories;
		this.category = category;
		this.description = description;
		this.difficulty = difficulty;
		this.ingredients = ingredients;
		this.name = name;
		this.isGlutenFree = isGlutenFree;
		this.isKosher = isKosher;
		this.isLactoseFree = isLactoseFree;
		this.isVegan = isVegan;
		this.isVegetarian = isVegetarian;
		this.photo = photo;
		this.ingredientsDescription = ingredientsDescription;
	}

}
