var Colors = function(initConfig) {
	var colors = initConfig.config.colors;

	var labelMap = {};
	$.each(colors, function(index, hash) {
		labelMap[hash.key] = colors[index];
	});

	return {
		getDefault:function() {
			return colors[0];
		},
		getForKey:function(key) {
			return labelMap[key];
		},
		getAll:function() {
			return colors;
		},
		get:function(index) {
			return colors[index];
		}
	};
};
