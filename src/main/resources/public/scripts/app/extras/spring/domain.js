/*global require: false, provide: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";

	var _        = require('underscore'),
	    Backbone = require('backbone'),
	    $script  = require('scriptjs'),
	    JSONCollection,
	    Context,
	    ContextLibrary,
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

	Context = Backbone.Model.extend({
		idAttribute: "name",
		fetch: function(callback) {
			var that = this;
			var data = {
				name: this.get("name")	
			};
			request('/osgifier/service/spring/find', data, function (data) {
				callback(data);
				that.trigger('statusChange');
			});
		},
		unregister : function () {
			var that = this;
			var data = {
				name: this.get("name")	
			};
			request('/osgifier/service/spring/destroy', data, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		}
	});

	ContextLibrary = JSONCollection.extend({
		model : Context,
		url : '/osgifier/service/spring/list',
		registerContext: function (data, callback) {
			var that = this;
			jQuery.ajax({
				url : '/osgifier/service/spring/register',
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
			
		}
	});

	domain = {
		Context : Context,
		ContextLibrary : ContextLibrary
	};

	provide('ContextDomain', domain);

}(this));