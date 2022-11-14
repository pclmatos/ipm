package pt.unl.fct.di.adc.firstwebapp.util;

public class RecipeData {
	
	public String author, recipeName, description, ingredients;
	public String[] ingredientsToFilter;
	
	//TODO add photograph and video
	
	public RecipeData() {}
	
	public RecipeData(String recipeName, String description, String ingredients, String author, String[] ingredientsToFilter) {
		author = this.author;
		recipeName = this.recipeName;
		description = this.description;
		ingredients = this.ingredients;
		ingredientsToFilter = this.ingredientsToFilter;
	}
}
