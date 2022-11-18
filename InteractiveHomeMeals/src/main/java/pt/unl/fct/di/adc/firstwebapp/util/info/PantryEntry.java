package pt.unl.fct.di.adc.firstwebapp.util.info;

import pt.unl.fct.di.adc.firstwebapp.util.entity.Ingredient;

public class PantryEntry{

    private Ingredient ingredient;

    private int count;

    public PantryEntry(Ingredient ingredient, int count) {
        this.ingredient = ingredient;
        this.count = count;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}
