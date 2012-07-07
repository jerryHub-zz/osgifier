/*******************************************************************************
 * Copyright 2012 Just-Cloud
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.justcloud.osgifier.service.impl;

import com.justcloud.osgifier.annotation.REST;
import com.justcloud.osgifier.annotation.REST.RESTMethod;
import com.justcloud.osgifier.annotation.RESTParam;
import com.justcloud.osgifier.dto.User;
import com.justcloud.osgifier.service.SessionService;
import com.justcloud.osgifier.service.UserService;

public class SessionServiceImpl implements SessionService {

	private UserService userService = new UserServiceImpl();

	@Override
	public User login(String username, String password) {
		return userService.findUser(username, password);
	}

	@Override
	@REST(url = "/session/current", method = RESTMethod.POST)
	public User getCurrentUser(
			@RESTParam(value = "user", session = true) User current) {
		
		return userService.findUser(current.getUsername());
	}

	@Override
	public String getName() {
		return "Session";
	}

}
