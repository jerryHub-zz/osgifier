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
		
		jQuery("#installPaxMvn").click(function () {
			install = require('PackageInstall');
			install('pax-mvn');
		});
		
		jQuery("#installPaxObr").click(function () {
			install = require('PackageInstall');
			install('pax-obr');
		});
		
	});
	
}());