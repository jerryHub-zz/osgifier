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
package com.justcloud.osgifier.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NameClassPair;
import javax.naming.NameNotFoundException;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;

import com.justcloud.osgifier.annotation.REST;
import com.justcloud.osgifier.annotation.REST.RESTMethod;
import com.justcloud.osgifier.service.JndiService;

public class JndiServiceImpl implements JndiService {

	private Context context;

	public JndiServiceImpl() {
		try {
			context = new InitialContext();
		} catch (javax.naming.NamingException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	@REST(url = "/jndi/jdbc/list", method = RESTMethod.GET)
	public List<Map<String,String>> lookupDatabaseEntries() {
		try {
			return lookupContextPath("jdbc");
		} catch (NamingException e) {
			throw new RuntimeException(e);
		}
	}

	private List<Map<String,String>> lookupContextPath(String contextPath) throws NamingException {
		List<Map<String,String>> names;
		NamingEnumeration<NameClassPair> ee;
		if (contextPath == null) {
			contextPath = "";
		}
		try {
			ee = context.list(contextPath);
		} catch (NameNotFoundException e) {
			throw new NamingException(e.getMessage());
		}
		names = toNameClassPairArray(ee);
		return names;
	}

	private List<Map<String,String>> toNameClassPairArray(NamingEnumeration<NameClassPair> ee)
			throws javax.naming.NamingException {
		List<Map<String,String>> names = new ArrayList<Map<String,String>>();
		while (ee.hasMore()) {
			final NameClassPair o = ee.next();
			
			@SuppressWarnings("serial")
			Map<String, String> entry = new HashMap<String, String>() {{
				put("name", o.getName());
				put("class", o.getClassName());
			}};
			names.add(entry);
		}
		return names;
	}

	@Override
	public String getName() {
		return "JndiService";
	}

}
