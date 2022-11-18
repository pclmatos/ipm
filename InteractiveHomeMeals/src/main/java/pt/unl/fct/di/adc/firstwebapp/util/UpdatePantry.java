package pt.unl.fct.di.adc.firstwebapp.util;

import java.util.List;

import pt.unl.fct.di.adc.firstwebapp.util.info.PantryEntry;

public class UpdatePantry {
    
    public String username;
    public List<PantryEntry> entries;

    public UpdatePantry(String username,List<PantryEntry> entries){
        this.username = username;
        this.entries = entries;
    }

}
