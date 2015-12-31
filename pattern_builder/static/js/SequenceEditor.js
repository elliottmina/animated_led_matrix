var SequenceEditor = function(initConfig) {
	var sequenceManager;
	var sequencePreview;
	var sequencePatternEditor;
	var label;
	var id;

	var init = function() {
		gatherDependencies();
		addBehavior();
		registerForEvents();
		label.setCallback(save);
	};

	var gatherDependencies = function() {
		sequenceManager = initConfig.sequenceManager;
		sequencePreview = initConfig.sequencePreview;
		sequencePatternEditor = initConfig.sequencePatternEditor;
		label = initConfig.label;
	};

	var addBehavior = function() {
		setButtonSpeed('button.1x', 500).click();
		setButtonSpeed('button.2x', 250);
		setButtonSpeed('button.3x', 167);
	};

	var setButtonSpeed = function(selector, speed) {
		return initConfig.topContainer.find(selector).click(function() {
			sequencePreview.setSpeed(speed);
			$(this).parent().find('button').removeClass('active');
			$(this).addClass('active');
		});
	};

	var registerForEvents = function() {
		initConfig.dispatcher.register(SequencePatternEditor.SEQUENCE_PATTERNS_CHANGED, save);
		initConfig.dispatcher.register(SequenceManager.SEQUENCE_DELETED, onSequenceDeleted);
	};

	var save = function() {
		sequenceManager.set(
			id, 
			label.getValue(), 
			sequencePatternEditor.getPatterns());
	};

	var onSequenceDeleted = function(deletedId) {
		if (id == deletedId) {
			sequencePatternEditor.clear();
			sequencePreview.clear();
			label.setValue('');
		}
	};

	init();
	return {
		load:function(newId) {
			id = newId;
			var sequence = sequenceManager.get(id);
			sequencePatternEditor.load(id, sequence.patterns);
			sequencePreview.load(id);
			label.setValue(sequence.label);
		}
	};
};
