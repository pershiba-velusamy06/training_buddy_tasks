import Ajv from 'ajv';
import {  validations } from '../utils/users/userConstant.js';
import { otpvalidationSchema } from './validationSchema/otpVerificationSchema.js';

const ajv = new Ajv();

Object.entries(validations).forEach(([key, value]) => {
    ajv.addKeyword(key, {
        validate: function (schema, data) {
            return value(data);
        },
    });
});

ajv.addFormat('email', (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
});

const validate = ajv.compile(otpvalidationSchema);

export const otpValidation = async (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
        const errors = validate.errors.map(error => {
            const fieldName = error.instancePath.replace("/", "")
            const validationFunction = validations[fieldName];
            if (error.keyword === 'minLength' || error.keyword === 'maxLength' || error.keyword === 'pattern') {
                if (validationFunction) {
                    return { field: fieldName, message: validationFunction(req.body[fieldName]) };
                } else {
                    return { field: fieldName, message: 'Invalid value' }; // Provide a default message if validation function doesn't exist
                }
            } else if (error.keyword === 'format') {
                return { field: fieldName, message: validationFunction(req.body[fieldName]) };
            } else {
                let errorFeildname = error?.keyword === "additionalProperties" ? error?.params?.additionalProperty : error?.params?.missingProperty
                return { field: errorFeildname, message: error.message };
            }
        });
        return res.status(500).json({
            success: false,
            isAuth: false,
            result:[],
            errorCode: -1,
            message:errors[0].message
        
        });
    }

    next();
};
