package pt.unl.fct.di.adc.firstwebapp.util;

import java.util.List;

public class FilterData {
	public boolean vegetarian, vegan, kosher, glutenFree, lactoseFree;
	public List<String> ingredients;
	
	public FilterData() {}
	
	public FilterData(boolean vegetarian, boolean vegan, boolean kosher, boolean glutenFree, boolean lactoseFree, List<String> ingredients) {
		this.vegetarian = vegetarian;
		this.vegan = vegan;
		this.kosher = kosher;
		this.glutenFree = glutenFree;
		this.lactoseFree = lactoseFree;
		this.ingredients = ingredients;
	}
}
