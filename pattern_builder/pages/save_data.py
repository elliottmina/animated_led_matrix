from lib import data_file_writer
from flask import request

def render(key):
	payload = request.get_json()
	data_file_writer.save_data(key, payload[key])
	return '{"success":true}'
