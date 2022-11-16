package pt.unl.fct.di.adc.firstwebapp.util.info;

public class RecipeInfo {
	
	public String author, calories, category, description, difficulty, ingredients, name;
	public boolean isLactoseFree, isGlutenFree, isVegan, isVegetarian, isKosher;
	
	public RecipeInfo(String author, String calories, String category, String description, String difficulty, String ingredients, String name, boolean isGlutenFree, boolean isKosher, boolean isLactoseFree, boolean isVegan, boolean isVegetarian) {
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
	}

}
