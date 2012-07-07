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
package com.justcloud.osgifier.util;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.osgi.framework.Bundle;

import com.justcloud.osgifier.dto.BundleAdapter;

public class BundleUtil {

	public static Collection<BundleAdapter> adaptBundles(Bundle[] bundles) {
		List<Bundle> unadaptedBundles = Arrays.asList(bundles);
		List<BundleAdapter> adaptedBundles = new ArrayList<BundleAdapter>(
				unadaptedBundles.size());

		for (Bundle unadapted : unadaptedBundles) {
			adaptedBundles.add(new BundleAdapter(unadapted));
		}

		Collections.reverse(adaptedBundles);

		return adaptedBundles;
	}
	

}
