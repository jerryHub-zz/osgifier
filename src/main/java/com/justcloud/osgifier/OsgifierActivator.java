package com.justcloud.osgifier;

import java.util.logging.Logger;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;

import com.justcloud.osgifier.dto.User;
import com.justcloud.osgifier.service.LogbackService;
import com.justcloud.osgifier.service.SpringService;
import com.justcloud.osgifier.service.UserService;
import com.justcloud.osgifier.service.impl.LogbackServiceImpl;
import com.justcloud.osgifier.service.impl.SpringServiceImpl;
import com.justcloud.osgifier.service.impl.UserServiceImpl;

public class OsgifierActivator implements BundleActivator {

	@Override
	public void start(BundleContext context) throws Exception {
		UserService userService = new UserServiceImpl();

		if (userService.getUsers().size() == 0) {
			createAdminUser(userService);
		}

		if (isSpringInstalled()) {
			SpringService service = new SpringServiceImpl();
			service.start();
		}

		if (isLogbackInstalled()) {
			LogbackService logbackService = new LogbackServiceImpl();
			try {
				logbackService.reloadConfiguration();
			} catch (Exception ex) {
				Logger.getLogger(OsgifierActivator.class.getName()).severe(
						ex.getMessage());
			}
		}
	}

	private void createAdminUser(UserService userService) {
		User user = new User();
		user.setUsername("admin");
		user.setEmail("admin@just-cloud.com");
		user.setPassword("admin");
		userService.createUser(user);
	}

	@Override
	public void stop(BundleContext context) throws Exception {
		if (isSpringInstalled()) {
			SpringService service = new SpringServiceImpl();
			service.stop();
		}
	}

	private boolean isSpringInstalled() {
		try {
			FrameworkUtil
					.getBundle(LogbackServiceImpl.class)
					.loadClass(
							"org.springframework.context.support.GenericApplicationContext");
			return true;
		} catch (ClassNotFoundException ex) {
			return false;
		}
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
