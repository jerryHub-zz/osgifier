/*global require: false, provide: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";
	
	var _        = require('underscore'),
	    $script  = require('scriptjs'),
	    jQuery,
	    install;
	
	$script('app/package/package', 'package');
	
	$script.ready(['jquery', 'bootstrap', 'package'], function () {
		console.log("Going"); 	
		jQuery  = require('jquery');
		
		jQuery("#installHibernate").click(function () {
			install = require('PackageInstall');
			jQuery('#installHibernate').button('loading');
			install('hibernate', function () {
				jQuery('#installHibernate').button('reset');
			});
			
		});

		jQuery("#installHibernateSearch").click(function () {
			install = require('PackageInstall');
			jQuery('#installHibernateSearch').button('loading');
			install('hibernate-search', function () {
				jQuery('#installHibernateSearch').button('reset');
			});
			
		});
		
	});
	
}());
