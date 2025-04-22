// const Invoice = require('../models/Invoice'); 
const ExtractedInvoice = require('../models/ExtractionSchema');
exports.getInvoiceDetails = async (req, res) => {
    const jobId = req.params.id;

    try {
        const invoice = await ExtractedInvoice.findOne({ jobId });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found for the given Job ID' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

