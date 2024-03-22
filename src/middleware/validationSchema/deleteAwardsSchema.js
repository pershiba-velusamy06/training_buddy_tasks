export const deleteAwardsSchema = {
    type: 'object',
    properties: {
        awards: {
            type: 'array',
            minItems: 1, // Ensure at least one award is present
            items: {
                type: 'string' // Assuming each award is represented by a string
            }
        }
    },
    required: ['awards'],
    additionalProperties: false
};
