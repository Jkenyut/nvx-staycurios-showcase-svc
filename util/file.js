const path = require("path");
const fs = require("fs");
const clearImageUrl = (filepath) => {
    filePath = path.join(__dirname, "..", filepath);
    fs.unlink(filePath, (err) => console.log(err));
};

exports.clearImageUrl = clearImageUrl;
