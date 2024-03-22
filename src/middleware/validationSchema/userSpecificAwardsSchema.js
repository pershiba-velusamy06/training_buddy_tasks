export const userAwardsSchema = {
    type: 'object',
    properties: {
        usercode: { type: 'string' }
    },
    required: ['usercode'],
    additionalProperties: false
};
