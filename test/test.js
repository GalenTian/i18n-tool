var should = require('should');
var i18n = require('../index');

describe('i18n-tool', function () {
	describe('#jsonToExcel(path, distName, callback)', function () {
		it('should throw an error when "conf" parameter is null or undefined', function (done) {
			try {
				i18n.jsonToExcel();
			} catch (e) {
				console.log(e);
				e.should.eql('ERROR: jsonToExcel: "conf" param is null or undefined. ');
				done();
			}
		});
		it('should work well and get an Excel file named "MyI18N". ', function (done) {
			var conf = {
				baseDir: './test',
				files: ['zh-CN.json', 'en-US'],
				xlsx: 'MyI18N'
			}
			var result = i18n.jsonToExcel(conf);
			done();
		});
	});
});