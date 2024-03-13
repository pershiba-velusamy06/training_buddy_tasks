export const awardsSchema = {
    type: 'object',
    properties: {
        awardTitle: { type: 'string' },
        description: { type: 'string' },
        issuedBy: { type: 'string' },
        issuedDate: { type: 'string', pattern: '^\\d{2}/\\d{2}/\\d{4}$' },
    },
    required: ['awardTitle', 'description', 'issuedBy', 'issuedDate'], 
    additionalProperties: false, 
};