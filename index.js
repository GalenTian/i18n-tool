var excel = require('excel-export'),
	XLSX = require('xlsx'),
	fs = require('fs');

var DEFAULT_FILE_NAME = 'i18n',
	SHEET_NAME = 'I18N',
	KEY_COLUMN_HEADER = 'Key',
	ERROR_JSON_TO_EXCEL = 'ERROR: jsonToExcel: "conf" param is null or undefined. ',
	JSON_EXTENTION = '.json',
	XLSX_EXTENTION = '.xlsx';

function dealWithConfig(conf) {
	if (!conf) {
		throw ERROR_JSON_TO_EXCEL;
	}
	
	if (!conf.files) {
		conf.files = [];
	}
	
	return conf;
}

function getLangJsons(conf) {
	var _langs = [];
	if (conf.files.length > 0) {
		for (var i = 0, length = conf.files.length; i < length; i++) {
			var _fileName = getJsonFileName(conf.files[i]);
			_langs.push(require(getBaseDir(conf) + _fileName));
			_langs[i]._fileName = _fileName.replace(JSON_EXTENTION, '');
		}
	}
	
	return _langs;
}

function getBaseDir(conf) {
	return conf.baseDir ? (conf.baseDir.endsWith('/') ? conf.baseDir : (conf.baseDir + '/')) : '';
}

function getJsonFileName(file) {
	return file.endsWith(JSON_EXTENTION) ? file : (file + JSON_EXTENTION);
}

function getExcelFileName(conf) {
	var _file = conf.xlsx;
	return _file.endsWith(XLSX_EXTENTION) ? _file : (_file + XLSX_EXTENTION);
}

function getWorkbook(conf) {
	// Get sheet
	var _wb = initWorkbook();
	
	var _ws = XLSX.utils.aoa_to_sheet(getSheetContent(conf));
	
	_wb.SheetNames.push(SHEET_NAME);
	_wb.Sheets[SHEET_NAME] = _ws;
	
	return _wb;
}

function getSheetContent(conf) {
	// Get language json.
	var _lang;
	_langs = getLangJsons(conf);
	
	// Set column's headers
	// Header: KEY, LANG_0, LANG_1, LANG_2...
	var _res = [[KEY_COLUMN_HEADER]];
	for (var i = 0, length = _langs.length; i < length; i++) {
		_res[0].push(_langs[i]._fileName);
	}
	// Set content
	// The key column's contents will be based on the first json file.
	// Content: KEY, LANG_VAL_0, LANG_VAL_1, LANG_VAL_2...
	for (var prop in _langs[0]) {
		var _row = [prop];
		
		for (var i = 0, length = _langs.length; i < length; i++) {
			_row.push(_langs[i][prop]);
		}
		
		_res.push(_row);
	}
	
	return _res;
}

function initWorkbook() {
	return {
		SheetNames: [],
		Sheets: {}
	}
}

exports.jsonToExcel = function (conf) {
	// Deal with config
	dealWithConfig(conf);
	// Convert language json to excel
	var _wb = getWorkbook(conf);
	
	// Export the xlsx file
	var _dist = getBaseDir(conf) + getExcelFileName(conf);
	return XLSX.writeFile(_wb, _dist);
};
