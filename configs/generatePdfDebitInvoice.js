const DebitInvoice = require('../models/DebitInvoice');
const Client = require('../models/Client');
const DebitInvoiceProduct = require('../models/DebitInvoiceProduct');
const PdfPrinter = require('pdfmake');
const fs = require('fs');


DebitInvoice.hasMany(DebitInvoiceProduct, {foreignKey: 'invoice_serial'});
DebitInvoiceProduct.belongsTo(DebitInvoice,{foreignKey: 'serial'});
Client.hasMany(DebitInvoice, {foreignKey: 'serial'});
DebitInvoice.belongsTo(Client,{foreignKey: 'invoice_debitorserial'});

const generatePdfDebitInvoice = async (serial) => {
    const dir = '../pdf';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const invoice = await DebitInvoice.findOne({
        where: {serial: serial},
        include: [DebitInvoiceProduct, Client]
    });
    let totalExcludingTax = 0;
    let tax9 = 0;
    let tax21 = 0;
    let total = 0;
    const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        }
    };
    const printer = new PdfPrinter(fonts);


    const docDefinition = {
        info:{
            title: 'Invoice PDF',
        },
        pageSize: {
            height: 'auto',
            width: 500,
        },
        pageOrientation: 'portrait',
        pageMargins: [30,30,30,0],
        content: [
            {
                columns:[
                 {
                     image: './public/icons/logo_elaborated.png',
                     fit:[200,100],
                 },
                 {
                     width: 200,
                     text: [
                         'Zorgtaxi Rijnmond',
                         'Rivium Boulevard 27',
                         '2909LK Capelle aan den IJssel',
                         '010 3145788',
                         'administratie@ztrvervoer.nl',
                     ].join( '\n' ),
                     color: '#0c58a3',
                     bold:true,
                     alignment: 'right',
                     lineHeight: 1.1,
                 }
                ],
            },
            {
                text: 'Factuur',
                margin: [0,50,0,0],
                fontSize: 13,
                lineHeight: 1.5,
                bold: true
            },
            {
                text : [
                    invoice.Client.saluation==''?`${invoice.Client.firstname} ${invoice.Client.lastname}`:`${invoice.Client.saluation} ${invoice.Client.firstname} ${invoice.Client.lastname}`,
                    `${invoice.Client.adress_street} ${invoice.Client.address_housenr}`,
                    `${invoice.Client.address_postcode} ${invoice.Client.address_city}`,
                ].join('\n'),
                lineHeight: 1.1,
            },
            {
                margin: [0,20,0,0],
                columns:[
                    {
                        text: [
                            'Factuurnr',
                            'Datum',
                            'Klantnr',
                            'Betreft',
                        ].join('\n'),
                        color: '#0c58a3',
                        width: 70,
                        lineHeight: 1.1,
                    },
                    {
                        text: [
                            ':',
                            ':',
                            ':',
                            ':',
                        ].join('\n'),
                        width: 10,
                        color: '#0c58a3',
                        lineHeight: 1.1,
                    },
                    {
                        text: [
                            `${invoice.invoice_number}`,
                            `${invoice.invoice_date}`,
                            `${invoice.Client.id}`,
                            `${invoice.invoice_description}`,
                        ].join('\n'),
                        color: '#0c58a3',
                        lineHeight: 1.1,
                    },
                ],
            },
            {
                margin: [0,50,0,0],
               columns:[
                   {
                       text:'Omschrijving',
                   },
                   {
                       alignment: 'right',
                       text:'Bedrag',
                   }
               ] 
            },
            {
                margin: [0,10,0,0],
                svg: '<svg viewBox="0 0 500 2"><line x1="0" y1="0" x2="500" y2="0" style="stroke-width:2" /></svg>',
                fit:[440,2],
            },
            {
                margin: [0,10,0,0],
                table: {
                    widths: ['*', 'auto'],
                    body: invoice.DebitInvoiceProducts.map(product => {
                        const price = parseFloat(product.price);
                        const tax_rate = parseFloat(product.tax_rate);
                        totalExcludingTax += invoice.invoice_ratetype=='inc'?price/(1+tax_rate/100):price;
                        if(tax_rate==9){
                            tax9 = invoice.invoice_ratetype=='inc'?(tax_rate/100)*price/(1+tax_rate/100):price*tax_rate/100;
                        }else if(tax_rate==21){
                            tax21 = invoice.invoice_ratetype=='inc'?(tax_rate/100)*price/(1+tax_rate/100):price*tax_rate/100;
                        }
                        total += invoice.invoice_ratetype=='inc'?price:price*(1+tax_rate/100);
                        return [
                            {
                                text: product.title,
                                margin: [0,0,0,5],
                            },
                            {
                                text : `€${invoice.invoice_ratetype=='inc'?(price/(1+tax_rate/100)).toFixed(2):price.toFixed(2)}`,
                                margin: [0,0,0,5],
                                alignment: 'right',
                            },
                        ]
                    }),
                    
                },
                layout:'noBorders',
                lineHeight: 1.1,
            },
            {
                margin: [0,20,0,0],
                text: [
                    `Totaal excl. BTW   :   €${totalExcludingTax.toFixed(2)}`,
                    `BTW 9%   :   €${tax9.toFixed(2)}`,
                    `BTW 21%   :   €${tax21.toFixed(2)}`,
                    
                ].join('\n'),
                alignment:'right',
                lineHeight: '1.5',
                bold: true,
            },
            {
                margin: [0,10,0,0],
                svg: '<svg viewBox="0 0 500 2"><line x1="400" y1="0" x2="500" y2="0" style="stroke-width:2" /></svg>',
                fit:[440,2],
            },
            {
                margin: [0,10,0,0],
                text: [
                    `Totaal bedrag   :   €${total.toFixed(2)}`,
                ].join('\n'),
                alignment:'right',
                lineHeight: 1.5,
                bold: true,
            },
            {
                margin: [0,30,0,0],
                text: [
                    'KvKnr: 69198314 - BTWnr:NL857778705B01 - ABN AMRO NL 56 ABNA 0867187409',
                    'Betaling onder vermelding van het factuurnr t.n.v. ZTR Vervoer'
                ].join('\n'),
                lineHeight: 2,
                color: '#0c58a3',
                fontSize: 8,
                alignment: 'center',
            }
        ],        
        defaultStyle: {
            font: 'Helvetica'
        }
    };
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(`../pdf/debit_${serial}.pdf`));
    pdfDoc.end();
};
module.exports = generatePdfDebitInvoice;