import Ajv from 'ajv';
import { errorMessages, sendErrorResponse, validations } from '../utils/users/userConstant.js';
import { userbyEmailforSignUpValidator } from '../modules/Users/userSignUp/userSignUpValidator.js';





const userSchema = {
    type: 'object',
    properties: {
        firstname: { type: 'string', minLength: 3, maxLength: 20 },
        lastname: { type: 'string', minLength: 3, maxLength: 20 },
        phoneNumber: { type: 'string', pattern: '^\\+91\\d{10}$' },
        email: { type: 'string', format: 'email' }, 
       
    },
    required: ['firstname', 'lastname', 'phoneNumber', 'email'], 
    additionalProperties: false
};

const ajv = new Ajv();

// Add custom validation functions to Ajv instance
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


const validate = ajv.compile(userSchema);


export const userValidation = async(req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
       
        const errors = validate.errors.map(error => {
            console.log(error,"error")
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
            }

            else {
               let errorFeildname= error?.keyword==="additionalProperties"?error?.params?.additionalProperty:error?.params?.missingProperty
                return { field:errorFeildname , message: error.message };
            }
        });
        return res.status(500).json({ success: false, message: 'Invalid request body', errors });
    }

    const existingUser = await userbyEmailforSignUpValidator(req.body.email);
   
    if (existingUser && existingUser.phoneNumber !== req.body.phoneNumber) {
        return sendErrorResponse(res, 'This email is already in use with another phone number. Please enter the correct phone and email combination.');
    }

    next();
};