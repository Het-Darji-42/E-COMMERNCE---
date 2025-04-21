const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir); 
}
    cb(null, dir);
    
},

  filename: function (req, file, cb) {
    const random = uuidv4();
    cb(null, random + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload