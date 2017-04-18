const fs = require('fs');

module.exports = {

  init: function(){

    fs.readFile(__dirname +"/package.json" , 'utf8', function (err,data) {

      let dataPackage = JSON.parse(data)

      // main file dataPackage.main

      let stream =  fs.createWriteStream(__dirname+"/server.js");
      // require dependencies
      stream.write(`const express = require("express"),
      app = express(),
      bodyParser = require("body-parser");\n\n\n app.listen(3000, () => { console.log("Server listened!") })
      `);

      if (!fs.existsSync(__dirname+"/controllers")){
        fs.mkdir(__dirname+"/controllers", 0777, (err) => {
          let user_controller =  fs.createWriteStream(__dirname+"/controllers/user_controller.js");
          if (!fs.existsSync(__dirname+"/models")) {
            fs.mkdir(__dirname+"/models", 0777, (err) => {
              let user_model =  fs.createWriteStream(__dirname+"/models/user_model.js");
              if (!fs.existsSync(__dirname+"/helpers")) {
                fs.mkdir(__dirname+"/helpers", 0777, (err) => {
                  let token =  fs.createWriteStream(__dirname+"/helpers/token.js");
                  let passport =  fs.createWriteStream(__dirname+"/helpers/passport.js");
                  let moment =  fs.createWriteStream(__dirname+"/helpers/moment.js");
                  if (!fs.existsSync(__dirname+"/routes")) {
                    fs.mkdir(__dirname+"/routes", 0777, (err) => {
                      let user =  fs.createWriteStream(__dirname+"/routes/user.js");
                    });
                  }
                });
              }
            });
          }
        });
      }

      stream.end();

    });
  }

}
