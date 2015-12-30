var HelpSystem = function(initConfig) {
	var topContainer;

	var init = function() {
		topContainer = initConfig.topContainer;
		initConfig.button.click(function() {
			topContainer.show();
		});
	};

	init();
};