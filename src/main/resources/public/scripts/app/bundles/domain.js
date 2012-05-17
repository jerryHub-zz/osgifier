/*global require: false, provide: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";

	var _        = require('underscore'),
	    Backbone = require('backbone'),
	    $script  = require('scriptjs'),
	    JSONCollection,
	    Bundle,
	    BundleLibrary,
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

		request = function (url, id, callback) {
			var data = {
				id : id
			};
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

	Bundle = Backbone.Model.extend({
		start : function () {
			var that = this;
			request('/osgifier/service/osgi/bundle/start', this.id, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		},
		stop : function () {
			var that = this;
			request('/osgifier/service/osgi/bundle/stop', this.id, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		},
		restart : function () {
			var that = this;
			request('/osgifier/service/osgi/bundle/restart', this.id, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		},
		update : function () {
			var that = this;
			request('/osgifier/service/osgi/bundle/update', this.id, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		},
		uninstall : function () {
			var that = this;
			request('/osgifier/service/osgi/bundle/uninstall', this.id, function (data) {
				if(data.outcome == 'error') {
					showMessage('Error', data.message, data.stacktrace);
				} else {
					showMessage("Success!");
				}
				that.trigger('statusChange');
			});
		}
	});

	BundleLibrary = JSONCollection.extend({
		model : Bundle,
		url : '/osgifier/service/osgi/bundle/list',
		installModule: function (url, callback) {
			var that = this;
			var data = {
				location: url
			};
			jQuery.ajax({
				url : '/osgifier/service/osgi/bundle/install',
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
		Bundle : Bundle,
		BundleLibrary : BundleLibrary
	};

	provide('BundleDomain', domain);

}(this));