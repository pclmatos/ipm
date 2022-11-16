package pt.unl.fct.di.adc.firstwebapp.util.entity;

import java.util.List;

import pt.unl.fct.di.adc.firstwebapp.util.info.PantryEntry;

public class User {

    private String username, password;

    private List<PantryEntry> pantry;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.pantry = null;
    }

    public User(String username, String password, List<PantryEntry> pantry) {
        this.username = username;
        this.password = password;
        this.pantry = pantry;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;

    }

    public List<PantryEntry> getPantry() {
        return pantry;
    }

    public void setPantry(List<PantryEntry> pantry) {
        this.pantry = pantry;
    }

}
