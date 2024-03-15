import Ajv from 'ajv';
import { allowedParams, sendErrorResponse } from '../utils/Awards/awardsConstants.js';
import { userAwardsSchema } from './validationSchema/userSpecificAwardsSchema.js';


const ajv = new Ajv();

const validateAwards = ajv.compile(userAwardsSchema);

export const userSpecificAwardsMiddleware = (req, res, next) => {
    const extraParams = Object.keys(req.query).filter(key => !allowedParams.includes(key));
    if (extraParams.length > 0) {
        const errorMessage = `Extra query parameters found: ${extraParams.join(', ')}.`;
        return res.status(500).json({ success: false, message: errorMessage });
    }

    const valid = validateAwards(req.body);
    if (!valid) {
        
        const errors = validateAwards.errors.map(error => ({
            field: error?.keyword === "additionalProperties" ? error?.params?.additionalProperty :
                error?.keyword === "required" ?
                error?.params?.missingProperty : error.instancePath.replace("/", ""),
            message: error.message,
        }));
        return res.status(500).json({
            success: false,
            isAuth: false,
            errorCode: -1,
            errors
        });
    }
    if (!req.headers.authorization) {
        return sendErrorResponse(res, "User not authorized")
    }
    next();
};


