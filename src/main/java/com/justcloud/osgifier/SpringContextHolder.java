/*******************************************************************************
 * Copyright 2012 Just-Cloud
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.justcloud.osgifier;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceRegistration;
import org.springframework.context.ApplicationContext;
import org.springframework.osgi.context.support.OsgiBundleXmlApplicationContext;

public class SpringContextHolder {

	private static SpringContextHolder instance;
	private Map<String, OsgiBundleXmlApplicationContext> contexts;
	@SuppressWarnings("rawtypes")
	private List<ServiceRegistration> regs;

	static {
		instance = new SpringContextHolder();
	}

	@SuppressWarnings("rawtypes")
	private SpringContextHolder() {
		contexts = new ConcurrentHashMap<String, OsgiBundleXmlApplicationContext>();
		regs = new ArrayList<ServiceRegistration>();
	}

	public ApplicationContext getContext(String name) {
		return contexts.get(name);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void registerContext(String name,
			OsgiBundleXmlApplicationContext context) {
		contexts.put(name, context);
		context.refresh();

		BundleContext bc = FrameworkUtil.getBundle(SpringContextHolder.class)
				.getBundleContext();
		Hashtable properties = new Hashtable();
		properties.put("name", name);
		regs.add(bc.registerService(OsgiBundleXmlApplicationContext.class,
				context, properties));
	}

	@SuppressWarnings("rawtypes")
	public void unregisterContext(String name) {
		OsgiBundleXmlApplicationContext context = contexts.get(name);
		contexts.remove(name);
		context.stop();
		ServiceRegistration removeReg = null;
		for (ServiceRegistration reg : regs) {
			if (reg.getReference().getProperty("name").equals(name)) {
				removeReg = reg;
			}
		}
		if (removeReg != null) {
			regs.remove(removeReg);
			removeReg.unregister();
		}
	}

	public void stop() {
		List<String> remove = new ArrayList<String>();
		for (Map.Entry<String, OsgiBundleXmlApplicationContext> entry : contexts
				.entrySet()) {
			try {
				entry.getValue().stop();
			} catch (Exception ex) {
				Logger.getLogger(SpringContextHolder.class.getName())
						.log(Level.SEVERE,
								"Cannot stop context for context "
										+ entry.getKey(), ex);
			}
		}
		for (String r : remove) {
			contexts.remove(r);
		}
	}

	public static SpringContextHolder getInstance() {
		return instance;
	}

}
