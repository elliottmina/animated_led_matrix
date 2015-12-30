var PatternApplier = function(initConfig) {
	var colors = initConfig.colors;

	var getColorFromChars = function(chars, index) {
		var color = colors.getForKey(chars[index]);
		if (!color) {
			color = colors.getDefault();
		}
		return color;
	};

	return {
		apply:function(table, chars) {
			$.each(table.find('td'), function(index, td) {
				var color = getColorFromChars(chars, index);
				$(td)
					.removeClass()
					.addClass(color.key)
					.css('background-color', color.value);
			});
		}
	};
};
