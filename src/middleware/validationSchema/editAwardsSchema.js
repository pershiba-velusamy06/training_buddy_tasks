export const editAwardsSchema = {
    type: 'object',
    properties: {
        awardTitle: { type: 'string' },
        description: { type: 'string' },
        issuedBy: { type: 'string' },
        issuedDate: { type: 'string', pattern: '^\\d{2}/\\d{2}/\\d{4}$' },
        awardId:{type:'string'},
        approvalStatus:{type:'string'},
        pinStatus:{type:'string'},
        pinSequence:{type:'number'}
    },
    required: ['awardTitle', 'description', 'issuedBy', 'issuedDate', "awardId", "approvalStatus","pinStatus","pinSequence"], 
    additionalProperties: false, 
};

