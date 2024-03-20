export const userSchema = {
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
