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
			i18n.jsonToExcel('./test/zh-CN.json', function (err, data) {
				should.not.exist(err);
				done();
			});
		});
		it('should work well with all params', function (done) {
			var _fileName = 'test_name';
			i18n.jsonToExcel('./test/zh-CN.json', _fileName, function (err, data) {
				//console.log(data);
				should.not.exist(err);
				data.indexOf(_fileName).should.be.within(0, 255);
				done();
			});
		});
	});
});