var PatternTableBuilder = function(initConfig) {
	var config;

	var init = function() {
		config = initConfig.config;
	};

	var buildCell = function(tr) {
		$('<td>')
			.appendTo(tr);
	};

	var buildTable = function(renderTo, extraCssClasses) {
		var table = $('<table>')
			.appendTo(renderTo)
			.addClass('pattern_table');
		if (extraCssClasses) {
			table.addClass(extraCssClasses.join(' '));
		}
		return table;
	};

	var buildRows = function(tbody) {
		for (rowIndex = 0; rowIndex < config.numRows; rowIndex++) {
			var tr = $('<tr>').appendTo(tbody)
			for (colIndex = 0; colIndex < config.numCols; colIndex++) {
				buildCell(tr);
			}
		}
	};

	init();
	
	return {
		build:function(renderTo, extraCssClasses) {
			var table = buildTable(renderTo, extraCssClasses);
			var tbody = $('<tbody>').appendTo(table);
			buildRows(tbody);
			return table;
		}
	};
};
