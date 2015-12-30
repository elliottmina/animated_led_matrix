var SequencePatternEditor = function(initConfig) {
	var topContainer;
	var patternThumbFactory;
	var dispatcher;
	var patterns;
	var items;
	var sequenceId;

	var init = function() {
		gatherDependencies();
		addBehavior();
	};

	var gatherDependencies = function() {
		topContainer = initConfig.topContainer;
		patternThumbFactory = initConfig.patternThumbFactory;
		dispatcher = initConfig.dispatcher;
	};

	var addBehavior = function() {
		topContainer.on('drop', handleDrop);
		topContainer.on('dragover', handleDragOver);
	};

	var buildItems = function() {
		topContainer.empty();
		items = [];
		$.each(patterns, function(index, patternId) {
			buildItem(patternId);
		});
	};

	var buildItem = function(patternId) {
		items.push(new SequencePatternEditorItem({
			id:patternId,
			renderTo:topContainer,
			patternThumbFactory:patternThumbFactory,
			dispatcher:dispatcher,
			dropCallback:handleDropOnItem,
			removeCallback:removeItem
		}));
	};

	var handleDrop = function(e) {
		if (!sequenceId) {
			return;
		}

		var action = extractEventData(e, 'action');
		if (action == 'add') {
			handleAddItemDrop(e);
		} else if (action == 'move') {
			handleMoveItemDrop(e);
		}

		e.originalEvent.stopPropagation();
		return false;
	};

	var handleAddItemDrop = function(e) {
		var patternId = extractEventData(e, 'id');
		addPattern(patternId);
		onPatternsChanged();
	};

	var handleMoveItemDrop = function(e) {
		handleMoveItem(e, lastIndex(), 'insertAfter');
	};

	var handleDragOver = function(e) {
		e.originalEvent.stopPropagation();
		e.originalEvent.preventDefault();
		return true;
	};

	var handleDropOnItem = function(e, targetItem, mode) {
		var action = extractEventData(e, 'action');
		var targetItemIndex = targetItem.getTopContainer().index();

		if (action == 'add') {
			handleSpliceNewItem(e, targetItemIndex, mode);
		} else if (action == 'move') {
			handleMoveItem(e, targetItemIndex, mode);
		}
	};

	var handleSpliceNewItem = function(e, targetItemIndex, mode) {
		addPattern(extractEventData(e, 'id'));
		moveItem(lastIndex(), targetItemIndex, mode);
		onPatternsChanged();
	};

	var handleMoveItem = function(e, newIndex, mode) {
		var droppedItemIndex = parseInt(extractEventData(e, 'index'));
		moveItem(droppedItemIndex, newIndex, mode);
		onPatternsChanged();
	};

	var addPattern = function(patternId) {
		buildItem(patternId);
		patterns.push(patternId);
	};

	var removeItem = function(item) {
		var index = item.getTopContainer().index();
		patterns.splice(index, 1);
		items.splice(index, 1);
		onPatternsChanged();
	};

	var extractEventData = function(e, key) {
		return e.originalEvent.dataTransfer.getData(key);
	};

	var moveItem = function(currIndex, newIndex, mode) {
		moveItemDom(currIndex, newIndex, mode);
		TheUtil.repositionArrayElement(patterns, currIndex, newIndex, mode);
		TheUtil.repositionArrayElement(items, currIndex, newIndex, mode);
	};

	var moveItemDom = function(currIndex, newIndex, mode) {
		var displacedSiblingContainer = items[newIndex].getTopContainer();
		items[currIndex][mode](displacedSiblingContainer);
	};

	var onPatternsChanged = function() {
		dispatcher.send(SequencePatternEditor.SEQUENCE_PATTERNS_CHANGED);
	};

	var lastIndex = function() {
		return patterns.length -1;
	};

	init();
	return {
		load:function(newSequenceId, newPatterns) {
			sequenceId = newSequenceId;
			patterns = newPatterns;
			buildItems();
		},
		getPatterns:function() {
			return patterns;
		},
		clear:function() {
			sequenceId = undefined;
			patterns = [];
			buildItems();
		}
	}
};

SequencePatternEditor.SEQUENCE_PATTERNS_CHANGED = 'SEQUENCE_PATTERNS_CHANGED';
