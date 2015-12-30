import os
import importlib

path = os.path.dirname(__file__)
module_dir = os.path.split(path)[1]

for module in os.listdir(os.path.dirname(__file__)):
	if module == '__init__.py' or module[-3:] != '.py':
		continue
	importlib.import_module(module_dir + '.' + module[:-3])
	del module
