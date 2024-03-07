import {  errorMessages,allowedFields } from "./responseMessage.js";

export const userValidation = (req, res, next) => {

    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

    if (extraFields.length > 0) {
        const errorMessage = `Invalid or extra parameters: ${extraFields.join(', ')}.`;

        return res.status(500).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: errorMessage,
            result: []
        });
    }


    const validations = {
        email: value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return errorMessages.emailError;
            }
        },
        phoneNumber: value => {
            const phoneNumberRegex = /^\+91\d{10}$/;
            if (!phoneNumberRegex.test(value)) {
                return errorMessages.phoneNumberError;
            }
        },
        firstname: value => {
            if (value.length < 3 || value.length > 20) {
                return errorMessages.firstNameError;
            }
        },
        lastname: value => {
            if (value.length < 3 || value.length > 20) {
                return errorMessages.lastNameError;
            }
        }
    };

    for (const field of allowedFields) {
        if (!req.body[field]) {
            return res.status(500).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: `${field} is missing.`,
                result: []
            });
        }

        if (typeof req.body[field] !== 'string') {
            return res.status(500).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: `${field} should be a string.`,
                result: []
            });
        }

        const validationError = validations[field](req.body[field]);
        if (validationError) {
            return res.status(500).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: validationError,
                result: []
            });
        }
    }

  
    next();
}
