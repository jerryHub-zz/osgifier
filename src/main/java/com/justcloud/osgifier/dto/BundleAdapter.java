package com.justcloud.osgifier.dto;

import java.io.Serializable;
import org.osgi.framework.Bundle;
import org.osgi.framework.Version;

public class BundleAdapter implements Serializable, Comparable<BundleAdapter> {

	private static final long serialVersionUID = 3891143658796425245L;

	private Bundle bundle;

	public BundleAdapter(Bundle bundle) {
		this.bundle = bundle;
	}

	public long getId() {
		return bundle.getBundleId();
	}

	public String getName() {
		Object nameHeader = bundle.getHeaders().get("Bundle-Name");
		String name = (nameHeader != null) ? nameHeader.toString() : "";

		return name;
	}

	public String getSymbolicName() {
		return bundle.getSymbolicName();
	}

	public BundleState getState() {
		BundleState state = BundleState.UNKNOWN;
		switch (bundle.getState()) {
		case Bundle.ACTIVE:
			state = BundleState.ACTIVE;
			break;
		case Bundle.INSTALLED:
			state = BundleState.INSTALLED;
			break;
		case Bundle.UNINSTALLED:
			state = BundleState.UNINSTALLED;
			break;
		case Bundle.RESOLVED:
			state = BundleState.RESOLVED;
			break;
		case Bundle.STARTING:
			state = BundleState.STARTING;
			break;
		case Bundle.STOPPING:
			state = BundleState.STOPPING;
			break;
		}
		return state;
	}

	public String getVersion() {
		return bundle.getVersion().toString();
	}
	
	@Override
	public String toString() {
		return String.format("Bundle {0} Version {1}", getName(), getVersion());
	}

	@Override
	public boolean equals(Object other) {
		BundleAdapter o;
		if (other == null) {
			return false;
		} else if (other instanceof BundleAdapter) {
			o = (BundleAdapter) other;
		} else {
			return false;
		}
		return getId() == o.getId();
	}

	@Override
	public int compareTo(BundleAdapter o) {
		Version thisVersion  = bundle.getVersion();
		Version otherVersion = o.bundle.getVersion();
		
		return thisVersion.compareTo(otherVersion);
	}

}
