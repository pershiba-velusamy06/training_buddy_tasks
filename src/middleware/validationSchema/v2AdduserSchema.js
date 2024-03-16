export const  addUserAwardsSchema = {
    type: 'object',
    required: ['awardTitle', 'issuedBy'],
    properties: {
      awardTitle: { type: 'string', minLength: 1 },
      description: { type: 'string' },
      issuedBy: { type: 'string', minLength: 1 },
      issuedDate: { type: 'string', pattern: '^\\d{2}/\\d{2}/\\d{4}$' }, 
      awardCertificateURL: { type: 'string' }
    },
    additionalProperties: false 
  };