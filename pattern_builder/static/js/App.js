var App = function(initConfig) {
	$(document).ready(function() {
		var config = new Config();
		var colors = new Colors({
			config:config
		});
		var dispatcher = new Dispatcher();
		var patternTableBuilder = new PatternTableBuilder({
			config:config
		});
		var patternApplier = new PatternApplier({
			colors:colors
		});
		var patternShifter = new PatternShifter({
			config:config,
			colors:colors
		});
		var patternManager = new PatternManager({
			patterns:initConfig.patterns,
			dispatcher:dispatcher,
			config:config,
			colors:colors
		});
		var patternEditor = new PatternEditor({
			topContainer:$('#pattern_editor'),
			patternApplier:patternApplier,
			patternTableBuilder:patternTableBuilder,
			patternShifter:patternShifter,
			patternManager:patternManager,
			config:config,
			label:new ChangeAwareLabel({
				topContainer:$('#pattern_editor input')
			}),
			colorPicker:new ColorPicker({
				topContainer:$('#color_picker'),
				colors:colors
			}),
			dispatcher:dispatcher
		});
		var patternThumbFactory = new PatternThumbFactory({
			dispatcher:dispatcher,
			patternManager:patternManager,
			patternApplier:patternApplier,
			patternTableBuilder:patternTableBuilder
		});
		var patternList = new PatternList({
			patternEditor:patternEditor,
			dispatcher:dispatcher,
			patternManager:patternManager,
			itemList:new ItemList({
				topContainer:$('#pattern_list'),
				itemFactory:new PatternItemFactory({
					patternThumbFactory:patternThumbFactory,
					dragHandlerFactory:new PatternDragHandlerFactory({
						hintEl:$('#sequence_pattern_editor')
					}),
					patternManager:patternManager
				}),
				filter:new LabelFilter({
					topContainer:$('#pattern_list .filter_container')
				})
			})
		});
		var sequenceManager = new SequenceManager({
			dispatcher:dispatcher,
			sequences:initConfig.sequences
		});
		var sequencePatternEditor = new SequencePatternEditor({
			topContainer:$('#sequence_pattern_editor'),
			patternThumbFactory:patternThumbFactory,
			dispatcher:dispatcher
		});
		new DragScroller({
			topContainer:$('#sequence_pattern_editor')
		});
		var sequencePreviewFactory = new SequencePreviewFactory({
			sequenceManager:sequenceManager,
			patternManager:patternManager,
			patternApplier:patternApplier,
			patternTableBuilder:patternTableBuilder,
			dispatcher:dispatcher,
			classNames:['mini']
		});
		var sequencePreview = new SequencePreview({
			renderTo:$('#sequence_editor_preview .graphic'),
			sequenceManager:sequenceManager,
			patternManager:patternManager,
			patternApplier:patternApplier,
			patternTableBuilder:patternTableBuilder,
			dispatcher:dispatcher,
			classNames:['preview']
		});
		var sequenceEditor = new SequenceEditor({
			sequenceManager:sequenceManager,
			sequencePreview:sequencePreview,
			sequencePatternEditor:sequencePatternEditor,
			label:new ChangeAwareLabel({
				topContainer:$('#sequence_editor .sequence_label')
			}),
			topContainer:$('#sequence_editor'),
			dispatcher:dispatcher
		});
		var sequenceList = new SequenceList({
			sequenceManager:sequenceManager,
			sequenceEditor:sequenceEditor,
			itemList:new ItemList({
				itemFactory:new SequenceItemFactory({
					sequenceManager:sequenceManager,
					dispatcher:dispatcher,
					sequencePreviewFactory:sequencePreviewFactory
				}),
				topContainer:$('#sequence_list'),
				filter:new LabelFilter({
					topContainer:$('#sequence_list .filter_container')
				})
			})
		});
		new HelpSystem({
			button:$('#help_link'),
			topContainer:$('#help_content')
		});
	});
};
