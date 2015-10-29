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
	url: 'https://intra.epitech.eu/user/'+ login +'/document/?format=json',
	type: 'GET',
	format: 'JSONP',
	data: {
		login: login,
		password: password
	},
	success: function(json) {
		var documents = Alloy.Collections.documents;
		json.forEach(function(row){
			var document = Alloy.createModel('documents', {
				title: row.title,
				ctime: row.ctime,
				fullpath: row.fullpath
			});
			documents.add(document);
			document.save();
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
    
    var query = {
		url: 'https://intra.epitech.eu' + item.fullpath.text,
		type: 'GET',
		format: 'DATA',
		data: {
			login: login,
			password: password
		},
		success: function(data) {
			var file;
	        if(Ti.Filesystem.isExternalStoragePresent()) {
	        	file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, item.title.text);
	        } else {
	        	file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, item.title.text);  
	    	}
			
			if (!file.write(data)) {
				alert('save fail');
			}
			
			var intent = Ti.Android.createIntent({
				action : Ti.Android.ACTION_VIEW,
				type : 'application/pdf',
				data : file.getNativePath()
			});
			Ti.Android.currentActivity.startActivity(intent);
		}
	};
	Request(query);	
});