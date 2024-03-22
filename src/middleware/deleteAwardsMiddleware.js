
import Ajv from 'ajv';
import { deleteAwardsSchema } from './validationSchema/deleteAwardsSchema.js';
import { sendErrorResponse } from '../utils/Awards/awardsConstants.js';

const ajv = new Ajv();
const validateDeleteAwards = ajv.compile(deleteAwardsSchema);

export const deleteAwardsMiddleware = (req, res, next) => {
 

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
            message: errors[0].message
        });
    }
    // const awardsError = req.body.awards.includes("") ? {
    //     field: "awards",
    //     message: "Awards array should not contain empty strings"
    // } : null;
    if (req.body.awards.includes("")) {
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "Awards array should not contain empty strings"
        });
    }
    if (!req.headers.authorization) {
        return  sendErrorResponse(res, "User not authorized")
    }

    next()
}


