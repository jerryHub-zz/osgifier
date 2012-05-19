package com.justcloud.osgifier;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;

import com.justcloud.osgifier.service.LogbackService;
import com.justcloud.osgifier.service.impl.LogbackServiceImpl;

public class OsgifierActivator implements BundleActivator {

	@Override
	public void start(BundleContext context) throws Exception {
		if(isLogbackInstalled()) {
			LogbackService logbackService = new LogbackServiceImpl();
			logbackService.reloadConfiguration();
		}
	}

	@Override
	public void stop(BundleContext context) throws Exception {
		
	}

	private boolean isLogbackInstalled() {

		try {
			FrameworkUtil.getBundle(LogbackServiceImpl.class).loadClass(
					"ch.qos.logback.classic.joran.JoranConfigurator");
			return true;
		} catch (ClassNotFoundException ex) {
			return false;
		}
	}
	
}
