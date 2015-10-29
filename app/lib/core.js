"use strict";

var Alloy = require("alloy");

var App = {

	Navigator: {},

	Device: {
		version: Ti.Platform.version,
		versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
		versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
		width: null,
		height: null,
		dpi: Ti.Platform.displayCaps.dpi,
		orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait"
	},

	Init: function Init() {
		App.Navigator = require("navigation")({
			parent: App.globalWindow
		});
	}
};

module.exports = App;