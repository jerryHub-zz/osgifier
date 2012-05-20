package com.justcloud.osgifier;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.context.ApplicationContext;
import org.springframework.osgi.context.support.OsgiBundleXmlApplicationContext;

public class SpringContextHolder {

	private static SpringContextHolder instance;
	private Map<String, OsgiBundleXmlApplicationContext> contexts;
	
	static {
		instance = new SpringContextHolder();
	}
	
	private SpringContextHolder() {
		contexts = new ConcurrentHashMap<String, OsgiBundleXmlApplicationContext>();
	}
	
	public ApplicationContext getContext(String name) {
		return contexts.get(name);
	}
	
	public void registerContext(String name, OsgiBundleXmlApplicationContext context) {
		contexts.put(name, context);
		context.refresh();
	}
	
	public void unregisterContext(String name) {
		OsgiBundleXmlApplicationContext context = contexts.get(name);
		contexts.remove(name);
		context.stop();
	}
	
	public void stop() {
		List<String> remove = new ArrayList<String>();
		for(Map.Entry<String, OsgiBundleXmlApplicationContext> entry : contexts.entrySet()) {
			try {
				entry.getValue().stop();
			} catch(Exception ex) {
				Logger.getLogger(SpringContextHolder.class.getName()).log(Level.SEVERE, "Cannot stop context for context " + entry.getKey(), ex);
			}
		}
		for(String r : remove) {
			contexts.remove(r);
		}
	}
	
	public static SpringContextHolder getInstance() {
		return instance;
	}

	
	
	
}
