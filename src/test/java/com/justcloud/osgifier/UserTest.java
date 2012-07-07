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
package com.justcloud.osgifier;

import java.io.File;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;

import com.justcloud.osgifier.dto.User;
import com.justcloud.osgifier.service.UserService;
import com.justcloud.osgifier.service.UtilsService;
import com.justcloud.osgifier.service.impl.UserServiceImpl;

import static org.junit.Assert.*;

public class UserTest {

	private UserService userService = new UserServiceImpl();
	
	@Before
	public void prepare() {
		UserTest.delete();
	}
	
	@AfterClass
	public static void delete() {
		File parent = new File(UtilsService.getPath("/users"));
		if (parent.exists()) {
			for (File f : parent.listFiles()) {
				f.delete();
			}
			parent.delete();
		}
	}

	@Test
	public void createUser() {
		User user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu@gmail.com");
		user.setPassword("iamedu00");
		userService.createUser(user);
	}

	@Test(expected = RuntimeException.class)
	public void createRepeatedUser() {
		User user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu@gmail.com");
		user.setPassword("iamedu00");
		userService.createUser(user);

		user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu@gmail.com");
		user.setPassword("iamedu00");
		userService.createUser(user);
	}
	
	@Test(expected = RuntimeException.class)
	public void deleteUser() {
		User user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu@gmail.com");
		user.setPassword("iamedu00");
		userService.createUser(user);
		
		userService.deleteUser("iamedu");
		
		userService.findUser("iamedu");
		
	}
	
	@Test
	public void modifyUser() {
		User user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu@gmail.com");
		user.setPassword("iamedu00");
		userService.createUser(user);
		
		user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu2@gmail.com");
		user.setPassword("iamedu00");
		
		userService.updateUser(user);
		
		user = userService.findUser("iamedu");
		
		assertEquals("iamedu2@gmail.com", user.getEmail());
	}
	
	@Test
	public void modifyUserPassword() {
		User user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu@gmail.com");
		user.setPassword("iamedu00");
		userService.createUser(user);
		
		user = new User();
		user.setUsername("iamedu");
		user.setEmail("iamedu2@gmail.com");
		user.setPassword("iamedu00");
		
		userService.updateUser(user, "iamedu01");
		
		user = userService.findUser("iamedu", "iamedu01");
		
		assertNotNull(user);
		
	}

}
