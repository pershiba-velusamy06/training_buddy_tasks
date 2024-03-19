import Ajv from 'ajv';
import multer from 'multer';
import { addUserAwardsSchema } from './validationSchema/v2AdduserSchema.js';


const ajv = new Ajv();


export const validateAddUserAwards = ajv.compile(addUserAwardsSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG/JPEG, PNG, and PDF files are allowed.'));
    }
};


export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: fileFilter
}).single('awardCertificateURL');


export const handleInvalidFileTypeError = (err, req, res, next) => {
    if (err.message === 'Invalid file type. Only JPG/JPEG, PNG, and PDF files are allowed.') {
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: 'Invalid file type. Only JPG/JPEG, PNG, and PDF files are allowed.'
        });
    } else if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: 'File too large. Maximum file size allowed is 10MB.'
        });
    }
    next(err);
};