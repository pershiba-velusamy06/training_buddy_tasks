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
            result:[],
            message: errors[0].message
        });
    }

    if (!req.body.awards || req.body.awards.length === 0) { 
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            result:[],
            message: 'Awards array cannot be empty.'
            // errors: [{ field: 'awards',  }]
        });
    }

    if (!req.headers.authorization) {
        return sendErrorResponse(res, "User not authorized")
    }
    next();
};
