var ItemList = function(initConfig) {
	var itemFactory;
	var filter;
	var topContainer;
	var listContainer;
	var insertInput;
	var filterInput;
	var removeCallback;
	var copyCallback;
	var selectCallback;
	var addCallback;
	var items;
	var scrollFudge = -50;

	var init = function() {
		itemFactory = initConfig.itemFactory;
		filter = initConfig.filter;
		gatherComponents();
	};

	var gatherDependencies = function(config) {
		removeCallback = config.removeCallback;
		copyCallback = config.copyCallback;
		selectCallback = config.selectCallback;
		addCallback = config.addCallback;
	};

	var gatherComponents = function() {
		topContainer = initConfig.topContainer;
		listContainer = topContainer.find('.items');
		insertInput = topContainer.find('input.insert');
	};

	var addBehavior = function() {
		topContainer.find('form').on('submit', function() {
			insert();
			return false;
		});
	};
	
	var populate = function(itemDatas) {
		items = {};
		$.each(itemDatas, function(id, itemData) {
			buildItem(id, itemData.label);
		});
		sort();
	};

	var sort = function() {
		$.each(getSortedKeys(), function(index, id) {
			items[id].moveTo(listContainer);
		});
	};

	var getSortedKeys = function() {
		var ids = Object.keys(items);
		ids.sort(function(a, b) {
			var aLabel = items[a].getLabel();
			var bLabel = items[b].getLabel();
			return aLabel.localeCompare(bLabel);
		});
		return ids;
	};

	var selectCallbackWrapper = function(id) {
		deselectAllItems();
		selectCallback(id);
	};

	var removeCallbackWrapper = function(id) {
		var removingSelected = items[id].isSelected();

		delete(items[id]);
		removeCallback(id);

		if (removingSelected) {
			selectFirstItem();
		}
	};

	var deselectAllItems = function() {
		topContainer.find('.item').removeClass('selected');
	};

	var selectFirstItem = function() {
		topContainer.find('.item:visible:first').click();
	};

	var buildItem = function(id, label) {
		items[id] = itemFactory.build({
			renderTo:listContainer,
			id:id, 
			label:label,
			removeCallback:removeCallbackWrapper,
			copyCallback:copyCallback,
			selectCallback:selectCallbackWrapper
		});
		return items[id];
	};

	var scrollToItem = function(item) {
		var pos = item.getTop() + listContainer.scrollTop() + scrollFudge;
		listContainer.animate(
			{'scrollTop':pos},
			500,
			'swing'
		);
	};

	var insert = function() {
		var label = $.trim(insertInput.val());
		if (label.length) {
			insertInput.val('');
			addCallback(label);
		}
	};

	var getItems = function() {
		return items;
	};

	var adjustFilterForItemAdd = function(item) {
		if (filter.isFilteredIn(item))
			filter.filter();
		else
			filter.clear();
	};

	init();
	return {
		build:function(params) {
			gatherDependencies(params);
			populate(params.items);
			addBehavior();
			selectFirstItem();
			filter.build({
				getItems:getItems,
				onFilterComplete:selectFirstItem
			});
		},
		add:function(id, label) {
			var item = buildItem(id, label);
			sort();
			adjustFilterForItemAdd(item);
			scrollToItem(item);
			item.select();
		},
		select:function(id) {
			items[id].select();
			scrollToItem(items[id]);
		}
	};
};
