package pt.unl.fct.di.adc.firstwebapp.util;

import java.util.List;

public class RemoveFromPantry {
    
    public String username;
    public List<String> ingredients;
    
    public RemoveFromPantry() {}

    public RemoveFromPantry(String username, List<String> ingredients){
        this.username = username;
        this.ingredients = ingredients;
    }

}
