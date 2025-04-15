const express = require('express');
const multer = require('multer');
const router = express.Router();
const { postDocument } = require("../controllers/uploadController");

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/upload', upload.single('file'),postDocument );

module.exports = router;