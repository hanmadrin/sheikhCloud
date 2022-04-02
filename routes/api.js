const express = require('express');
const router = express.Router();

const Client = require('../models/Client');
const CreditInvoice = require('../models/CreditInvoice');
const DebitInvoice = require('../models/DebitInvoice');
const DebitInvoiceItem = require('../models/DebitInvoiceItem');
const GroupRide = require('../models/GroupRide');
const User = require('../models/User');

router.use('/',async(req,res,next) => {
    let user = false;
    try{
        user = await User.findOne({
            where: {
                authkey: req.cookies.authkey
            }
        });
    }catch(err){
        user = await User.findOne({
        where: {
            authkey: ''
        }
    });}
    
    if(user){
        next();
    }else{
        res.status(401).json();
    }
});

router.get('/client',(req,res)=>{res.sendStatus(200);});


router.use('/',(req,res)=>{res.sendStatus(404);});

module.exports=router;