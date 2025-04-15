const mongoose = require('mongoose');

const extractedInvoiceSchema = new mongoose.Schema({
  jobId: String,
  status: String,
  headerFields: [mongoose.Schema.Types.Mixed],
  lineItems: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

module.exports = mongoose.model('ExtractedInvoice', extractedInvoiceSchema);
