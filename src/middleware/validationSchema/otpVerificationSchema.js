export const otpvalidationSchema = {
    type: 'object',
    properties: {
      
        otp: { type: 'string', minLength: 6, maxLength: 6 },
        phoneNumber: { type: 'string', pattern: '^\\+91\\d{10}$' },
        email: { type: 'string', format: 'email' }
       
    },
    required: ['otp', 'phoneNumber', 'email'], 
    additionalProperties: false
};
