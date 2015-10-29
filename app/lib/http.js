"use strict";

/**
 * Standard HTTP Request
 * @param {Object} _arguments
 * @param {Number} _arguments.timeout
 * @param {String} _arguments.type "GET", "POST", etc
 * @param {String} _arguments.format "JSON", "TEXT", "XML" or "DATA"
 * @param {String} _arguments.url
 * @param {Array} _arguments.headers
 * @param {Mixed} _arguments.data
 * @param {Function} _arguments.failure
 * @param {Function} _arguments.success
 * @param {Function} _arguments.passthrough
 */
module.exports = function (_arguments) {
	Ti.API.debug("HTTP.request " + _arguments.url);

	if (Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient();

		xhr.timeout = _arguments.timeout ? _arguments.timeout : 5000;

		xhr.onload = function (_data) {
			if (_data) {
				switch (_arguments.format.toLowerCase()) {
					case "data":
					case "xml":
						_data = this.responseData;
						break;
					case "json":
						_data = eval(this.responseText);
						break;
					case "jsonp":
						_data = JSON.parse(this.responseText);
						break;
					case "text":
						_data = this.responseText;
						break;
				}

				if (_arguments.success) {
					if (_arguments.passthrough) {
						_arguments.success(_data, _arguments.url, _arguments.passthrough);
					} else {
						_arguments.success(_data, _arguments.url);
					}
				} else {
					return _data;
				}
			}
		};

		if (_arguments.ondatastream) {
			xhr.ondatastream = function (_event) {
				if (_arguments.ondatastream) {
					_arguments.ondatastream(_event.progress);
				}
			};
		}

		xhr.onerror = function (_event) {
			if (_arguments.failure) {
				if (_arguments.passthrough) {
					_arguments.failure(this, _arguments.url, _arguments.passthrough);
				} else {
					_arguments.failure(this, _arguments.url);
				}
			} else {
				Ti.API.error(JSON.stringify(this));
			}

			Ti.API.error(_event);
		};

		_arguments.type = _arguments.type ? _arguments.type : "GET";
		_arguments.async = _arguments.async ? _arguments.async : true;

		xhr.open(_arguments.type, _arguments.url, _arguments.async);

		if (_arguments.headers) {
			for (var i = 0, j = _arguments.headers.length; i < j; i++) {
				xhr.setRequestHeader(_arguments.headers[i].name, _arguments.headers[i].value);
			}
		}

		xhr.setRequestHeader("User-Agent", "Appcelerator Titanium/" + Ti.version + " (" + Ti.Platform.osname + "/" + Ti.Platform.version + "; " + Ti.Platform.name + "; " + Ti.Locale.currentLocale + ";)");

		if (_arguments.data) {
			xhr.send(JSON.stringify(_arguments.data));
		} else {
			xhr.send();
		}
	} else {
		Ti.API.error("No internet connection");

		if (_arguments.failure) {
			if (_arguments.passthrough) {
				_arguments.failure(null, _arguments.url, _arguments.passthrough);
			} else {
				_arguments.failure(null, _arguments.url);
			}
		}
	}
};