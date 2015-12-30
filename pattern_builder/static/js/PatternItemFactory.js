var PatternItemFactory = function(initConfig) {
	var patternThumbFactory = initConfig.patternThumbFactory;
	var dragHandlerFactory = initConfig.dragHandlerFactory;
	var patternManager = initConfig.patternManager;

	return {
		build:function(params) {
			params.patternThumbFactory = patternThumbFactory;
			params.dragHandlerFactory = dragHandlerFactory;
			params.patternManager = patternManager;
			return new PatternItem(params);
		}
	};
};
