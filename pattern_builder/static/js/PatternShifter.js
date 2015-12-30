var PatternShifter = function(initConfig) {
	var config;
	var colors;
	var bottomRightIndex;
	var bottomLeftIndex;
	var deleteIndex;
	var insertIndex;

	var init = function() {
		config = initConfig.config;
		colors = initConfig.colors;
		buildIndexes();
	};

	var buildIndexes = function() {
		var numChars = config.numCols * config.numRows;
		bottomRightIndex = numChars -1;
		bottomLeftIndex = numChars - config.numCols;
		topLeftIndex = 0;
		topRightIndex = config.numCols -1;
	};

	var adjust = function(chars, deleteIndex, insertIndex) {
		chars.splice(deleteIndex, 1);
		chars.splice(insertIndex, 0, colors.getDefault().key);
	};

	init();

	return {
		left:function(chars) {
			for (
				var deleteIndex = bottomLeftIndex,
				insertIndex = bottomRightIndex;

				deleteIndex >= topLeftIndex; 

				deleteIndex -= config.numCols,
				insertIndex -= config.numCols
			) {
				adjust(chars, deleteIndex, insertIndex);
			}

			return chars;
		},
		right:function(chars) {
			for (
				var deleteIndex = bottomRightIndex,
				insertIndex = bottomLeftIndex;

				deleteIndex >= topLeftIndex; 

				deleteIndex -= config.numCols,
				insertIndex -= config.numCols
			) {
				adjust(chars, deleteIndex, insertIndex);
			}
			return chars;
		},
		up:function(chars) {
			for (
				var deleteIndex = topRightIndex,
				insertIndex = bottomRightIndex;

				deleteIndex >= topLeftIndex; 

				deleteIndex--
			) {
				adjust(chars, deleteIndex, insertIndex);
			}

			return chars;
		},
		down:function(chars) {
			var iters = 0;
			for (
				var deleteIndex = bottomLeftIndex,
				insertIndex = topLeftIndex;

				deleteIndex <= bottomRightIndex; 

				deleteIndex++
			) {
				adjust(chars, deleteIndex, insertIndex);
			}

			return chars;
		}
	};

};
