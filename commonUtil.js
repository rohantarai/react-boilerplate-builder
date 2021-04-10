const createJson = (arrJson) => {
  const newJsonArray = [];

  for (let i = 0; i < arrJson.length; i++) {
    if (newJsonArray.length !== 0) {
      newJsonArray.forEach((obj, index) => {
        if (obj.componentName === arrJson[i].componentName) {
          obj.jsx.push({ name: arrJson[i].jsx.name, attributes: arrJson[i].jsx.attributes });
        } else {
          newJsonArray.push({ componentName: arrJson[i].componentName, jsx: [{ name: arrJson[i].jsx.name, attributes: arrJson[i].jsx.attributes }] });
        }
      });
    } else {
      newJsonArray.push({ componentName: arrJson[i].componentName, jsx: [{ name: arrJson[i].jsx.name, attributes: arrJson[i].jsx.attributes }] });
    }
  }

  return newJsonArray;
};

const countKeys = (obj) => {
  return Object.keys(obj).length;
};

const createComponentLayout = (obj) => {
  let comp = {};
  comp.type = obj.Components;
  comp.config = {};
  let config = {};
  for (let i = 1; i < countKeys(obj); i++) {
    if (!isEmpty(obj[`value${i}`])) {
      let key = obj[`property${i}`];
      config[key] = obj[`value${i}`];
    }
  }
  comp.config = config;
  return comp;
};

const createMasterLayout = (compArr) => {
  let masterLayout = {};
  masterLayout.componentName = compArr[0].value;
  masterLayout.layout = compArr[1].value;
  let layoutCompList = [];
  let componentList = compArr.splice(2);
  componentList.forEach((obj) => {
    layoutCompList.push(createComponentLayout(obj));
  });
  masterLayout.componentList = layoutCompList;
  return masterLayout;
};

const isEmpty = (data) => {
  if (data == '' || data == undefined || data == null) {
    return true;
  }
  return false;
};

let testObj = {
  Components: 'TextInput',
  property1: 'textInputName',
  value1: 'custName',
  property2: 'textInputLabel',
  value2: 'Customer First Name: ',
  property3: 'mandatory',
  value3: true,
  property4: 'value',
  value4: '',
  property5: 'mode',
  value5: '',
  property6: 'className',
  value6: 'textCompTrv',
  property7: '',
  value7: '',
};

//console.log(createComponentLayout(testObj))
module.exports = { createMasterLayout, createJson };
