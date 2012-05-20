/*global require: false, provide: false */
/*jslint browser: true, regexp: true, nomen:true */
(function(context) {
	"use strict";

	// Ready libs
	var $script = require('scriptjs'),
	    _ = require('underscore'), Backbone = require('backbone'),
    	// Async Libs
	    jQuery, hogan,
    	// Domain
	    domain,
    	// Repositories
	    contextLibrary,
    	// Views
    	contextLibraryView,
    	// Funcs
    	prepareModel,
    	prepareUi,
    	showMessage,
    	fetch,
    	ready;

	// Load custom scripts
	$script('app/extras/spring/domain', 'ContextDomain');
	$script('vendor/google-code-prettify/prettify', 'prettify');

	showMessage = function(header, title, message) {
		jQuery("#modalMessage > .modal-header > h3").html(header);
		
		if(message) {
			message = "<strong>" + title + "</strong>" +
				"<pre class='prettyprint'>" + message + "</pre>";
		} else {
			message = "Action successful";
		}

		jQuery("#modalMessage > .modal-body > p").html(message);
		jQuery("#modalMessage").modal('show');
	};
	
	prepareModel = function () {
		contextLibrary = new domain.ContextLibrary();
	};

	prepareUi = function () {
		var contextTemplate = hogan.compile(jQuery("#contextTemplate").html()), ContextView, ContextLibraryView;

		ContextView = Backbone.View.extend({
			tagName : 'tr',
			render : function() {
				var element = jQuery(this.el),
				    model   = this.model;
				
				model.on('statusChange', fetch);

				element.html(contextTemplate.render(model.toJSON()));

				jQuery(".context-unregister", element).click(function() {
					model.unregister();
				});

				jQuery(".context-view", element).click(function() {
					model.fetch(function() {
						var data = model.toJSON();
						var content = jQuery("<div />").text(data.content).html();
						showMessage("Context Visualization", "Spring Context " + data.name, content);
					});
				});

				return this;
			}
		});

		ContextLibraryView = Backbone.View.extend({
			buildChildren : function() {
				var that = this;
				this._contextViews = [];

				this.collection.each(function(context) {
					that._contextViews.push(new ContextView({
						model : context
					}));
				});
			},
			render : function() {
				var that = this;
				jQuery(this.el).empty();
				this.buildChildren();
				_(this._contextViews).each(function(bv) {
					jQuery(that.el).append(bv.render().el);
					return this;
				});

			}
		});

		contextLibraryView = new ContextLibraryView({
			collection : contextLibrary,
			el : jQuery('.contexts')[0]
		});
	};

	ready = function() {
		jQuery("#modalMessage").modal({
			show: false
		});
		
		jQuery("#createContext").click(function() {
			var data = {
				context: {
					name: jQuery("#context-name").val(),
					description: jQuery("#context-description").val(),
					content: jQuery("#context-content").val()
				}
			};
			contextLibrary.registerContext(data, function(data) {
				fetch();
			});
		});
		
		fetch = function () {
			contextLibrary.fetch({
				success : function () {
					contextLibraryView.render();
				}
			});	
		};
		
		fetch();
		
	};

	// Ready to rumble
	$script.ready([ 'jquery', 'bootstrap', 'hogan', 'ContextDomain' ], function() {
		jQuery = require('jquery');
		hogan = require('hogan');
		domain = require('ContextDomain');

		prepareModel();
		prepareUi();

		jQuery(document).ready(ready);

	});

}());
