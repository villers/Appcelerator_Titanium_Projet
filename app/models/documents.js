"use strict";

exports.definition = {
	config: {
		columns: {
			"title": "TEXT",
			"ctime": "TEXT",
			"fullpath": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "documents"
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