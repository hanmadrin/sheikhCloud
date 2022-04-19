const DebitInvoice = require('../models/DebitInvoice');
const fs = require('fs');
const uploadPdfDebitInvoice = async (serial,file) => {
    const invoice = DebitInvoice.findOne({
        where: {
            serial: serial
        }
    });
    const dir = '../pdf';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    console.log(file);
    const oldPath = file.path;
    const newPath = (`../pdf/debit_${serial}.pdf`);
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('File Renamed');
    });
};
module.exports = uploadPdfDebitInvoice;