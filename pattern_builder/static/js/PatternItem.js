var PatternItem = function(initConfig) {
	BaseListItem.call(this, initConfig);
	this.gatherDependencies(initConfig);
	this.build(initConfig);
};
PatternItem.prototype = Object.create(BaseListItem.prototype);
PatternItem.prototype.constructor = PatternItem;

PatternItem.prototype.gatherDependencies = function(initConfig) {
	this.patternManager = initConfig.patternManager;
	this.removeCallback = initConfig.removeCallback;
};

PatternItem.prototype.build = function(initConfig) {
	this.patternThumb = initConfig.patternThumbFactory.build({
		id:initConfig.id,
		renderTo:this.contentContainer,
		classNames:['mini']
	});

	initConfig.dragHandlerFactory.build({
		id:initConfig.id,
		topContainer:this.topContainer
	});
};

PatternItem.prototype.getLabel = function() {
	return this.patternManager.get(this.id).label;
};

PatternItem.prototype.destroy = function() {
	this.patternThumb.destroy();
	this.remove();
	this.removeCallback(this.id);
	return false;
};
