export const userValidation = (req, res, next) => {
    const allowedFields = ['email', 'phoneNumber', 'firstname', 'lastname'];

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
                return 'Invalid email format.';
            }
        },
        phoneNumber: value => {
            const phoneNumberRegex = /^\+91\d{10}$/;
            if (!phoneNumberRegex.test(value)) {
                return 'Invalid phone number format. It should start with +91 and be 10 digits long.';
            }
        },
        firstname: value => {
            if (value.length < 3 || value.length > 20) {
                return 'First name should be between 3 and 20 characters long.';
            }
        },
        lastname: value => {
            if (value.length < 3 || value.length > 20) {
                return 'Last name should be between 3 and 20 characters long.';
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
