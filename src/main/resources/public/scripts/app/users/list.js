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
	    peopleLibrary,
    	// Views
    	peopleLibraryView,
    	// Funcs
    	showEdition,
    	prepareModel,
    	prepareUi,
    	fetch,
    	ready;

	// Load custom scripts
	$script('app/users/domain', 'PersonDomain');
	$script('vendor/google-code-prettify/prettify', 'prettify');

	prepareModel = function () {
		peopleLibrary = new domain.PeopleLibrary();
	};
	
	showEdition = function(header, username, email, callback) {
		jQuery("#modalEdition > .modal-header > h3").html(header);
		
		jQuery("#username").val(username);
		
		jQuery("#email").val(email);
		
		jQuery("#password").val("");
		
		jQuery("#save").unbind('click');
		
		jQuery("#save").bind('click', function() {
			jQuery("#modalEdition").modal('hide');
			callback();
		});
		
		jQuery("#modalEdition").modal('show');
	};

	prepareUi = function () {
		var personTemplate = hogan.compile(jQuery("#personTemplate").html()), PersonView, PeopleLibraryView;

		PersonView = Backbone.View.extend({
			tagName : 'tr',
			render : function() {
				var element = jQuery(this.el),
				    model   = this.model;
				
				model.on('statusChange', fetch);

				element.html(personTemplate.render(model.toJSON()));
				
				jQuery(".user-delete", element).click(function() {
					model.destroy();
				});
				
				jQuery(".user-update", element).click(function() {
					jQuery("#username").attr('disabled', 'disabled');
					
					showEdition("Update user", model.get('username'), model.get('email'), function() {
						
						var email = jQuery("#email").val();
						var password = jQuery("#password").val();
						
						model.set('mode', 'update');
						model.set('email', email);
						
						if(password.trim().length > 0) {
							model.set('newPassword', password);
						}
												
						model.save();
					});
				});

				return this;
			}
		});

		PeopleLibraryView = Backbone.View.extend({
			buildChildren : function() {
				var that = this;
				this._personViews = [];

				this.collection.each(function(person) {
					that._personViews.push(new PersonView({
						model : person
					}));
				});
			},
			render : function() {
				var that = this;
				jQuery(this.el).empty();
				this.buildChildren();
				_(this._personViews).each(function(bv) {
					jQuery(that.el).append(bv.render().el);
					return this;
				});

			}
		});

		peopleLibraryView = new PeopleLibraryView({
			collection : peopleLibrary,
			el : jQuery('.users')[0]
		});
	};

	ready = function() {
		jQuery("#modalMessage").modal({
			show: false
		});
		
		jQuery("#modalEdition").modal({
			show: false
		});
		
		jQuery("#create").click(function() {
			jQuery("#username").removeAttr('disabled');
			
			showEdition("Create user", "", "", function() {
				var person = new domain.Person();
				
				var username = jQuery("#username").val();
				var email = jQuery("#email").val();
				var password = jQuery("#password").val();
				
				person.set('mode', 'create');
				person.set('username', username);
				person.set('email', email);
				person.set('password', password);
				
				person.on('statusChange', fetch);
				
				person.save();
			});
		});
		
		fetch = function () {
			peopleLibrary.fetch({
				success : function () {
					peopleLibraryView.render();
				}
			});	
		};
		
		fetch();
		
	};

	// Ready to rumble
	$script.ready([ 'jquery', 'bootstrap', 'hogan', 'PersonDomain' ], function() {
		jQuery = require('jquery');
		hogan = require('hogan');
		domain = require('PersonDomain');

		prepareModel();
		prepareUi();

		jQuery(document).ready(ready);

	});

}());
