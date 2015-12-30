var SequencePreviewFactory = function(initConfig) {
	var sequenceManager = initConfig.sequenceManager;
	var patternManager = initConfig.patternManager;
	var patternApplier = initConfig.patternApplier;
	var patternTableBuilder = initConfig.patternTableBuilder;
	var dispatcher = initConfig.dispatcher;

	return {
		build:function(config) {
			config.sequenceManager = sequenceManager;
			config.patternManager = patternManager;
			config.patternApplier = patternApplier;
			config.patternTableBuilder = patternTableBuilder;
			config.dispatcher = dispatcher;
			return new SequencePreview(config);
		}
	}
};
