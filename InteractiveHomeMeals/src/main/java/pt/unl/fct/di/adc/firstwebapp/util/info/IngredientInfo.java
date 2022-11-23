package pt.unl.fct.di.adc.firstwebapp.util.info;

public class IngredientInfo {
    
    public String name, type, photo;
    public boolean isGlutenFree, isKosher, isLactoseFree, isVegan, isVegetarian;

    public IngredientInfo(String name, String type, String photo, boolean isGlutenFree, boolean isKosher, boolean isLactoseFree, boolean isVegan, boolean isVegetarian){
        this.name = name;
        this.type = type;
        this.photo = photo;
        this.isGlutenFree= isGlutenFree;
        this.isKosher = isKosher;
        this.isLactoseFree = isLactoseFree;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
    }

}
