package pt.unl.fct.di.adc.firstwebapp.util;

public class RecipeData {
	
	public String author, recipeName, description, difficulty, category, calories;
	public String[] ingredients;
	
	//TODO add photograph and video
	
	public RecipeData() {}
	
	public RecipeData(String recipeName, String description, String author, String difficulty, String category, String calories, String[] ingredients) {
		author = this.author;
		recipeName = this.recipeName;
		description = this.description;
		ingredients = this.ingredients;
		difficulty = this.difficulty;
		category = this.category;
		calories = this.calories;
	}
}
