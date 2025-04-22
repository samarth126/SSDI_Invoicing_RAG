
const extractScript = require('./extract');
const ExtractedInvoice = require('../models/ExtractionSchema');
const moment = require('moment');
exports.postDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }  
    const fileBuffer = req.file.buffer; 
    const fileName = req.file.originalname; 
    const response = await extractScript.extractDocumentInformation(fileBuffer,fileName);
    const newInvoice = new ExtractedInvoice({
        jobId: response.id,
        status: response.status,
        headerFields: response.extraction?.headerFields || [],
        lineItems: response.extraction?.lineItems || [],
      });
      await newInvoice.save();
      res.status(200).json({ message: 'File processed successfully', data: response });

    
}
exports.extractedInvoices = async (req, res) => {
    

    try {
        const invoices = await ExtractedInvoice.find();
        
        const formattedInvoices = invoices.map((invoice) => {
            const headerMap = {};
            for (const field of invoice.headerFields) {
                headerMap[field.name] = field.value;
            }
            const formattedDate = moment().format('MMM DD, YYYY, h:mm:ss A');
            return {
                invoiceNumber: headerMap.documentNumber || Math.floor(1000 + Math.random() * 9000).toString(),
                vendorNumber: headerMap.receiverName || '',
                companyName: headerMap.senderName || '',
                date: headerMap.documentDate || formattedDate,
                purchaseOrderNumber: headerMap.purchaseOrderNumber || '',
                status:  'Pending', 
            };
        });
    
        res.status(200).json(formattedInvoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
    
    
};