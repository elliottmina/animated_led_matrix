var PatternThumb = function(initConfig) {
	var patternManager;
	var patternApplier;
	var dispatcher;
	var id;
	var topContainer;
	var labelEl;
	var table;

	var init = function() {
		gatherDependencies();
		build();
		populate();
		registerForEvents();
	};

	var gatherDependencies = function() {
		id = initConfig.id;
		patternManager = initConfig.patternManager;
		patternApplier = initConfig.patternApplier;
		dispatcher = initConfig.dispatcher;
	};

	var build = function() {
		topContainer = $('<div>')
			.appendTo(initConfig.renderTo)
			.addClass('pattern_thumb')
			.prop('title', id);

		table = initConfig.patternTableBuilder.build(
			topContainer, 
			initConfig.classNames
		);

		labelEl = $('<label>').appendTo(topContainer);
	};

	var populate = function() {
		var pattern = patternManager.get(id);
		patternApplier.apply(table, pattern.chars);
		labelEl.text(pattern.label);
	};

	var registerForEvents = function() {
		dispatcher.register(PatternManager.PATTERN_CHANGED, onPatternChanged);
		dispatcher.register(PatternManager.PATTERN_DELETED, onPatternDeleted);
	};

	var unregisterFromEvents = function() {
		dispatcher.unregister(PatternManager.PATTERN_CHANGED, onPatternChanged);
		dispatcher.unregister(PatternManager.PATTERN_DELETED, onPatternDeleted);
	};

	var onPatternChanged = function(changedId) {
		if (changedId == id) {
			populate();
		}
	};

	var onPatternDeleted = function(changedId) {
		if (changedId == id) {
			topContainer.remove();
		}
	};

	init();
	return {
		getLabel:function() { return patternManager.get(id).label; },
		destroy:unregisterFromEvents
	};
};