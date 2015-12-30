var SequencePatternEditorItem = function(initConfig) {
	var id;
	var renderTo;
	var dispatcher;
	var topContainer;
	var dropCallback;
	var removeCallback;
	var instance;
	var patternThumb;

	var init = function() {
		gatherDependencies();
		build();
		addBehavior();
		registerForEvents();
	};

	var gatherDependencies = function() {
		id = initConfig.id;
		renderTo = initConfig.renderTo;
		dispatcher = initConfig.dispatcher;
		dropCallback = initConfig.dropCallback;
		removeCallback = initConfig.removeCallback;
	};

	var build = function() {
		topContainer = $('<div>')
			.appendTo(renderTo)
			.addClass('item unselectable draggable')
			.prop('draggable', true);

		patternThumb = initConfig.patternThumbFactory.build({
			id:id,
			renderTo:topContainer,
			classNames:['mini']
		});

		new PrependDragTarget({
			renderTo:topContainer,
			callback:function(e) {
				dropCallback(e, instance, 'insertBefore');
			}
		});

		new AppendDragTarget({
			renderTo:topContainer,
			callback:function(e) {
				dropCallback(e, instance, 'insertAfter');
			}
		});

		$('<button>')
			.appendTo(topContainer)
			.addClass('icon delete auxiliary')
			.click(remove);

		$('<button>')
			.appendTo(topContainer)
			.addClass('icon edit auxiliary')
			.click(function() {
				dispatcher.send(PatternList.REQUEST_EDIT_PATTERN, id);
			});
	};

	var addBehavior = function() {
		topContainer.on('dragstart', handleDragStart);
		topContainer.on('dragend', handleDragEnd);
	};

	var handleDragStart = function(e) {
		e.originalEvent.dataTransfer.setData('id', id);
		e.originalEvent.dataTransfer.setData('action', 'move');
		e.originalEvent.dataTransfer.setData('index', getIndex());
		e.originalEvent.dataTransfer.effectAllowed = 'link';
		topContainer.addClass('dragging');
		return true;
	};
	
	var handleDragEnd = function(e) {
		topContainer.removeClass('dragging');
	};

	var registerForEvents = function() {
		dispatcher.register(PatternManager.PATTERN_DELETED, onPatternDeleted);
	};

	var unregisterFromEvents = function() {
		dispatcher.unregister(PatternManager.PATTERN_DELETED, onPatternDeleted);
	};

	var remove = function() {
		removeCallback(instance);
		destroy();
	};

	var onPatternDeleted = function(changedId) {
		if (id == changedId) {
			destroy();
		}
	};

	var destroy = function() {
		patternThumb.destroy();
		unregisterFromEvents();
		topContainer.remove();
	};

	// remove this kludge; items should not have intimate knowledge of their
	// container/owner.  dataTransfer.setData can only handle scalars.
	var getIndex = function() {
		return topContainer.index();
	};

	init();
	instance = {
		insertAfter:function(el) {
			topContainer.insertAfter(el);
		},
		insertBefore:function(el) {
			topContainer.insertBefore(el);
		},
		getTopContainer:function() { return topContainer; }
	};
	return instance;
};

