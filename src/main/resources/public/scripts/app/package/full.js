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
		var packages = [
		    'pax-mvn',
		    'logback',
		    'scala',
		    'groovy',
		    'spring-mvc',
		    'hibernate',
		    'hibernate-search',
		    'hibernate-easy',
		    'mahout',
		    'aries',
		    'bouncy',
		    'signer',
		    'aspectj',
		    'shiro',
		    'drools',
		    'esper',
		    'activiti',
		    'jasper',
		    'jackrabbit',
		    'camel',
		    'camel-cxf',
		    'camel-freemarker',
		    'camel-jcr',
		    'camel-jms',
		    'camel-jmx',
		    'camel-jpa',
		    'camel-mail',
		    'camel-quartz',
		    'services'
		];
		
		jQuery("#installFull").click(function () {
			install = require('PackageLightInstall');
			jQuery('#installFull').button('loading');

			var installPiece;

                        installPiece = function (i) {
                            if(i < packages.length) {
                                console.log("Installing " + packages[i]);
                                install(packages[i], function () {
                                    console.log("Installed " + packages[i]);
                                    installPiece(i + 1);
                                });
                            } else {
				jQuery('#installFull').button('reset');
			    }
                        };

                        installPiece(0);

		});
		
	});
	
}());
