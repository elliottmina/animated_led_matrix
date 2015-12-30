var BaseItem = function(initConfig) {
	var id;
	var label;
	var topContainer;
	var contentContainer;
	var removeCallback;
	var copyCallback;
	var selectCallback;

	var init = function() {
		gatherDependcies();
		build();
	};

	var gatherDependcies = function() {
		id = initConfig.id;
		label = initConfig.label;
		removeCallback = initConfig.removeCallback;
		copyCallback = initConfig.copyCallback;
		selectCallback = initConfig.selectCallback;
	};

	var build = function() {
		topContainer = $('<div>')
			.appendTo(initConfig.renderTo)
			.addClass('item')
			.click(select)
			.prop('title', id);

		contentContainer = $('<div>')
			.appendTo(topContainer)
			.addClass('content_container');

		var buttonContainer = $('<div>')
			.appendTo(topContainer)
			.addClass('button_container');

		$('<button>')
			.appendTo(buttonContainer)
			.addClass('icon delete auxiliary')
			.click(remove);

		$('<button>')
			.appendTo(buttonContainer)
			.addClass('icon copy auxiliary')
			.click(copy);
	};
	
	var copy = function() {
		copyCallback(id);
		return false;
	};

	var remove = function() {
		topContainer.remove();
		removeCallback(id);
		return false;
	};

	var select = function() {
		selectCallback(id);
		topContainer.addClass('selected');
	};

	init();
	return {
		select:select,
		getTop:function() {
			return topContainer.offset().top;
		},
		getContentContainer:function() {
			return contentContainer;
		},
		getTopContainer:function() {
			return topContainer;
		},
		moveTo:function(newHome) {
			topContainer.appendTo(newHome);
		},
		getLabel:function() {
			return label;
		},
		hide:function() {
			topContainer.hide();
		},
		show:function() {
			topContainer.show();
		},
		isSelected:function() {
			return topContainer.hasClass('selected');
		},
		remove:remove
	};
};
