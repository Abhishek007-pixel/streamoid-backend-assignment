const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {
    'text/csv': 'csv',
    'application/vnd.ms-excel': 'csv',
    'application/csv': 'csv',
    'text/x-csv': 'csv',
    'text/plain': 'csv'
};

// This is just the CONFIGURATION (where to store files)
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) error = null;
        cb(error, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuidv4() + '.' + ext);
    }
});

// FIX: We must export the ACTUAL MULTER TOOL, passing the config to it
module.exports = multer({ storage: storageConfig });