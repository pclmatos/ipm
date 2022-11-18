package pt.unl.fct.di.adc.firstwebapp.util.info;


public class PantryEntry{

    private String entry;

    public PantryEntry(String entry) {
        this.entry = entry;
    }

    public String getIngredient() {
        return entry.split(" ")[0];
    }

    public int getCount() {
        return Integer.parseInt(entry.split(" ")[1]);
    }

}
