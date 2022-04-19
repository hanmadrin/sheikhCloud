const express = require('express');
const login = require('../controllers/login');
const isLoggedIn = require('../controllers/isLoggedIn');
const debitInvoice = require('../controllers/debitInvoice');
const authMiddleware = require('../controllers/authMiddleware');
const logout = require('../controllers/logout');
const router = express.Router();
const User = require('../models/User');
const creditInvoice = require('../controllers/creditInvoice');
const debitInvoiceEssentials = require('../controllers/debitInvoiceEssentials');
const singleDebitInvoice = require('../controllers/singleDebitInvoice');
const saveDebitInvoice = require('../controllers/saveDebitInvoice');
const deleteDebitInvoice = require('../controllers/deleteDebitInvoice');
const statusNewDebitInvoice = require('../controllers/statusNewDebitInvoice');
const statusSturenDebitInvoice = require('../controllers/statusSturenDebitInvoice');
const statusbetaaldDebitInvoice = require('../controllers/statusBetaaldDebitInvoice');
const viewPDF = require('../controllers/viewPDF');
const recreateDebitInvoice = require('../controllers/recreateDebitInvoice');

router.post('/login', login);
router.get('/isLoggedIn',isLoggedIn)
router.use('/',authMiddleware);
router.get('/logout',logout);

router.get('/debitInvoice',debitInvoice);

router.post('/debitInvoice/save',saveDebitInvoice);
router.get('/debitInvoice/essentials',debitInvoiceEssentials);
router.post('/debitInvoice/reCreatePDF/:serial',recreateDebitInvoice);
router.post('/debitInvoice/delete/:serial',deleteDebitInvoice);
router.put('/debitInvoice/markAsNew/:serial',statusNewDebitInvoice);
router.put('/debitInvoice/markAsSturen/:serial',statusSturenDebitInvoice);
router.put('/debitInvoice/markAsBetaald/:serial',statusbetaaldDebitInvoice);
router.get('/debitInvoice/:serial',singleDebitInvoice);
router.get('/creditInvoice',creditInvoice);

router.get('/viewPDF/:type/:serial',viewPDF);
router.use('/',(req,res)=>{console.log('wrong api url');res.sendStatus(404);});

module.exports=router;