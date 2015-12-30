var PatternList = function(initConfig) {
	var patternEditor;
	var patternManager;
	var itemList;

	var init = function() {
		gatherDependencies();
		registerForEvents();
		build();
	};

	var gatherDependencies = function() {
		patternEditor = initConfig.patternEditor;
		dispatcher = initConfig.dispatcher;
		patternManager = initConfig.patternManager;
		itemList = initConfig.itemList;
	};

	var registerForEvents = function() {
		dispatcher.register(PatternList.REQUEST_EDIT_PATTERN, itemList.select);
	};

	var build = function() {
		itemList.build({
			items:patternManager.getAll(),
			removeCallback:patternManager.remove,
			copyCallback:copyCallback,
			selectCallback:selectCallback,
			addCallback:addCallback
		});
	};

	var selectCallback = function(id) {
		patternEditor.load(id);
	};

	var copyCallback = function(id) {
		var source = patternManager.get(id);
		var insertedId = patternManager.insert(source.label, source.chars);
		insert(insertedId);
	};

	var addCallback = function(label) {
		var insertedId = patternManager.insert(label, []);
		insert(insertedId);
	};

	var insert = function(id) {
		var inserted = patternManager.get(id);
		itemList.add(id, inserted.label);
	};

	init();
};

PatternList.REQUEST_EDIT_PATTERN = 'REQUEST_EDIT_PATTERN';
