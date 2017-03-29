var excel = require('excel-export'),
	XLSX = require('xlsx'),
	fs = require('fs');

var DEFAULT_FILE_NAME = 'i18n',
	SHEET_NAME = 'I18N',
	KEY_COLUMN = 'Key',
	ERROR_JSON_TO_EXCEL = 'ERROR: jsonToExcel: "path" value is not valid.';

function setArguments(args) {
	// path
	var _path = args[0];
	if (!_path || typeof _path !== 'string') {
		throw ERROR_JSON_TO_EXCEL;
		return args;
	}
	// dist file name
	var _distName = args[1];
	if (args.length === 2) {
		if (typeof args[1] === 'string') _distName = args[1];
	}
	
	// callback
	var _callback;
	if (typeof args[args.length - 1] === 'function') _callback = args[args.length - 1];
	
	// Final setting
	args[0] = _path;
	args[1] = _distName && typeof _distName === 'string' ? _distName : DEFAULT_FILE_NAME;
	args[2] = _callback ? _callback : function () {};
	
	return args;
}

function getLangJson(path) {
	return require(path);
}

function getFileName(path) {
	var _index = path.lastIndexOf('/');
	
	return path.slice(_index > 0 ? (_index + 1) : 0, path.lastIndexOf('.'));
}

function getPath(path) {
	var _index = path.lastIndexOf('/');
	
	return _index > 0 ? path.slice(0, _index + 1) : '';
}

function getWorkbook(json, fileName) {
	var _wb = initWorkbook();
	
	var _ws = XLSX.utils.aoa_to_sheet(getSheetContent(json, fileName));
	
	_wb.SheetNames.push(SHEET_NAME);
	_wb.Sheets[SHEET_NAME] = _ws;
	
	return _wb;
}

function getSheetContent(json, fileName) {
	var _res = [];
	
	// Set columns
	_res.push([KEY_COLUMN, fileName]);
	for (var prop in json) {
		_res.push([prop, json[prop]]);
	}
	
	return _res;
}

function initWorkbook() {
	return {
		SheetNames: [],
		Sheets: {}
	}
}

exports.jsonToExcel = function (path, distName, callback) {
	// Deal with arguments
	arguments = setArguments(arguments);
	var _path = arguments[0];
	var _distName = arguments[1];
	var _callback = arguments[2];
	
	// Get language json.
	var _lang;
	try {
		_lang = getLangJson(path);
	}
	catch (e) {
		_callback.call(this, e);
	}
	
	// Convert json to excel
	var _wb = getWorkbook(_lang, getFileName(path));
	
	var _dist = getPath(path) + _distName + '.xlsx';
	
	XLSX.writeFile(_wb, _dist);
	
	_callback.call(this, null, _dist);
};
