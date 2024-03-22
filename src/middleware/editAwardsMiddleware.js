import Ajv from 'ajv';
import { sendErrorResponse } from '../utils/Awards/awardsConstants.js';
import { editAwardsSchema } from './validationSchema/editAwardsSchema.js';

const ajv = new Ajv();
const validateAwards = ajv.compile(editAwardsSchema);

export const editAwardsValidationMiddleware = (req, res, next) => {
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
            message: errors[0].message
        });
    }

    const { awardId, pinStatus, pinSequence } = req.body;

    if (!["hidden", "unpinned", "pinned"].includes(pinStatus)) {
        return res.status(500).json({ success: false,  errorCode: -1, isAuth: false, message: `Invalid pinStatus value for awardId ${awardId}` });
    }

    const parsedPinSequence = parseInt(pinSequence);
    if (isNaN(parsedPinSequence) || parsedPinSequence < -1 || parsedPinSequence > 10) {
        return res.status(500).json({ success: false, errorCode: -1, isAuth: false, message: `Invalid pinSequence for awardId ${awardId}. pinSequence should be a number from -1 to 10.` });
    }

    if ((parsedPinSequence !== 0 && pinStatus === "unpinned") || (parsedPinSequence !== -1 && pinStatus === "hidden")) {
        return res.status(500).json({ success: false, errorCode: -1, isAuth: false, message: `Invalid combination of pinStatus and pinSequence for awardId ${awardId}.` });
    }

    if (!req.headers.authorization) {
        return sendErrorResponse(res, "User not authorized")
    }
    next();
};
