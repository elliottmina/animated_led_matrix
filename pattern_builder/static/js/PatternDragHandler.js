var PatternDragHandler = function(initConfig) {
	var id;
	var topContainer;
	var hintEl;

	var init = function() {
		id = initConfig.id;
		topContainer = initConfig.topContainer;
		hintEl = initConfig.hintEl;
		
		topContainer
			.on('dragstart', handleDragStart)
			.on('dragend', handleDragEnd)
			.prop('draggable', true)
			.addClass('draggable');
	};

	var handleDragStart = function(e) {
		e.originalEvent.dataTransfer.setData('id', id);
		e.originalEvent.dataTransfer.setData('action', 'add');
		e.originalEvent.dataTransfer.effectAllowed = 'link';
		topContainer.addClass('dragging');
		hintEl.addClass('drag_target');
		return true;
	};

	var handleDragEnd = function() {
		topContainer.removeClass('dragging');
		hintEl.removeClass('drag_target');
	};

	init();
};
