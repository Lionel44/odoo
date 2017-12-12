odoo.define('odoo_pos_address_auto.pos', function (require) {
"use strict";

var screens = require('point_of_sale.screens');

screens.ClientListScreenWidget.include({
    display_client_details: function(visibility,partner,clickpos){
        var self = this;
        this._super(visibility,partner,clickpos);

// autocompletion de l'adresse
        this.$('.client-address-street').autocomplete({
	source: function (request, response) {
		$.ajax({
			url: "https://api-adresse.data.gouv.fr/search/?postcode="+$('.client-address-zip').val(),
			data: { q: request.term, limit: 50},
			dataType: "json",
			success: function (data) {
				response($.map(data.features, function (item) {
					return { label: item.properties.name + " | " +  item.properties.postcode + " - " + item.properties.city,
						city: item.properties.city,
        				postcode: item.properties.postcode,
					 value: item.properties.name};
				}));
			}
		});
	},
    // On remplit aussi la ville et le code postal
    select: function(event, ui) {
     		$('.client-address-city').val(ui.item.city);
       		$('.client-address-zip').val(ui.item.postcode);
    }            
        });

// autocompletion du code postal
        this.$('.client-address-zip').autocomplete({
        	source: function (request, response) {
        		$.ajax({
        			url: "https://api-adresse.data.gouv.fr/search/?postcode="+$('.client-address-zip').val(),
        			data: { q: request.term, limit: 50},
        			dataType: "json",
        			success: function (data) {
        				var postcodes = [];
        				response($.map(data.features, function (item) {
        					// Ici on est obligÃ© d'ajouter les CP dans un array pour ne pas avoir plusieurs fois le mÃªme
        					if ($.inArray(item.properties.city, postcodes) == -1) {
        						postcodes.push(item.properties.city);
        						return { label: item.properties.postcode + " - " + item.properties.city, 
        								 city: item.properties.city,
        								 value: item.properties.postcode
        						};
        					}
        				}));
        			}
        		});
	       },
	       // On remplit aussi la ville
	       select: function(event, ui) {
        		$('.client-address-city').val(ui.item.city);
	       }            
        });

// autocompletion de la ville
        this.$('.client-address-city').autocomplete({
        	source: function (request, response) {
        		$.ajax({
        			url: "https://api-adresse.data.gouv.fr/search/?city="+$('.client-address-city').val(),
        			data: { q: request.term, limit: 50},
        			dataType: "json",
        			success: function (data) {
        				var cities = [];
        				response($.map(data.features, function (item) {
        					// Ici on est obligÃ© d'ajouter les villes dans un array pour ne pas avoir plusieurs fois la mÃªme
        					if ($.inArray(item.properties.postcode, cities) == -1) {
        						cities.push(item.properties.postcode);
        						return { label: item.properties.postcode + " - " + item.properties.city, 
        								 postcode: item.properties.postcode,
        								 value: item.properties.city
		      				};
        					}
        				}));
        			}
        		});
        	},
	       // On remplit aussi le CP
        	select: function(event, ui) {
        		$('.client-address-zip').val(ui.item.postcode);
        	}
    });
    },

});

});
