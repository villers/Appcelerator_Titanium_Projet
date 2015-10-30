"use strict";

exports.definition = {
	config: {
		columns: {
			"titlemodule": "TEXT",
			"room": "TEXT",
			"acti_title": "TEXT",
			"start": "TEXT",
			"end": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "plannings"
		}
	},
	extendModel: function extendModel(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function extendCollection(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};