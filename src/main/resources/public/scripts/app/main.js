/*global require: false, provide: false, location: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";

	var _        = require('underscore'),
	    Backbone = require('backbone'),
	    $script  = require('scriptjs'),
	    Session,
	    jQuery,
	    showMessage;	

	$script('app/session', 'OsgifierSession');
	
	$script.ready(['jquery', 'bootstrap', 'OsgifierSession'], function() {
		
		jQuery  = require('jquery');
		Session = require('OsgifierSession');
		
		jQuery("#signin").click(function() {
			var username = jQuery("#username").val(),
				password = jQuery("#password").val();
			
			Session.login(username, password);
		});
		
	});
	
}(this));