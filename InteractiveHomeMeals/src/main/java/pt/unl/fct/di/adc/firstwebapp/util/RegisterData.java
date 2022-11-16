package pt.unl.fct.di.adc.firstwebapp.util;

public class RegisterData {
	
	public String username;
	public String password;
	public String confirmation;
	
	public RegisterData() {
		
	}
	
	public RegisterData(String username, String password, String confirmation) {
		this.username = username;
		this.password = password;
		this.confirmation = confirmation;
	}
}
