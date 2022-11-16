package pt.unl.fct.di.adc.firstwebapp.util;

public class RecipeData {
	
	public String author, recipeName, description, difficulty, category, calories;
	public String[] ingredients;
	
	//TODO add photograph and video
	
	public RecipeData() {}
	
	public RecipeData(String recipeName, String description, String author, String difficulty, String category, String calories, String[] ingredients) {
		this.author = author;
		this.recipeName = recipeName;
		this.description = description;
		this.ingredients = ingredients;
		this.difficulty = difficulty;
		this.category = category;
		this.calories = calories;
	}
}
