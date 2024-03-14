export const rearrangeAwardsschema = {
    type: 'object',
    properties: {
        awards: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    awardId: { type: 'string' },
                    pinStatus: { type: 'string', enum: ['hidden', 'unpinned', 'pinned'] },
                    pinSequence: { type: 'number', minimum: -1, maximum: 10 }
                },
                required: ['awardId', 'pinStatus', 'pinSequence'],
                additionalProperties: false
            }
        }
    },
    required: ['awards'],
    additionalProperties: false
};
