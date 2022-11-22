package pt.unl.fct.di.adc.firstwebapp.util.entity;

import java.util.ArrayList;
import java.util.List;

public class User {

    private String username, password;

    private List<String> pantry;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.pantry = new ArrayList<>();
    }

    public User(String username, String password, List<String> pantry) {
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

    public List<String> getPantry() {
        return pantry;
    }

    public void setPantry(List<String> pantry) {
        this.pantry = pantry;
    }

}
