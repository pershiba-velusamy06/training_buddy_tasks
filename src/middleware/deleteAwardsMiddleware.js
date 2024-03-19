
import Ajv from 'ajv';
import { deleteAwardsSchema } from './validationSchema/deleteAwardsSchema.js';
import { sendErrorResponse } from '../utils/Awards/awardsConstants.js';

const ajv = new Ajv();
const validateDeleteAwards = ajv.compile(deleteAwardsSchema);

export const deleteAwardsMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return sendErrorResponse(res, "User not authorized")
    }

    const valid = validateDeleteAwards(req.body);
    if (!valid) {
        const errors = validateDeleteAwards.errors.map(error => ({
            field: error?.keyword === "required" ?
                error?.params?.missingProperty : error?.keyword === "additionalProperties" ? error?.params?.additionalProperty : error.instancePath.replace("/", ""),
            message: error.message
        }));
      
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            errors
        });
    }
    const awardsError = req.body.awards.includes("") ? {
        field: "awards",
        message: "Awards array should not contain empty strings"
    } : null;
    if (awardsError) {
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            errors:[awardsError]
        });
    }
    next()
}


