var SequenceList = function(initConfig) {
	var sequenceManager;
	var sequenceEditor;
	var itemList;

	var init = function() {
		gatherDependencies();
		build();
	};

	var gatherDependencies = function() {
		sequenceManager = initConfig.sequenceManager;
		sequenceEditor = initConfig.sequenceEditor;
		itemList = initConfig.itemList;
	};

	var build = function() {
		itemList.build({
			items:sequenceManager.getAll(),
			removeCallback:sequenceManager.remove,
			copyCallback:copyCallback,
			selectCallback:selectCallback,
			addCallback:addCallback
		});
	};

	var selectCallback = function(id) {
		sequenceEditor.load(id);
	};

	var copyCallback = function(id) {
		var source = sequenceManager.get(id);
		var insertedId = sequenceManager.insert(source.label, source.patterns);
		insert(insertedId);
	};

	var addCallback = function(label) {
		var insertedId = sequenceManager.insert(label, []);
		insert(insertedId);
	};

	var insert = function(id) {
		var inserted = sequenceManager.get(id);
		itemList.add(id, inserted.label);
	};

	init();
};
