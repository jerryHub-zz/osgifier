/*global require: false, provide: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";

	var _        = require('underscore'),
	    Backbone = require('backbone'),
	    $script  = require('scriptjs'),
	    JSONCollection,
	    Person,
	    PeopleLibrary,
	    jQuery,
	    request,
	    domain,
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
	
	

	JSONCollection = Backbone.Collection.extend({
		parse : function (response) {
			return JSON.parse(response.response);
		}
	});

	Person = Backbone.Model.extend({
		idAttribute: "username",
		defaults: {
			keys: []
		},
		save : function () {
			var requestUrl = "/osgifier/service/users/create";
			var that = this;
			var data = {
				user: {
					username: this.get("username"),
					email: this.get("email"),
					password: this.get("password"),
					keys: this.get("keys")
				}
			};
			if(this.get('mode') == 'update') {
				if(this.has('newPassword')) {
					requestUrl = "/osgifier/service/users/updateWithPassword";
					data.password = this.get('newPassword');
				} else {
					requestUrl = "/osgifier/service/users/update";
				}
			}
			request(requestUrl, data, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		},
		destroy : function () {
			var that = this;
			var data = {
				username: this.get("username")
			};
			request('/osgifier/service/users/delete', data, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		},
	});

	PeopleLibrary = JSONCollection.extend({
		model : Person,
		url : '/osgifier/service/users/list'
	});

	domain = {
		Person : Person,
		PeopleLibrary : PeopleLibrary
	};

	provide('PersonDomain', domain);

}(this));