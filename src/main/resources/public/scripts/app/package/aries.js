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
		
		jQuery("#installAries").click(function () {
			install = require('PackageInstall');
			jQuery('#installAries').button('loading');
			install('aries', function () {
				jQuery('#installAries').button('reset');
			});
			
		});
		
	});
	
}());