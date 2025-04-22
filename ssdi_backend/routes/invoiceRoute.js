const express = require('express');
const router = express.Router();
const { getInvoiceDetails } = require("../controllers/invoiceController");


router.get('/:id', getInvoiceDetails);



module.exports = router;
