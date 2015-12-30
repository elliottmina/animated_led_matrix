from flask import render_template
import glob
import app

def render():
	with open(app.BASE_DIR + '/data/patterns.json', 'r') as handle:
		patterns_json = handle.read()
	with open(app.BASE_DIR + '/data/sequences.json', 'r') as handle:
		sequences_json = handle.read()

	return render_template('index.html', **{
		'patterns':patterns_json,
		'sequences':sequences_json,
		'css_paths':build_paths(app.BASE_DIR + '/static/css/*.css'),
		'js_paths':build_paths(app.BASE_DIR + '/static/js/*.js'),
	})

def build_paths(pattern):
	paths = [];
	for path in glob.glob(pattern):
		paths.append(get_path_from_static(path))
	return paths

def get_path_from_static(path):
	return path.replace(app.BASE_DIR, '')

