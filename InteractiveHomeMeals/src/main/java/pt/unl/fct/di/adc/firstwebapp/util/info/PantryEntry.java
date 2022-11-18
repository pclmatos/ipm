package pt.unl.fct.di.adc.firstwebapp.util.info;

public class PantryEntry{

    private String ingredient;

    private int count;

    public PantryEntry(String ingredient, int count) {
        this.ingredient = ingredient;
        this.count = count;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}
