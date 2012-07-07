/*global require: false, provide: false */
/*jslint nomen: true*/
(function(context) {
	"use strict";

	var _        = require('underscore'),
    	Backbone = require('backbone'),
    	$script  = require('scriptjs'),
    	jQuery,
    	postRequest,
    	request,
    	jndiTemplate,
    	hogan,
    	showMessage,
    	executeQuery,
    	ready;
	
	showMessage = function(header, title, message) {
		jQuery("#modalMessage > .modal-header > h3").html(header);
		
		if(message) {
			message = "<strong>" + title + "</strong>" +
				"<pre class='prettyprint'>" + message + "</pre>";
		} else {
			if(title) {
				message = "<strong>" + title + "</strong>";
			} else {
				message = "Action successful";
			}
		}

		jQuery("#modalMessage > .modal-body > p").html(message);
		jQuery("#modalMessage").modal('show');
	};
	
	ready = function () {
		jndiTemplate = hogan.compile(jQuery("#jndiTemplate").html());
		//Load jndi resources
		request('/osgifier/service/jndi/jdbc/list', function (data) {
			var jndiList = jndiTemplate.render({
				resources: data
			});
			jQuery("#execute").click(executeQuery);
			jQuery("#selectParent").html(jndiList);
		});
	};
	
	executeQuery = function () {
		jQuery('#execute').button('loading');
		postRequest('/osgifier/service/database/query', {
			jndiDataSource: jQuery("#selectJndi").val(),
			query: jQuery('#query').val()
		}, function (data) {
			var result,
				tableTemplate,
				rowTemplate,
				renderedRowTemplate,
				tableHtml;
			jQuery('#execute').button('reset');
			if(data.outcome == 'error') {
				showMessage(data.type, data.message, data.stacktrace);
			} else {
				result = JSON.parse(data.result);
				if(result.resultsAvailable) {
					rowTemplate = hogan.compile(jQuery("#dnyamoTable").html());
					
					renderedRowTemplate = rowTemplate.render(result)
						.replace(/<</g, '{{')
						.replace(/>>/g, '}}')
					
					tableTemplate = hogan.compile(
							jQuery("#tableTemplate")
							.html()
							.replace(
								"#[dynamoRow]",
								renderedRowTemplate
							)
						);
					tableHtml = tableTemplate.render(result);
					jQuery("#queryResult").html(tableHtml);
					jQuery("table").dataTable({
						sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
						sPaginationType: "bootstrap"
					});					
				} else {
					showMessage('Success!', result.updateCount + ' rows have been affected');
				}
				
				
			}
		}, function (error) {
			jQuery('#execute').button('reset');
			showMessage('Error on commit', 'Error on commit!', error);
		});
	};
		
	$script.ready(['jquery', 'bootstrap', 'hogan'], function() {
		jQuery = require('jquery');
		hogan  = require('hogan');
		postRequest = function (url, data, callback, error) {
			jQuery.ajax({
				url : url,
				type : 'POST',
				dataType : 'json',
				data : JSON.stringify(data),
				success : callback,
				error: error
			});
		};
		request = function (url, callback, error) {
			jQuery.ajax({
				url : url,
				dataType : 'json',
				success : callback,
				error: error
			});
		};
		jQuery(document).ready(ready);
	});

}());