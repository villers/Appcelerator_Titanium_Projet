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
	url: 'https://intra.epitech.eu/user/'+ login +'/notes/?format=json',
	type: 'GET',
	format: 'JSONP',
	data: {
		login: login,
		password: password
	},
	success: function(json) {
		var notes = Alloy.Collections.notes;
		json.notes.reverse().forEach(function(row){
			var note = Alloy.createModel('notes', {
				scolaryear: row.scolaryear,
				codemodule: row.codemodule,
				titlemodule: row.titlemodule,
				codeinstance: row.codeinstance,
				codeacti: row.codeacti,
				title: row.title,
				date: row.date,
				correcteur: row.correcteur,
				final_note: row.final_note,
				comment: row.comment
			});
			notes.add(note);
			note.save();
		});
	}
};
Request(query);

/*
 * gestion du clique sur la listview
 */
$.list.addEventListener('itemclick', function(e){
	var section = $.list.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var dialog = Alloy.createController("dialog").getView();
	dialog.setTitle('Commentaire');
	dialog.setOk('Okey');
	dialog.setMessage(item.comment.text);
	dialog.show();
});