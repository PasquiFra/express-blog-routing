const path = require("path");
const fs = require("fs");

//sendMethod?string che rappresenta il metodo di res da usare per inviare il dato
const file = (sendMethod) => {
    return (req, res) => {
        const fileName = req.params.file;
        const filePath = path.join(__dirname, `../assets/${fileName}`);
        const extension = path.extname(filePath);
        if(extension !== '.pdf'){
            res.status(400).send(`You are not allowed to access ${extension} files.`);
        }else if(fs.existsSync(filePath)){
            res[sendMethod](filePath);
        }else{
            res.status(404).send('File not found.');
        }
    }
}

module.exports = {
    file,
}