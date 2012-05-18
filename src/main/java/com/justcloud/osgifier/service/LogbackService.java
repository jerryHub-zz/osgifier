package com.justcloud.osgifier.service;

public interface LogbackService extends Service {
	
	public String getConfiguration();
	
	public void loadConfiguration(String configuration);
	
	public void reloadConfiguration();
	
	
}
