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
		    'akka',
		    'spring-mvc',
		    'hibernate',
		    'hibernate-search',
		    'hibernate-easy',
		    'aries',
		    'bouncy',
		    'signer',
		    'aspectj',
		    'shiro',
		    'camel',
		    'camel-cxf',
		    'camel-freemarker',
		    'camel-jms',
		    'camel-jmx',
		    'camel-jpa',
		    'camel-mail',
		    'camel-quartz',
		    'camel-twitter',
		    'drools',
		    'esper',
		    'activiti',
		    'jasper',
		    'jackrabbit',
		    'camel-jcr',
		    'mahout',
		    'services'
		];
		
		jQuery("#installFull").click(function () {
			install = require('PackageLightInstall');
			jQuery('#installFull').button('loading');

			var installPiece;

                        installPiece = function (i) {
                            if(i < packages.length) {
                                console.log("Installing " + packages[i]);
                                install(packages[i], function (outcome) {
                                    if(outcome != 'error') {
                                    	installPiece(i + 1);
                                    	console.log("Installed " + packages[i]);
                                    } else {
                                    	console.log("REFUSING TO GO ON WITH " + packages[i]);
					jQuery('#installFull').button('reset');
                                    }
                                });
                            } else {
				jQuery('#installFull').button('reset');
			    }
                        };

                        installPiece(0);

		});
		
	});
	
}());
