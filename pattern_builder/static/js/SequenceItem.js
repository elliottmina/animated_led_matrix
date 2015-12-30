var SequenceItem = function(initConfig) {
	BaseListItem.call(this, initConfig);
	this.gatherDependencies(initConfig);
	this.build(initConfig);
	this.registerForEvents();
};
SequenceItem.prototype = Object.create(BaseListItem.prototype);
SequenceItem.prototype.constructor = SequenceItem;

SequenceItem.prototype.gatherDependencies = function(initConfig) {
	this.sequenceManager = initConfig.sequenceManager;
	this.dispatcher = initConfig.dispatcher;
	this.removeCallback = initConfig.removeCallback;
};

SequenceItem.prototype.build = function(initConfig) {
	this.labelEl = $('<label>')
		.appendTo(this.contentContainer)
		.text(initConfig.label);

	this.preview = initConfig.sequencePreviewFactory.build({
		renderTo:this.contentContainer,
		classNames:['mini']
	});
	this.preview.load(this.id);
};

SequenceItem.prototype.registerForEvents = function() {
	this.dispatcher.register(
		SequenceManager.SEQUENCE_CHANGED, 
		$.proxy(this.onSequenceChanged, this));
};

SequenceItem.prototype.onSequenceChanged = function(changedId) {
	if (this.id == changedId) {
		this.labelEl.text(this.sequenceManager.get(this.id).label);
	}
};

SequenceItem.prototype.getLabel = function() {
	return this.sequenceManager.get(this.id).label;
};

SequenceItem.prototype.destroy = function() {
	this.preview.destroy();
	this.unregisterFromEvents();
	this.remove();
	this.removeCallback(this.id);
	return false;
};

SequenceItem.prototype.unregisterFromEvents = function() {
	this.dispatcher.unregister(SequenceManager.SEQUENCE_CHANGED, 
		this.onSequenceChanged);
};
