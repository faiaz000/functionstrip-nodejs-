const fs = require("fs");

const lineByLine = require("n-readlines");

const liner = new lineByLine("./test.js");
let functionlist = [];
let line;
var brac = 0;
var count = 0;
var name = "";
var body = "";
indexOfFunction = 0;
indexOfBrac = 0;
var indexOfLetOrVar = 0;

while ((line = liner.next())) {
  str = line.toString();
  if (!str.includes('"') && (str.includes("function") || str.includes("=>"))) {
    brac = brac + 1;
    body = str;
    if (str.includes("=")) {
     name = forEqual(str)
    } else if (str.includes("function")) {
      name = (!str.includes(':'))? forFunction(str):forColon(str)
    } else {
      //do nothing
    }
    while (brac != 0) {
      line = liner.next();
      str = line.toString();
      if (!str.includes('"') && str.includes("{")) {
        brac = brac + 1;
        body = body + str;
      } else if (!str.includes('"') && str.includes("}")) {
        brac = brac - 1;
        body = body + str;
      } else {
        body = body + str;
      }
    }
  }
  if (body.length > 0) {
    functionlist.push({ name: name, body: body });
  }

  body = "";
  name = "";
}

functionlist.forEach(x => console.log(x));
function forEqual(str){
    indexOfLetOrVar = str.includes("let")? str.indexOf("let") + 3: str.indexOf("var") + 3;
    var index = str.indexOf("=");
    return  str.slice(indexOfLetOrVar, index);
}
function forFunction(str){
    indexOfFunction = str.indexOf("function") + 9;
    indexOfBrac = str.indexOf("(");
    return str.slice(indexOfFunction, indexOfBrac)
}
function forColon(str){
    modifiedName = str.slice(0, str.indexOf(":"));
    modifiedName = modifiedName.replace(/\s/g, "");
    return modifiedName;
}