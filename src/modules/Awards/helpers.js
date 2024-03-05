export const createAwardsValidator = (req, res, next) => {
    const allowedFields = ['awardTitle', 'description', 'issuedBy', 'issuedDate'];
    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
        const errorMessage = `Invalid or extra parameters: ${extraFields.join(', ')}.`;

        return res.status(400).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: errorMessage,
            result: []
        });
    }
    if(!req.headers.authorization){
        return res.status(400).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "User not authorized" ,
            result: []
        }); 
    }
    for (const field of allowedFields) {
        if (!req.body[field]) {
            return res.status(400).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: `${field} is missing.`,
                result: []
            });
        }

        if (typeof req.body[field] !== 'string') {
            return res.status(400).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: `${field} should be a string.`,
                result: []
            });
        }


    }
    next();
}