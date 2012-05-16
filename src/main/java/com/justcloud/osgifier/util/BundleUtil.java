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
