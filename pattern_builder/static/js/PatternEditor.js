var PatternEditor = function(initConfig) {
	var patternApplier;
	var patternShifter;
	var patternManager;
	var colorPicker;
	var colors;
	var label;
	var table;
	var tds;
	var id;

	var init = function() {
		gatherDependencies();
		build();
		addBehavior();
	};

	var gatherDependencies = function() {
		patternApplier = initConfig.patternApplier;
		patternShifter = initConfig.patternShifter;
		patternManager = initConfig.patternManager;
		colorPicker = initConfig.colorPicker;
		colors = initConfig.config.colors;
		label = initConfig.label;
	};

	var build = function() {
		table = initConfig.patternTableBuilder.build(initConfig.topContainer);
		tds = initConfig.topContainer.find('td');
	};

	var addBehavior = function() {
		tds.click(applyColor);
		assignShiftBehavior('.left_control', 'left');
		assignShiftBehavior('.right_control', 'right');
		assignShiftBehavior('.up_control', 'up');
		assignShiftBehavior('.down_control', 'down');
		table.on('contextmenu', onContextMenu);
		label.setCallback(save);
	};

	var assignShiftBehavior = function(selector, direction) {
		initConfig.topContainer.find(selector).click(function() { 
			shift(direction);
		});
	};

	var shift = function(direction) {
		var func = patternShifter[direction];
		var newChars = func(getChars());
		setChars(newChars);
		save();
	};

	var applyColor = function() {
		var color = colorPicker.getCurrentColor();
		$(this)
			.removeClass()
			.addClass(color.key)
			.css('background-color', color.value);
		save();
	};

	var save = function() {
		patternManager.set(id, label.getValue(), getChars());
	};

	var getChars = function() {
		var items = [];
		tds.each(function(index, td) {
			items.push($(td).attr('class'));
		});
		return items;
	};

	var setChars = function(chars) {
		patternApplier.apply(table, chars);
	};

	var onContextMenu = function() {
		colorPicker.nextColor();
		return false;
	};

	init();

	return {
		load:function(newId) {
			id = newId;
			pattern = patternManager.get(id);
			setChars(pattern.chars);
			label.setValue(pattern.label);
		}
	};
};
