var DragScroller = function(initConfig) {
	var topContainer;
	var upHitBox;
	var downHitBox;
	var hitBoxHeight = 20;
	var scrollSpeed = 150;
	var scrollDistance = 54;
	var scrolling = false;

	var init = function() {
		topContainer = initConfig.topContainer;
		calcHitBoxes();
		topContainer.on('dragover', handleDragOver);
	};

	var calcHitBoxes = function() {
		upHitBox = {
			min:0, 
			max:hitBoxHeight
		};
		downHitBox = { 
			min: topContainer.height() - hitBoxHeight,
			max:topContainer.height()
		};
	};

	var handleDragOver = function(e) {
		var y = e.originalEvent.pageY - topContainer.offset().top;
		if (inside(upHitBox, y)) {
			scrollUp();
		}
		if (inside(downHitBox, y)) {
			scrollDown();
		}
	};

	var inside = function(bounds, pos) {
		return pos >= bounds.min && pos <= bounds.max;
	};

	var scrollUp = function() {
		scroll(scrollDistance * -1);
	};

	var scrollDown = function() {
		scroll(scrollDistance);
	};

	var scroll = function(distance) {
		if (scrolling) {
			return;
		}
		scrolling = true;

		var pos = topContainer.scrollTop() + distance;
		topContainer.animate(
			{'scrollTop':pos},
			scrollSpeed,
			'linear',
			function() { 
				scrolling = false;
			}
		);
	};

	init();
};