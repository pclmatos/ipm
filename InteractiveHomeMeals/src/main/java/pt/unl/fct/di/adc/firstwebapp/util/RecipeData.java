package pt.unl.fct.di.adc.firstwebapp.util;

import java.util.UUID;

public class RecipeData {
	
	public String author, recipeName, description, ingredients;
	public long key;
	//TODO add photograph and video
	
	public RecipeData() {}
	
	public RecipeData(String recipeName, String description, String ingredients, String author) {
		author = this.author;
		recipeName = this.recipeName;
		description = this.description;
		ingredients = this.ingredients;
	}

}
