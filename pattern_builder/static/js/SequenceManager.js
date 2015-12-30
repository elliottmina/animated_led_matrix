var SequenceManager = function(initConfig) {
	var sequences;
	var dispatcher;

	var init = function() {
		gatherDependencies();
		registerForEvents();
	};

	var gatherDependencies = function() {
		sequences = initConfig.sequences;
		dispatcher = initConfig.dispatcher;
	};

	var registerForEvents = function() {
		dispatcher.register(PatternManager.PATTERN_DELETED, onPatternDeleted);
	};

	var onPatternDeleted = function(deletedPatternId) {
		$.each(sequences, function(sequenceId, sequence) {
			removePattern(deletedPatternId, sequenceId, sequence);
		});
		save();
	};

	var removePattern = function(deletedPatternId, sequenceId, sequence) {
		var index;
		for (var i = 0; i < 1000; i++) {
			index = $.inArray(deletedPatternId, sequence.patterns);
			if (index === -1) {
				break;
			}
			sequence.patterns.splice(index, 1);
		}
		sequences[sequenceId] = sequence;
	};

	var save = function() {
		new BasicAjax({
			url:'/sequences',
			data:{sequences:sequences}
		}).post();
	};

	init();

	return {
		getAll:function() {
			return sequences;
		},
		get:function(id) {
			return sequences[id];
		},
		set:function(id, label, patterns) {
			sequences[id] = {
				label:label,
				patterns:patterns
			};
			save();
			dispatcher.send(SequenceManager.SEQUENCE_CHANGED, id);
		},
		insert:function(label, patterns) {
			var id = $.uuid2();
			sequences[id] = {
				label:label,
				patterns:patterns
			};
			save();
			return id;
		},
		remove:function(id) {
			delete(sequences[id]);
			save();
			dispatcher.send(SequenceManager.SEQUENCE_DELETED, id);
		}
	};
};
SequenceManager.SEQUENCE_CHANGED = 'SEQUENCE_CHANGED';
SequenceManager.SEQUENCE_DELETED = 'SEQUENCE_DELETED';
