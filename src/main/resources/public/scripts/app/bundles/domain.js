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
	    domain;

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
			request('/osgifier/service/osgi/bundle/start', this.id, function (data) {
				console.log(data);
			});
		},
		stop : function () {
			request('/osgifier/service/osgi/bundle/stop', this.id, function (data) {
				console.log(data);
			});
		},
		restart : function () {
			request('/osgifier/service/osgi/bundle/restart', this.id, function (data) {
				console.log(data);
			});
		},
		update : function () {
			request('/osgifier/service/osgi/bundle/update', this.id, function (data) {
				console.log(data);
			});
		},
		uninstall : function () {
			request('/osgifier/service/osgi/bundle/uninstall', this.id, function (data) {
				console.log(data);
			});
		}
	});

	BundleLibrary = JSONCollection.extend({
		model : Bundle,
		url : '/osgifier/service/osgi/bundle/list'
	});

	domain = {
		Bundle : Bundle,
		BundleLibrary : BundleLibrary
	};

	provide('BundleDomain', domain);

}(this));