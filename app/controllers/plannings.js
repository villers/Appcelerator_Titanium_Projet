"use strict";

/*
 * recupére les parametre de l'activité
 */
$.params = arguments[0] || {};

/*
 * chargement des libs
 */
var App = require('core');
var Request = require('http');
var login = Ti.App.Properties.getString('login');
var password = Ti.App.Properties.getString('password');

/*
 * récupère la liste des notes
 */
var query = {
	url: 'https://intra.epitech.eu/planning/load?format=json',
	type: 'GET',
	format: 'JSONP',
	data: {
		login: login,
		password: password
	},
	success: function(json) {
		var plannings = Alloy.Collections.plannings;
		json.forEach(function(row){
			var planning = Alloy.createModel('plannings', {
				titlemodule: row.titlemodule,
				room: (row.room !== null) ? row.room.type : 'Aucunes',
				acti_title: row.acti_title,
				start: row.start,
				end: row.end
			});
			plannings.add(planning);
			planning.save();
		});
	}
};
Request(query);