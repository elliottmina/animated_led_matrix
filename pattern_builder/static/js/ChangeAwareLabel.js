var ChangeAwareLabel = function(initConfig) {
	var topContainer;
	var handle;
	var threshold = 500;
	var callback;

	var init = function() {
		topContainer = initConfig.topContainer;
		topContainer.keyup(resetTimer);
	};

	var resetTimer = function() {
		clearTimer();
		handle = setTimeout(execute, threshold);
	};

	var clearTimer = function() {
		if (handle) {
			clearTimeout(handle);
		}
	};

	var execute = function() {
		if (callback) {
			callback();
		}
	};

	init();
	return {
		setCallback:function(newCallback) {
			callback = newCallback;
		},
		getValue:function() {
			return topContainer.val();
		},
		setValue:function(newValue) {
			topContainer.val(newValue);
		}
	}
};
