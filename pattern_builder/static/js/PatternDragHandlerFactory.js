var PatternDragHandlerFactory = function(initConfig) {
	var hintEl = initConfig.hintEl;

	return {
		build:function(params) {
			params.hintEl = hintEl;
			return new PatternDragHandler(params);
		}
	};
};
