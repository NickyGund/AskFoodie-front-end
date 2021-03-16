const fs = require("fs");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
jsonReader("./bad.json", (err, bad) => {
  if (err) {
    console.log(err);
    return;
  }
  ///console.log(bad.result.formatted_address);
  //console.log(bad.result.formatted_phone_number);
  //console.log(bad.result.name);

});


let test = require('./bad.json');
console.log(test.result.formatted_address);
console.log(test.result.formatted_phone_number);
console.log(test.result.name);
console.log(test.result.types[0]);
console.log(test.result.rating);

//encodeURIComponent() //encode url
//myString = myString.replace(/\D/g,'');  //format number

//icon gets image

