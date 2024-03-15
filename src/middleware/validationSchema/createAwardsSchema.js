export const awardsSchema = {
    type: 'object',
    properties: {
        awardTitle: { type: 'string',minLength: 3 },
        description: { type: 'string',minLength: 3 },
        issuedBy: { type: 'string',minLength: 3 },
        issuedDate: { type: 'string', pattern: '^\\d{2}/\\d{2}/\\d{4}$' },
    },
    required: ['awardTitle', 'description', 'issuedBy', 'issuedDate'], 
    additionalProperties: false, 
};