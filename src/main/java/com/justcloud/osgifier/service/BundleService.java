package com.justcloud.osgifier.service;

import java.io.InputStream;
import java.util.Collection;

import org.osgi.framework.BundleException;

import com.justcloud.osgifier.dto.BundleAdapter;

public interface BundleService extends Service {

	public Collection<BundleAdapter> getBundles();

	public void startBundle(Long id) throws BundleException;

	public void stopBundle(Long id) throws BundleException;

	public void uninstallBundle(Long id) throws BundleException;

	public void installPackage(String pack) throws BundleException;
	
	public void installBundle(String location) throws BundleException;

	public void installBundle(String location, InputStream is) throws BundleException;

	public void restartBundle(Long id) throws BundleException;

	public void updateBundle(Long id) throws BundleException;

	public void updateBundle(Long id, InputStream is) throws BundleException;

}
