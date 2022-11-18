package pt.unl.fct.di.adc.firstwebapp.util;

import java.util.List;

public class UpdatePantry {
    
    public String username;
    public List<String> entries;
    
    public UpdatePantry() {}

    public UpdatePantry(String username, List<String> entries){
        this.username = username;
        this.entries = entries;
    }

}
