/*global require: false, provide: false */
/*jslint nomen: true*/
(function(context) {
	"use strict";

	var _     = require('underscore'),
	  $script = require('scriptjs'),
	  jQuery,
	  install,
	  showMessage,
	  loadConfiguration,
	  updateConfiguration;
	
	showMessage = function(header, title, message) {
		jQuery("#modalMessage > .modal-header > h3").html(header);
		
		if(message) {
			message = "<strong>" + title + "</strong>" +
				"<pre class='prettyprint'>" + message + "</pre>";
		} else {
			message = "Action successful";
		}
	
		jQuery("#modalMessage > .modal-body > p").html(message);
		jQuery("#modalMessage").modal('show');
	};

	updateConfiguration = function(configuration, callback) {
		var data = {
			configuration : configuration
		};
		jQuery.ajax({
			url : '/osgifier/service/extras/logback/configuration',
			type : 'POST',
			dataType : 'json',
			data : JSON.stringify(data),
			success : function(data) {
				if (data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				if (callback) {
					callback();
				}
			}
		});
	};
	
	loadConfiguration = function() {
		jQuery.ajax({
			url : '/osgifier/service/extras/logback/configuration',
			type : 'GET',
			dataType : 'json',
			success : function(data) {
				if (data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					jQuery("#configuration").val(data);
				}
			}
		});
	};

	$script.ready([ 'jquery', 'bootstrap' ], function() {
		jQuery = require('jquery');

		loadConfiguration();

		jQuery("#updateConfiguration").click(function() {
			jQuery('#updateConfiguration').button('loading');

			updateConfiguration(jQuery("#configuration").val(), function() {
				jQuery('#updateConfiguration').button('reset');
			});

		});

	});

}());