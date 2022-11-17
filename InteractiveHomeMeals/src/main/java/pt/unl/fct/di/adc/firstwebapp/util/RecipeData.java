package pt.unl.fct.di.adc.firstwebapp.util;

public class RecipeData {
	
	public String author, recipeName, description, category;
	public long difficulty, calories;
	public String[] ingredients;
	public byte[] photo;
	
	//TODO add photograph and video
	
	public RecipeData() {}
	
	public RecipeData(String recipeName, String description, String author, long difficulty, String category, long calories, String[] ingredients, byte[] photo) {
		this.author = author;
		this.recipeName = recipeName;
		this.description = description;
		this.ingredients = ingredients;
		this.difficulty = difficulty;
		this.category = category;
		this.calories = calories;
		this.photo = photo;
	}
}
