const fs = require('fs');
const path = require('path');
const parser = new (require('simple-excel-to-json').XlsParser)();

// .xlsx file path
const filePath = path.join(__dirname, 'ui.xlsx');

// parsing excel file
var data = parser.parseXls2Json(filePath, {
  isNested: true,
});
// selecting the sheet
const materialUiSheet = data[0];

// jsx code to be written
const textFieldJsxCode = `import TextField from '@material-ui/core/TextField';

const ${materialUiSheet[0].componentName} () = {
    return(
        <div>
            <TextField label="${materialUiSheet[0].label}" variant="${materialUiSheet[0].variant}" />
        </div>
    )
}

export default ${materialUiSheet[0].componentName};`;

// writing to file
fs.writeFile(path.join(__dirname, `${materialUiSheet[0].componentName}.txt`), textFieldJsxCode, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // the file was saved
  console.log('file contents written');
});
