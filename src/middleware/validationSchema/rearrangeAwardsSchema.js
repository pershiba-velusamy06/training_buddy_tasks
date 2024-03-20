export const rearrangeAwardsschema = {
    type: 'object',
    properties: {
        awards: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    awardId: { type: 'string' },
                    pinStatus: { type: 'string' },
                    pinSequence: { type: 'number' }
                },
                required: ['awardId', 'pinStatus', 'pinSequence'],
                additionalProperties: false
            }
        }
    },
    required: ['awards'],
    additionalProperties: false
};
