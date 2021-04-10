const fs = require('fs');
const path = require('path');
const parser = new (require('simple-excel-to-json').XlsParser)();
const CommonUtil = require('./commonUtil');

// .xlsx file path
const filePath2 = path.join(__dirname, 'ui.xlsx');

// parsing excel file
var data2 = parser.parseXls2Json(filePath2, {
  isNested: true,
});

// selecting the sheet
const materialUiSheet2 = data2[0];
const newMaterialUiJson = CommonUtil.createJson(materialUiSheet2);

// JSX code preparation for multiple components
for (let i = 0; i < newMaterialUiJson.length; i++) {
  const jsxCode = `import { ${newMaterialUiJson[i].jsx.map((jsx) => jsx.name).join(', ')} } from '@material-ui/core';

const ${newMaterialUiJson[i].componentName} = () => {
  return (
    <div>
      ${newMaterialUiJson[i].jsx.map((jsx) => `<${jsx.name} ${jsx.attributes} />`).join('\n')}
    </div>
  );
};

export default ${newMaterialUiJson[i].componentName};`;

  // create components directory
  if (!fs.existsSync(path.join(__dirname, 'components'))) {
    fs.mkdirSync(path.join(__dirname, 'components'));
  }

  fs.writeFile(path.join(`${__dirname}/components`, `${newMaterialUiJson[i].componentName}2.js`), jsxCode, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // the file was saved
    console.log('file contents written');
  });
}

// -------------------------------------------------------------------------------------------------
// const filePath = path.join(__dirname, 'ui1.xlsx');

// var data = parser.parseXls2Json(filePath, {
//   isNested: true,
// });

// const materialUiSheet = data[0];

// let masterLayout = CommonUtil.createMasterLayout(materialUiSheet);

// jsx code to be written
// let materialComponents = masterLayout.componentList.map((comp) => comp.type);
// materialComponents = [...new Set(materialComponents)];

// const textFieldJsxCode = `import { ${materialComponents.toString()} } from '@material-ui/core';

// const ${masterLayout.componentName} () = {
//     return(
//         <div>
//           ${'<' + component.type + '/>'}
//         </div>
//     )
// }

// export default ${masterLayout.componentName};`;

// writing to file
// fs.writeFile(path.join(__dirname, `${masterLayout.componentName}.js`), textFieldJsxCode, (err) => {
//   // throws an error, you could also catch it here
//   if (err) throw err;

//   // the file was saved
//   console.log('file contents written');
// });
