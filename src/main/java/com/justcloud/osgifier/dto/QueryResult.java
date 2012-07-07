package com.justcloud.osgifier.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class QueryResult implements Serializable {

	private static final long serialVersionUID = 3048551864721146164L;

	private List<String> headers;
	private List<Map<String, Object>> values;
	private boolean resultsAvailable;
	private long updateCount;
	private int transaction;

	public List<String> getHeaders() {
		return headers;
	}

	public void setHeaders(List<String> headers) {
		this.headers = headers;
	}

	public List<Map<String, Object>> getValues() {
		return values;
	}

	public void setValues(List<Map<String, Object>> values) {
		this.values = values;
	}

	public boolean isResultsAvailable() {
		return resultsAvailable;
	}

	public void setResultsAvailable(boolean resultsAvailable) {
		this.resultsAvailable = resultsAvailable;
	}

	public long getUpdateCount() {
		return updateCount;
	}

	public void setUpdateCount(long updateCount) {
		this.updateCount = updateCount;
	}

	public int getTransaction() {
		return transaction;
	}

	public void setTransaction(int transaction) {
		this.transaction = transaction;
	}

}
