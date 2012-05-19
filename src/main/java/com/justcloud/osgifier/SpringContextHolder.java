package com.justcloud.osgifier;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericApplicationContext;

public class SpringContextHolder {

	private static SpringContextHolder instance;
	private Map<String, GenericApplicationContext> contexts;
	
	static {
		instance = new SpringContextHolder();
	}
	
	private SpringContextHolder() {
		contexts = new ConcurrentHashMap<String, GenericApplicationContext>();
	}
	
	public ApplicationContext getContext(String name) {
		return contexts.get(name);
	}
	
	public void registerContext(String name, GenericApplicationContext context) {
		context.refresh();
		contexts.put(name, context);
	}
	
	public void unregisterContext(String name) {
		GenericApplicationContext context = contexts.get(name);
		context.stop();
		contexts.remove(name);
	}
	
	public void stop() {
		List<String> remove = new ArrayList<String>();
		for(Map.Entry<String, GenericApplicationContext> entry : contexts.entrySet()) {
			entry.getValue().stop();
		}
		for(String r : remove) {
			contexts.remove(r);
		}
	}
	
	public static SpringContextHolder getInstance() {
		return instance;
	}

	
	
	
}
