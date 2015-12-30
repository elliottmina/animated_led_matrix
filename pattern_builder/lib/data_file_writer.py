import json
import app

def save_data(key, json_data):
	try:
		path = '{}/data/{}.json'.format(app.BASE_DIR, key)
		with open(path, 'w') as handle:
			handle.write(json.dumps(json_data))
	except Exception as e:
		return str(e)
