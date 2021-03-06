odoo.define('odoo_erp_address_auto', function (require) {
"use strict";
view.include({init:function(parent,dataset,options){
    self=this;
    console.log(options._model,dataset._model['name'],"init");
    this._super.apply(this, arguments);
    if (dataset._model['name'] == 'res.partner'){
	
	
		// autocompletion de l'adresse
		this.$('.o_address_street :input').autocomplete({
		source: function (request, response) {
			$.ajax({
				url: "https://api-adresse.data.gouv.fr/search/?postcode="+$('.client-address-zip :input').val(),
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
				$('.o_address_city :input').val(ui.item.city);
				$('.o_address_zip :input').val(ui.item.postcode);
			}            
		});

		// autocompletion du code postal
		this.$('.o_address_zip  :input').autocomplete({
        source: function (request, response) {
        	$.ajax({
        		url: "https://api-adresse.data.gouv.fr/search/?postcode="+$('.client-address-zip :input').val(),
        		data: { q: request.term, limit: 50},
        		dataType: "json",
        		success: function (data) {
        			var postcodes = [];
        			response($.map(data.features, function (item) {
        				// Ici on est obligÃ© d'ajouter les CP dans un array pour ne pas avoir plusieurs fois le mÃªme
        				if ($.inArray(item.properties.city, postcodes) == -1) {
        					postcodes.push(item.properties.city);
        					return {label: item.properties.postcode + " - " + item.properties.city, 
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
        		$('.o_address_city :input').val(ui.item.city);
	       }            
        });

	// autocompletion de la ville
        this.$('.o_address_city :input').autocomplete({
        	source: function (request, response) {
        		$.ajax({
        			url: "https://api-adresse.data.gouv.fr/search/?city="+$('.client-address-city :input').val(),
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
        		$('.o_address_zip :input').val(ui.item.postcode);
        	}
    });
});
}
}
}
);
