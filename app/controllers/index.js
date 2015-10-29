"use strict";

/*
 * bootstrap l'application
 */
var App = require("core");

/*
 * sauvegarde la référence de la première activité puis l'ouvre
 */
App.globalWindow = $.window;
App.globalWindow.open();

/*
 * initialise le singleton de l'application
 */
App.Init();

/*
 * démarre la première activité
 */
App.Navigator.open("login", {
	text: "Web@cadémie"
});