var PatternManager = function(initConfig) {
	var patterns;
	var dispatcher;
	var config;
	var colors;

	var init = function() {
		patterns = initConfig.patterns;
		dispatcher = initConfig.dispatcher;
		config = initConfig.config;
		colors = initConfig.colors;
	};

	var ensureCharsLength = function(chars) {
		var count = config.numRows * config.numCols;
		while (chars.length < count) {
			chars.push(colors.getDefault().key);
		}
		return chars;
	};

	var save = function() {
		new BasicAjax({
			url:'/patterns',
			data:{patterns:patterns}
		}).post();
	};

	init();

	return {
		getAll:function() {
			return patterns;
		},
		get:function(id) {
			return patterns[id];
		},
		set:function(id, label, chars) {
			patterns[id] = {
				label:label,
				chars:ensureCharsLength(chars)
			};
			save();
			dispatcher.send(PatternManager.PATTERN_CHANGED, id);
		},
		insert:function(label, chars) {
			var id = $.uuid2();
			patterns[id] = {
				label:label,
				chars:ensureCharsLength(chars)
			};
			save();
			dispatcher.send(PatternManager.PATTERN_INSERTED, id);
			return id;
		},
		remove:function(id) {
			delete(patterns[id]);
			save();
			dispatcher.send(PatternManager.PATTERN_DELETED, id);
		}
	};
};
PatternManager.PATTERN_CHANGED = 'PATTERN_CHANGED';
PatternManager.PATTERN_INSERTED = 'PATTERN_INSERTED';
PatternManager.PATTERN_DELETED = 'PATTERN_DELETED';
