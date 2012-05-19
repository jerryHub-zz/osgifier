package com.justcloud.osgifier.dto;

import java.util.ArrayList;
import java.util.List;

public class User {

	private String username;
	private String email;
	private String password;
	private List<String> keys;

	public User() {
		keys = new ArrayList<String>();
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getKeys() {
		return keys;
	}

	public void setKeys(List<String> keys) {
		this.keys = keys;
	}

}
