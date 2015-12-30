var TheUtil = function() {

	return {
		repositionArrayElement:function(array, currIndex, newIndex, mode) {
			if (mode == 'insertAfter') {
				newIndex++;
			}
			if (newIndex > currIndex) {
				newIndex--;
			}

			var item = array.splice(currIndex, 1)[0];
			array.splice(newIndex, 0, item);
		}
	};
}();
