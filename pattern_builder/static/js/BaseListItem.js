var BaseListItem = function(initConfig) {
	this._gatherDependencies(initConfig);
	this._build(initConfig);
};

BaseListItem.prototype._gatherDependencies = function(initConfig) {
	this.id = initConfig.id;
	this.copyCallback = initConfig.copyCallback;
	this.selectCallback = initConfig.selectCallback;
};

BaseListItem.prototype._build = function(initConfig) {
	this.topContainer = $('<div>')
		.appendTo(initConfig.renderTo)
		.addClass('item')
		.bind('click', $.proxy(this.select, this))
		.prop('title', this.id);

	this.contentContainer = $('<div>')
		.appendTo(this.topContainer)
		.addClass('content_container');

	var buttonContainer = $('<div>')
		.appendTo(this.topContainer)
		.addClass('button_container');

	$('<button>')
		.appendTo(buttonContainer)
		.addClass('icon delete auxiliary')
		.bind('click', $.proxy(this.destroy, this));

	$('<button>')
		.appendTo(buttonContainer)
		.addClass('icon copy auxiliary')
		.bind('click', $.proxy(this.copy, this));
};

BaseListItem.prototype.copy = function() {
	this.copyCallback(this.id);
	return false;
};

BaseListItem.prototype.remove = function() {
	this.topContainer.remove();
};

BaseListItem.prototype.select = function() {
	this.selectCallback(this.id);
	this.topContainer.addClass('selected');
};

BaseListItem.prototype.getTop = function() {
	return this.topContainer.offset().top;
};

BaseListItem.prototype.getTopContainer = function() {
	return this.topContainer;
};

BaseListItem.prototype.moveTo = function(newHome) {
	this.topContainer.appendTo(newHome);
};

BaseListItem.prototype.hide = function() {
	this.topContainer.hide();
};

BaseListItem.prototype.show = function() {
	this.topContainer.show();
};

BaseListItem.prototype.isSelected = function() {
	return this.topContainer.hasClass('selected');
};
