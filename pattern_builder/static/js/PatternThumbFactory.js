var PatternThumbFactory = function(initConfig) {
	var dispatcher = initConfig.dispatcher;
	var patternManager = initConfig.patternManager;
	var patternApplier = initConfig.patternApplier;
	var patternTableBuilder = initConfig.patternTableBuilder;

	return {
		build:function(config) {
			config.dispatcher = dispatcher;
			config.patternManager = patternManager;
			config.patternApplier = patternApplier;
			config.patternTableBuilder = patternTableBuilder;
			return new PatternThumb(config);
		}
	};

};
