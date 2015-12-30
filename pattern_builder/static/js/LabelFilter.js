var LabelFilter = function(initConfig) {
	var input;
	var numHiddenContainer;
	var numHiddenCountContainer;
	var getItems;
	var onFilterComplete;
	var searchStr = '';
	var numHidden = 0;

	var init = function() {
		gatherComponents();
		addBehavior();
	};

	var gatherComponents = function() {
		input = initConfig.topContainer.find('input');
		numHiddenContainer = initConfig.topContainer.find('.num_hidden');
		numHiddenCountContainer = initConfig.topContainer.find('.count');
	};

	var gatherDependencies = function(params) {
		getItems = params.getItems;
		onFilterComplete = params.onFilterComplete;
	};

	var addBehavior = function() {
		input.keyup(onChange);
		initConfig.topContainer.find('button').click(clear);
	};

	var onChange = function() {
		if (getItems === undefined) return;

		searchStr = input.val().toLowerCase();
		numHidden = 0;
		$.each(getItems(), filterItem);
		updateNumHiddenDisplay();
		onFilterComplete();
	};

	var filterItem = function(id, item) {
		if (isFilteredIn(item)) {
			item.show();
		} else {
			item.hide();
			numHidden++;
		}
	};

	var isFilteredIn = function(item) {
		if (!searchStr || searchStr == '') {
			return true;
		}
		var subject = item.getLabel().toLowerCase();
		return subject.indexOf(searchStr) > -1;
	};

	var updateNumHiddenDisplay = function() {
		if (numHidden == 0) {
			numHiddenContainer.hide();
		} else {
			numHiddenContainer.show();
			numHiddenCountContainer.text(numHidden);
		}
	};

	var clear = function() {
		input.val('');
		onChange();
	};

	init();
	return {
		build:function(params) {
			gatherDependencies(params);
			addBehavior();
		},
		filter:onChange,
		isFilteredIn:isFilteredIn,
		clear:clear
	};
};
