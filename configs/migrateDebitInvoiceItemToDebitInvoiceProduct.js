const DebitInvoiceItem = require('../models/DebitInvoiceItem');
const Sequelize = require('sequelize');
const DebitInvoiceProduct = require('../models/DebitInvoiceProduct');
const migrateDebitInvoiceItemToDebitInvoiceProduct = async () => {
    const separatedItems = [];
    const items = await DebitInvoiceItem.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_serial')), 'invoice_serial']],
    });
    for(let i=0;i<items.length;i++){
        const item = items[i];
        const metas = await DebitInvoiceItem.findAll({
            where: {
                invoice_serial: item.invoice_serial
            },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('item_serial')), 'item_serial']],
        });
        for(let j=0;j<metas.length;j++){
            const meta = metas[j];
            const sepratedItem = await DebitInvoiceItem.findAll({
                where: {
                    item_serial: meta.item_serial,
                    invoice_serial: item.invoice_serial
                },
            });
            separatedItems.push(sepratedItem);
        }
    }
    const migratedItems = [];
    for(let i=0;i<separatedItems.length;i++){
        const sepratedItem = separatedItems[i];
        const product = {};
        for(let j=0;j<sepratedItem.length;j++){
            const item = sepratedItem[j];
            product.invoice_serial = item.invoice_serial;
            if(item.item_meta === 'item_description'){
                product.title = item.item_data;
            }else if(item.item_meta === 'item_total'){
                product.price = parseFloat(item.item_data);
            }else if(item.item_meta === 'item_rate'){
                product.tax_rate = parseInt(item.item_data);
            }
        }
        migratedItems.push(product);
    }
    await DebitInvoiceProduct.bulkCreate(migratedItems);
};
module.exports = migrateDebitInvoiceItemToDebitInvoiceProduct;