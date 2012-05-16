package com.justcloud.osgifier.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface REST {

	public enum RESTMethod {
		GET,
		POST
	}
	
	public RESTMethod method();
	
	public String url();
	
}
