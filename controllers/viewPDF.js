const fs = require('fs');
const viewPDF = async (req, res) => {
    const serial = req.params.serial;
    const type = req.params.type;
    if (fs.existsSync(`../pdf/${type}_${serial}.pdf`)){
        console.log('exists');
        const file = fs.createReadStream(`../pdf/${type}_${serial}.pdf`);
        var stat = fs.statSync(`../pdf/${type}_${serial}.pdf`);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');
        file.pipe(res);
    }else{
        console.log('do not exists');
        res.redirect('/notFound');
    }
};
module.exports = viewPDF;