"use strict";

exports.definition = {
	config: {
		columns: {
			"scolaryear": "TEXT",
			"codemodule": "TEXT",
			"titlemodule": "TEXT",
			"codeinstance": "TEXT",
			"codeacti": "TEXT",
			"title": "TEXT",
			"date": "TEXT",
			"correcteur": "TEXT",
			"final_note": "TEXT",
			"comment": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "notes"
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