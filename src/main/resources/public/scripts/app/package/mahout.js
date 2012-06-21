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
		jQuery  = require('jquery');
		
		jQuery("#installMahout").click(function () {
			install = require('PackageInstall');
			jQuery('#installMahout').button('loading');
			install('mahout', function () {
				jQuery('#installMahout').button('reset');
			});
			
		});
		
	});
	
}());
