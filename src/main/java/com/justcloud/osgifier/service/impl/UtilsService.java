package com.justcloud.osgifier.service.impl;

import java.io.File;

public class UtilsService {

	public static String getPath(String path) {
		return System.getProperty("user.home")
				+ File.separator
				+ ".osgifier"
				+ File.separator
				+ path.replace("/", File.separator);
	}

}
