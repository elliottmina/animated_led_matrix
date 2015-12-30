var SequencePreview = function(initConfig) {
	var sequenceManager;
	var patternManager;
	var patternApplier;
	var dispatcher;
	var table;
	var id;
	var patternIds;
	var playIndex;
	var speed = 1000;
	var handle;

	var init = function(patternManager) {
		gatherDependencies();
		build();
		registerForEvents();
	};

	var gatherDependencies = function() {
		sequenceManager = initConfig.sequenceManager;
		patternManager = initConfig.patternManager;
		patternApplier = initConfig.patternApplier;
		dispatcher = initConfig.dispatcher;
	};

	var build = function() {
		var topContainer = $('<div>')
			.appendTo(initConfig.renderTo)
			.addClass('sequence_preview');

		table = initConfig.patternTableBuilder.build(
			topContainer, 
			initConfig.classNames);
	};

	var registerForEvents = function() {
		dispatcher.register(SequenceManager.SEQUENCE_CHANGED, 
			onSequenceChanged);
	};

	var unregisterFromEvents = function() {
		dispatcher.unregister(SequenceManager.SEQUENCE_CHANGED, 
			onSequenceChanged);
	};

	var start = function() {
		clearTimer();
		patternIds = sequenceManager.get(id).patterns;
		playIndex = -1;
		playNext();
	};

	var playNext = function() {
		incrementPlayIndex();

		var patternId = patternIds[playIndex];
		if (!patternId) {
			patternApplier.apply(table, []);
			return;
		}

		var pattern = patternManager.get(patternId);
		patternApplier.apply(table, pattern.chars);
		handle = setTimeout(playNext, speed);
	};

	var incrementPlayIndex = function() {
		playIndex++;
		if (playIndex == patternIds.length) {
			playIndex = 0;
		}
	};

	var clearTimer = function() {
		if (handle) {
			clearTimeout(handle);
		}
	};

	var onSequenceChanged = function(changedId) {
		if (changedId == id) {
			load(changedId);
		}
	};

	var load = function(sequenceId) {
		id = sequenceId;
		start();
	};

	init();
	return {
		load:load,
		setSpeed:function(newSpeed) {
			speed = newSpeed;
		},
		destroy:function() {
			unregisterFromEvents();
		},
		clear:function() {
			clearTimer();
			patternApplier.apply(table, []);
		}
	};
};
