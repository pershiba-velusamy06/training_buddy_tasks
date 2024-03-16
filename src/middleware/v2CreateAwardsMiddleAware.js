
import Ajv from 'ajv';


import multer from 'multer';


// const ajv = new Ajv();


// const validateAddUserAwards = ajv.compile(addUserAwardsSchema);

// export const v2awardsValidationMiddleware = (req, res, next) => {
//     const valid = validateAddUserAwards(req.body);
//     if (!valid) {
      
//         const errors = validateAwards.errors.map(error => ({
//             field:error?.keyword==="additionalProperties"?error?.params?.additionalProperty:
//             error?.keyword==="required"?
//             error?.params?.missingProperty: error.instancePath.replace("/", ""),
//             message:error.keyword === 'pattern'?`Invalid format for issuedDate. It should be in the format dd/mm/yyyy.`: error.message,
//         }));
//         return res.status(500).json({
//             success: false,
//             isAuth: false,
//             errorCode: -1,
//             errors
//         });
//     }
//     if (!req.headers.authorization) {
//         return sendErrorResponse(res,"User not authorized")
//     }
//     next();
// };


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
});  
