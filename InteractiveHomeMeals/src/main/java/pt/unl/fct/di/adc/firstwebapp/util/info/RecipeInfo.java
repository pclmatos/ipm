package pt.unl.fct.di.adc.firstwebapp.util.info;

public class RecipeInfo {
	
	public String author, calories, category, description, difficulty, ingredients, name;
	public boolean isLactoseFree, isGlutenFree, isVegan, isVegetarian, isKosher;
	
	public RecipeInfo(String author, String calories, String category, String description, String difficulty, String ingredients, String name, boolean isGlutenFree, boolean isKosher, boolean isLactoseFree, boolean isVegan, boolean isVegetarian) {
		author = this.author;
		calories = this.calories;
		category = this.category;
		description = this.description;
		difficulty = this.difficulty;
		ingredients = this.ingredients;
		name = this.name;
		isGlutenFree = this.isGlutenFree;
		isKosher = this.isKosher;
		isLactoseFree = this.isLactoseFree;
		isVegan = this.isVegan;
		isVegetarian = this.isVegetarian;
	}

}
