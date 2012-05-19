package com.justcloud.osgifier.service;

import java.util.List;

import com.justcloud.osgifier.dto.SpringContext;

public interface SpringService extends Service {

	List<SpringContext> getSpringServiceDetails();
	
	SpringContext getFullContext(String name);
	
	void registerContext(SpringContext context);
	
	void destroyContext(String name);

	void stop();

	void start();
	
}
