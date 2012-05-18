package com.justcloud.osgifier;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.junit.Test;

import static org.junit.Assert.*;

import com.justcloud.osgifier.service.LogbackService;
import com.justcloud.osgifier.service.impl.LogbackServiceImpl;

public class LogbackTest {

	private LogbackService logbackService = new LogbackServiceImpl();

	@Test
	public void testConfigure() throws Exception {
		String configuration = loadResource("/test.xml");
		logbackService.loadConfiguration(configuration);
	}
	
	@Test
	public void testLoadConfigure() throws Exception {
		String configuration = loadResource("/test.xml");
		logbackService.loadConfiguration(configuration);
		
		String loadedConfiguration = logbackService.getConfiguration();
		assertEquals(configuration, loadedConfiguration);
	}

	private String loadResource(String path) throws Exception {
		BufferedReader is = new BufferedReader(new InputStreamReader(getClass()
				.getResourceAsStream(path)));
		StringBuffer buffer = new StringBuffer();
		String line;
		try {
			while ((line = is.readLine()) != null) {
				buffer.append(line);
				buffer.append("\n");
			}
		} finally {
			if (is != null) {
				is.close();
			}
		}
		return buffer.toString();
	}

}
