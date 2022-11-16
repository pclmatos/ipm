package pt.unl.fct.di.adc.firstwebapp.util.entity;

import java.util.Set;

public class Ingredient{

    private String name;
    private Set<String> types;

    public Ingredient(String name, Set<String> types){
        this.name = name;
        this.types = types;
    }

    public String getName(){
        return name;
    }

    public Set<String> gettypes(){
        return types;
    }

    public void settypes(Set<String> types){
        this.types = types;
    }

}
