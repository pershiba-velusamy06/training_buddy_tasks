import Ajv from 'ajv';
import { awardsSchema } from './validationSchema/createAwardsSchema.js';
import { sendErrorResponse } from '../utils/Awards/awardsConstants.js';


const ajv = new Ajv();

const validateAwards = ajv.compile(awardsSchema);

export const awardsValidationMiddleware = (req, res, next) => {
    const valid = validateAwards(req.body);
    if (!valid) {
        console.log(validateAwards.errors,"validateAwards.errors")
        const errors = validateAwards.errors.map(error => ({
            field:error?.keyword==="additionalProperties"?error?.params?.additionalProperty:
            error?.keyword==="required"?
            error?.params?.missingProperty: error.instancePath.replace("/", ""),
            message:error.keyword === 'pattern'?`Invalid format for issuedDate. It should be in the format dd/mm/yyyy.`: error.message,
        }));
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            errors
        });
    }
    if (!req.headers.authorization) {
        return sendErrorResponse(res,"User not authorized")
    }
    next();
};

