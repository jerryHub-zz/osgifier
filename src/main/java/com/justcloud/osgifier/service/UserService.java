package com.justcloud.osgifier.service;

import java.util.List;

import com.justcloud.osgifier.dto.User;

public interface UserService extends Service {

	public List<User> getUsers();
	
	public void createUser(User user);
	
	public void updateUser(User user);
	
	public void updateUser(User user, String password);
	
	public User findUser(String username);
	
	public User findUser(String username, String password);
	
	public void deleteUser(String username);
	
}
