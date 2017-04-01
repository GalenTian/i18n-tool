#p i18n-tool
A tool to help managing i18n files more efficiently.

## Using i18n-tool with NodeJS

### Installation

```bash
$ npm install i18n-tool
```

### Set configration

```javascript
var conf = {
  baseDir: './test',
  files: ['zh-CN.json', 'en-US'],
  xlsx: 'MyI18N'
}
```

- **baseDir: ** It is the base folder of *files* property. It can be null. This property can short your *files* property value because you don't need to set the file path for every file, if they have the same parant folder.

- **files: ** It is the JSON files' paths storing your language key-value pairs. If you have set the *baseDir*, you can omit the folders of files.
  > As a rule, the keys in exported xlsx file are based on the first json file, such as sorting, count. So please make sure the first josn file contains the whole keys of all files. Or the xlsx file will not contains all key-value pairs.

- **xlsx: ** It is the name of your Excel file. If it is not set, it will be "i18n" as default.
  > For now, the *.xlsx* file will export to the files folder. If all files arn't in the same folder, the *.xlsx* file will export to the first json file folder.
  
### Run export function
```javascript
var result = i18n.jsonToExcel(conf);
```
