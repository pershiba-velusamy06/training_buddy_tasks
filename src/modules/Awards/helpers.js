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
    if (!req.headers.authorization) {
        return res.status(400).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "User not authorized",
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
export const updateAwardsValidator = (req, res, next) => {
    const allowedFields = ['awardTitle', 'description', 'issuedBy', 'issuedDate', "awardId", "approvalStatus"];
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
    if (!req.headers.authorization) {
        return res.status(400).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "User not authorized",
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

        if (field === 'issuedDate') {

            const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!dateRegex.test(req.body[field])) {
                return res.status(400).send({
                    success: false,
                    isAuth: false,
                    errorCode: -1,
                    message: `Invalid format for ${field}. It should be in the format dd/mm/yyyy.`,
                    result: []
                });
            }
        }


    }
    next();
}


export const fetchallAwardsValidator = (req, res, next) => {
    const allowedParams = ['start', 'offset'];
    const extraParams = Object.keys(req.query).filter(key => !allowedParams.includes(key));
    if (extraParams.length > 0) {
        const errorMessage = `Extra query parameters found: ${extraParams.join(', ')}.`;
        return res.status(500).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: errorMessage,
            result: []
        });
    }

    next()

}