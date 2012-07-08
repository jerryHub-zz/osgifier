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
		
		jQuery("#installCamel").click(function () {
			install = require('PackageInstall');
			jQuery('#installCamel').button('loading');
			install('camel', function () {
				jQuery('#installCamel').button('reset');
			});
			
		});
		
		jQuery("#installCxf").click(function () {
			install = require('PackageInstall');
			jQuery('#installCxf').button('loading');
			install('camel-cxf', function () {
				jQuery('#installCxf').button('reset');
			});
		});
		
		jQuery("#installServices").click(function () {
			install = require('PackageInstall');
			jQuery('#installServices').button('loading');
			install('services', function () {
				jQuery('#installServices').button('reset');
			});
			
		});

		jQuery("#installFreemarker").click(function () {
			install = require('PackageInstall');
			jQuery('#installFreemarker').button('loading');
			install('camel-freemarker', function () {
				jQuery('#installFreemarker').button('reset');
			});
		});

		jQuery("#installJcr").click(function () {
			install = require('PackageInstall');
			jQuery('#installJcr').button('loading');
			install('camel-jcr', function () {
				jQuery('#installJcr').button('reset');
			});
		});

		jQuery("#installJms").click(function () {
			install = require('PackageInstall');
			jQuery('#installJms').button('loading');
			install('camel-jms', function () {
				jQuery('#installJms').button('reset');
			});
		});

		jQuery("#installJmx").click(function () {
			install = require('PackageInstall');
			jQuery('#installJmx').button('loading');
			install('camel-jmx', function () {
				jQuery('#installJmx').button('reset');
			});
		});

		jQuery("#installJpa").click(function () {
			install = require('PackageInstall');
			jQuery('#installJpa').button('loading');
			install('camel-jpa', function () {
				jQuery('#installJpa').button('reset');
			});
		});

		jQuery("#installMail").click(function () {
			install = require('PackageInstall');
			jQuery('#installMail').button('loading');
			install('camel-mail', function () {
				jQuery('#installMail').button('reset');
			});
		});

		jQuery("#installQuartz").click(function () {
			install = require('PackageInstall');
			jQuery('#installQuartz').button('loading');
			install('camel-quartz', function () {
				jQuery('#installQuartz').button('reset');
			});
		});

		jQuery("#installTwitter").click(function () {
			install = require('PackageInstall');
			jQuery('#installTwitter').button('loading');
			install('camel-twitter', function () {
				jQuery('#installTwitter').button('reset');
			});
		});
		
	});
	
}());
