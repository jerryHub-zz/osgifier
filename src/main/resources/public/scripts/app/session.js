/*global require: false, provide: false, location: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";

	var _        = require('underscore'),
	    Backbone = require('backbone'),
	    $script  = require('scriptjs'),
	    Session,
	    jQuery,
	    request,
	    showMessage;	

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
	
	Session = {
			login: function(username, password) {
				var data = {
					username: username,
					password: password
				};
				request('/osgifier/service/login', data, function(data) {
					if(data.result) {
						location.href = '/osgifier/bundles/';
					} else {
						showMessage('User not found', 'User has not been found', 'Please check the details, user credentials seem to be wrong');
					}
					
				});
			},
			logout: function() {
				request('/osgifier/service/logout', {}, function() {
					location.href = '/osgifier/'
				});
			},
			current: function(callback) {
				request('/osgifier/service/session/current', {}, callback);
			}
	};

	$script.ready('jquery', function () {
		jQuery = require('jquery');

		request = function (url, data, callback) {
			jQuery.ajax({
				url : url,
				type : 'POST',
				dataType : 'json',
				data : JSON.stringify(data),
				success : callback
			});
		};
	});
	
	provide('OsgifierSession', Session);
	
}(this));