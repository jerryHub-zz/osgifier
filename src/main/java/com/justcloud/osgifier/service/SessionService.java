package com.justcloud.osgifier.service;

import com.justcloud.osgifier.dto.User;

public interface SessionService extends Service {

	User login(String username, String password);
	
	User getCurrentUser(User current);
		
}
