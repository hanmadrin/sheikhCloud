const CreditInvoice = require('../models/CreditInvoice');
const fs = require('fs');
const uploadPdfCreditInvoice = async (serial,file) => {
    const invoice = CreditInvoice.findOne({
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
    const newPath = (`../pdf/credit_${serial}.pdf`);
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('File Renamed');
    });
};
module.exports = uploadPdfCreditInvoice;