var SequenceItemFactory = function(initConfig) {
	var dispatcher = initConfig.dispatcher;
	var sequenceManager = initConfig.sequenceManager;
	var sequencePreviewFactory = initConfig.sequencePreviewFactory;

	return {
		build:function(config) {
			config.dispatcher = dispatcher;
			config.sequenceManager = sequenceManager;
			config.sequencePreviewFactory = sequencePreviewFactory;
			return new SequenceItem(config);
		}
	};
};
