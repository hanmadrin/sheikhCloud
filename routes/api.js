const express = require('express');
const login = require('../controllers/login');
const isLoggedIn = require('../controllers/isLoggedIn');
const debitInvoice = require('../controllers/debitInvoice');
const authMiddleware = require('../controllers/authMiddleware');
const logout = require('../controllers/logout');
const router = express.Router();
const User = require('../models/User');
const creditInvoice = require('../controllers/creditInvoice');

router.post('/login', login);
router.get('/isLoggedIn',isLoggedIn)
router.use('/',authMiddleware);
router.get('/logout',logout);
router.get('/debitInvoice',debitInvoice);
router.get('/creditInvoice',creditInvoice);


router.use('/',(req,res)=>{res.sendStatus(404);});

module.exports=router;