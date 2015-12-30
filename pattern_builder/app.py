#!/usr/bin/env python3
import os
from flask import Flask
import pages

BASE_DIR = os.path.abspath(__file__ + '/../') 
app = Flask(__name__)

@app.route('/')
def index():
	return pages.index.render()

@app.route('/patterns', methods=['POST'])
def patterns():
	return pages.save_data.render('patterns')

@app.route('/sequences', methods=['POST'])
def sequences():
	return pages.save_data.render('sequences')

if __name__ == '__main__':
	app.run(debug=True)
