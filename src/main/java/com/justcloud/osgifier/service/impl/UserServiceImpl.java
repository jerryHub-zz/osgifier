package com.justcloud.osgifier.service.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.justcloud.osgifier.dto.User;
import com.justcloud.osgifier.service.UserService;
import com.justcloud.osgifier.service.UtilsService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

public class UserServiceImpl implements UserService {

	private JSONSerializer serializer;
	private JSONDeserializer<User> deserializer;

	public UserServiceImpl() {
		serializer = new JSONSerializer();
		deserializer = new JSONDeserializer<User>();
	}

	@Override
	public List<User> getUsers() {
		List<User> result = new ArrayList<User>();
		File parent = getUsersPath();
		for (File user : parent.listFiles()) {
			result.add(readFile(user));
		}
		return result;
	}

	@Override
	public void createUser(User user) {
		File userFile = new File(getUsersPath(), user.getUsername());
		if (userFile.exists()) {
			throw new RuntimeException("User " + user.getUsername()
					+ " already exists");
		}
		user.setPassword(encryptPassword(user.getPassword()));
		writeFile(user, userFile);
	}

	@Override
	public void updateUser(User user) {
		File userFile = new File(getUsersPath(), user.getUsername());

		writeFile(user, userFile);
	}

	@Override
	public void updateUser(User user, String password) {
		File userFile = new File(getUsersPath(), user.getUsername());

		user.setPassword(encryptPassword(password));
		
		writeFile(user, userFile);
	}

	@Override
	public User findUser(final String username) {
		File userFile = new File(getUsersPath(), username);
		if (!userFile.exists()) {
			throw new RuntimeException("User " + username + " doesn't exist");
		}
		return readFile(userFile);
	}

	@Override
	public User findUser(String username, String password) {
		User result = null;
		File userFile = new File(getUsersPath(), username);
		if (!userFile.exists()) {
			return null;
		}
		result = readFile(userFile);
		if(!encryptPassword(password).equals(result.getPassword())) {
			result = null; 
		}
		return result;
	}

	@Override
	public void deleteUser(String username) {
		File userFile = new File(getUsersPath(), username);
		userFile.delete();
	}

	@Override
	public String getName() {
		return "Users";
	}

	private void writeFile(User user, File f) {
		BufferedWriter writer = null;

		try {
			writer = new BufferedWriter(new FileWriter(f));
			serializer.deepSerialize(user, writer);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (IOException e) {
					Logger.getLogger(UserServiceImpl.class.getName()).severe(
							e.getMessage());
				}
			}
		}

	}

	private User readFile(File f) {
		BufferedReader reader = null;
		User result = null;

		try {
			reader = new BufferedReader(new FileReader(f));
			result = deserializer.deserialize(reader);
		} catch (FileNotFoundException e) {
			Logger.getLogger(UserServiceImpl.class.getName()).severe(
					e.getMessage());
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					Logger.getLogger(UserServiceImpl.class.getName()).severe(
							e.getMessage());
				}
			}
		}
		return result;
	}

	private String encryptPassword(String password) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			digest.reset();
			digest.update(password.getBytes());
			return byteArrayToHexString(digest.digest());
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}

	private String byteArrayToHexString(byte[] b) throws Exception {
		StringBuffer buffer = new StringBuffer(b.length * 2);
		for (int i = 0; i < b.length; i++) {
			buffer.append(Integer.toString((b[i] & 0xff) + 0x100, 16).substring(1));
		}
		return buffer.toString();
		
	}

	private File getUsersPath() {
		File parent = new File(UtilsService.getPath("/users"));
		if (!parent.exists()) {
			parent.mkdirs();
		}
		return parent;
	}

}
