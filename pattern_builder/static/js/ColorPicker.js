var ColorPicker = function(initConfig) {
	var topContainer;
	var colors;
	var list;
	var selectedIndex;
	
	var init = function() {
		gatherDependencies();
		build();
		selectSecond();
	};

	var gatherDependencies = function() {
		topContainer = initConfig.topContainer;
		colors = initConfig.colors;
	};

	var build = function() {
		list = topContainer.find('ul');
		$.each(colors.getAll(), function(index, color) {
			var li = $('<li>')
				.appendTo(list)
				.click(select);

			$('<div>')
				.appendTo(li)
				.addClass('sample')
				.css('background-color', color.value);

			$('<span>')
				.appendTo(li)
				.text(color.key);
		});
	};

	var select = function() {
		list.find('li').removeClass('selected');
		$(this).addClass('selected');
		selectedIndex = list.find('li.selected').index();
	};

	var selectSecond = function() {
		list.find('li:nth-child(2)').click();
	};

	init();
	return {
		getCurrentColor:function() {
			return colors.get(selectedIndex);
		},
		nextColor:function() {
			nextIndex = selectedIndex + 1;
			if (nextIndex >= list.find('li').length) {
				nextIndex = 0;
			}
			list.find('li')[nextIndex].click();
		}
	};
};
