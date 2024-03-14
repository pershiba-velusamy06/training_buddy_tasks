import Ajv from 'ajv';
import { sendErrorResponse } from '../utils/Awards/awardsConstants.js';
import { rearrangeAwardsschema } from './validationSchema/rearrangeAwardsSchema.js';

const ajv = new Ajv();
const validateAwards = ajv.compile(rearrangeAwardsschema);

export const rearrangeAwardsValidationMiddleware = (req, res, next) => {
    const valid = validateAwards(req.body);
    if (!valid) {
        const errors = validateAwards.errors.map(error => ({
            field: error?.keyword === "additionalProperties" ? error?.params?.additionalProperty :
                error?.keyword === "required" ? error?.params?.missingProperty : error.instancePath.replace("/", ""),
            message: error.keyword === 'pattern' ? `Invalid format for issuedDate. It should be in the format dd/mm/yyyy.` : error.message,
        }));
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            errors
        });
    }

    if (!req.body.awards || req.body.awards.length === 0) { // Custom check for empty awards array
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            errors: [{ field: 'awards', message: 'Awards array cannot be empty.' }]
        });
    }

    if (!req.headers.authorization) {
        return sendErrorResponse(res, "User not authorized")
    }
    next();
};
