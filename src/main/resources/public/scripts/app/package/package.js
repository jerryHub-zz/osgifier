/*global require: false, provide: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";
	
	var _        = require('underscore'),
	    $script  = require('scriptjs'),
	    jQuery,
	    request,
	    lightRequest,
	    showMessage,
	    PackageInstall;
	
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
	
	request = function () {
		console.log("jQuery not yet loaded");
	};

	$script.ready('jquery', function () {
		jQuery = require('jquery');

		request = function (pack, callback) {
			var data = {
				package: pack
			};
			jQuery.ajax({
				url : '/osgifier/service/osgi/package/install',
				type : 'POST',
				dataType : 'json',
				data : JSON.stringify(data),
				success : function(data) {
					if(data.outcome == 'error') {
						showMessage('Error', data.message, data.stacktrace);
					} else {
						showMessage("Success!");
					}
					if(callback) {
						callback();
					}
				}
			});
		};

		lightRequest = function (pack, callback) {
			var data = {
				package: pack
			};
			jQuery.ajax({
				url : '/osgifier/service/osgi/package/install',
				type : 'POST',
				dataType : 'json',
				data : JSON.stringify(data),
				success : function(data) {
					if(data.outcome == 'error') {
						showMessage('Error', data.message, data.stacktrace);
					}
					if(callback) {
						callback(data.outcome);
					}
				}
			});
		};
		
		provide('PackageInstall', request);
		provide('PackageLightInstall', lightRequest);
	});
	
	
}());
