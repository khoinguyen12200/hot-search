var fs = require('fs');
function writeLog (logmess){
    fs.appendFile("./log.txt", logmess+"\n", (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
  }); 
  }
  writeLog("test "+new Date());