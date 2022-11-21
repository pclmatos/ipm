package pt.unl.fct.di.adc.firstwebapp.util;

import java.util.List;

public class FilterData {
	public boolean vegetarian, vegan, kosher, glutenFree, lactoseFree, completeMeal, lightMeal;
	public List<String> ingredients;
	public String searchText;
	
	public FilterData() {}
	
	public FilterData(boolean vegetarian, boolean vegan, boolean kosher, boolean glutenFree, boolean lactoseFree, List<String> ingredients, boolean completeMeal, boolean lightMeal, String searchText) {
		this.vegetarian = vegetarian;
		this.vegan = vegan;
		this.kosher = kosher;
		this.glutenFree = glutenFree;
		this.lactoseFree = lactoseFree;
		this.ingredients = ingredients;
		this.completeMeal = completeMeal;
		this.lightMeal = lightMeal;
		this.searchText = searchText;
	}
}
