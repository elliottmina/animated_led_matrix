var Dispatcher = function() {

	var list = {};

	var ensureKeyExists = function(eventName) {
		if (typeof list[eventName] === 'undefined') {
			list[eventName] = [];
		}
	};

	return {
		register:function(eventName, callback) {
			ensureKeyExists(eventName);
			list[eventName].push(callback);
		},
		unregister:function(eventName, callback) {
			var index = list[eventName].indexOf(callback);
			list[eventName].splice(index, 1);
		},
		send:function(eventName, context) {
			ensureKeyExists(eventName);
			$.each(list[eventName], function(index, callback) {
				if (callback) {
					callback(context);
				}
			});
		}
	};
};

