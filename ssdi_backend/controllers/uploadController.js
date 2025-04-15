
const extractScript = require('./extract');
const ExtractedInvoice = require('../models/ExtractionSchema');
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
  
      // Save it to the database
      await newInvoice.save();
    res.status(200).json({ message: 'File processed successfully', data: response });
    
}