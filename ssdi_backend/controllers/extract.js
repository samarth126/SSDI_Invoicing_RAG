const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { Readable } = require('stream');

const documentExtractionService = {
  url: process.env.API_URL,
  authUrl: process.env.AUTH_URL,
  clientId: process.env.ClientId,
  clientSecret: process.env.ClientSecret
};

async function extractDocumentInformation(buffer, fileName) {

  const formData = new FormData();

  const binaryData = buffer;
  formData.append('file', binaryData, fileName);
  formData.append('options', `{
        "extraction": {
        "headerFields": [
            "documentNumber",
            "taxId",
            "purchaseOrderNumber",
            "shippingAmount",
            "netAmount",
            "senderAddress",
            "senderName",
            "grossAmount",
            "currencyCode",
            "receiverContact",
            "documentDate",
            "taxAmount",
            "taxRate",
            "receiverName",
            "receiverAddress",
            "paymentTerms",
            "senderBankAccount"
        ],
        "lineItemFields": [
            "description",
            "netAmount",
            "quantity",
            "unitPrice",
            "materialNumber"
        ]
    },
    "documentType": "invoice",
    "receivedDate": "2020-02-17",
    "enrichment": {},
    "clientId": "default"
  }`
  );

  const token = await getOAuthToken();
  const formHeader = formData.getHeaders();
  const headers = {
    formHeader,
    'Authorization': `Bearer ${token}`,
  };
 
  try {
    const jobResponse = await axios.post(
      `${documentExtractionService.url}/document-information-extraction/v1/document/jobs`,
      formData,
      { headers }
    );

    const jobId = jobResponse.data.id;
    if (!jobId) throw new Error("Job ID not received");

    // Poll until job is done
    let status = "";
    let result = null;
    while (status !== "DONE") {
      await new Promise((res) => setTimeout(res, 5000)); // wait 5s

      const pollResponse = await axios.get(
        `${documentExtractionService.url}/document-information-extraction/v1/document/jobs/${jobId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      status = pollResponse.data.status;
      if (status === "DONE") {
        result = pollResponse.data;
      }
    }

    return result;

  } catch (error) {
    console.error("Error extracting document:", error.response?.data || error.message);
    throw error;
  }
}


async function getOAuthToken() {
  const tokenResponse = await axios.post(
    documentExtractionService.authUrl,
    new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': documentExtractionService.clientId,
      'client_secret': documentExtractionService.clientSecret,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return tokenResponse.data.access_token; 
}

module.exports = { extractDocumentInformation };
