var should = require('should');
var i18n = require('../index');

describe('i18n-tool', function () {
	describe('#jsonToExcel(path, distName, callback)', function () {
		it('should throw an error when "path" parameter is null or undefined', function (done) {
			try {
				i18n.jsonToExcel();
			} catch (e) {
				console.log(e);
				e.should.eql('ERROR: jsonToExcel: "path" value is not valid.');
				done();
			}
		});
		it('should work well without "distName" param', function (done) {
			var result = i18n.jsonToExcel('./test/zh-CN.json');
			done();
		});
		it('should work well with all params', function (done) {
			var result = i18n.jsonToExcel('./test/zh-CN.json', 'test_name');
			done();
		});
	});
});