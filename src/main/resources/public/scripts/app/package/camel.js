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
		
		jQuery("#installCamel").click(function () {
			install = require('PackageInstall');
			jQuery('#installCamel').button('loading');
			install('camel', function () {
				jQuery('#installCamel').button('reset');
			});
			
		});
		
	});
	
}());