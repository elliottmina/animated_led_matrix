var PrependDragTarget = function(initConfig) {
	initConfig.classNames = ['prepend'];
	return DragTarget(initConfig);
};

var AppendDragTarget = function(initConfig) {
	initConfig.classNames = ['append'];
	return DragTarget(initConfig);
};

var DragTarget = function(initConfig) {
	var callback;
	var topContainer;

	var init = function() {
		callback = initConfig.callback;
		build();
		addBehavior();
	};

	var build = function() {
		topContainer = $('<div>')
			.appendTo(initConfig.renderTo)
			.addClass('drag_target')
			.addClass(initConfig.classNames.join(' '));
	};

	var addBehavior = function() {
		topContainer.on('dragover', handleDragOver);
		topContainer.on('dragleave', handleDragLeave);
		topContainer.on('drop', handleDrop);
	};

	var handleDragOver = function() {
		topContainer.addClass('dragover');
	};

	var handleDragLeave = function() {
		topContainer.removeClass('dragover');
	};

	var handleDrop = function(e) {
		topContainer.removeClass('dragover');
		callback(e);
		e.originalEvent.stopPropagation();
		return false;
	};

	init();
};
