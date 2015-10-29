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

/*
 * configure le nom de l'activité
 */
App.globalWindow.title = $.params.text;

/*
 * configure la vue
 */
$.title.setText($.params.data.title);
$.internal_email.setText($.params.data.internal_email);
$.school_title.setText($.params.data.school_title);
$.gpa.setText("G.P.A: " + $.params.data.gpa[0].gpa);
$.credit.setText("Crédits: "+ $.params.data.credits);

/*
 * download l'image de profil
 */
var query = {
	url: $.params.data.picture,
	type: 'GET',
	format: 'DATA',
	success: function(data) {
		$.userPhoto.image = data;
	}
};
Request(query);

/*
 * gestion de la scrollview
 */
function openSubViewNotes(e) {
	$.notes.trigger('gotNotes', e);
}

function openSubViewDocuments(e) {
	$.documents.trigger('gotDocuments', e);
}

$.notes.on('gotNotes', function(e) {
    $.scrollableView.scrollToView(0);
});

$.documents.on('gotDocuments', function(e) {
    $.scrollableView.scrollToView(1);
});
