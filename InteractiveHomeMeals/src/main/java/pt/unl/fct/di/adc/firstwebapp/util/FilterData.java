package pt.unl.fct.di.adc.firstwebapp.util;

public class FilterData {
	public boolean vegetarian, vegan, kosher, glutenFree, lactoseFree;
	
	public FilterData() {}
	
	public FilterData(boolean vegetarian, boolean vegan, boolean kosher, boolean glutenFree, boolean lactoseFree) {
		vegetarian = this.vegetarian;
		vegan = this.vegan;
		kosher = this.kosher;
		glutenFree = this.glutenFree;
		lactoseFree = this.lactoseFree;
	}
}
