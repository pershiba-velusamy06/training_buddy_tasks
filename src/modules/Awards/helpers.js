
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
    const usercode = req.body.usercode;

    if (!usercode) {
        return res.status(500).send({
            message: "User code is missing.",
            success: false,
            isAuth: false,
            errorCode: -1,

            result: []
        });
    }
    if (!req.headers.authorization) {
        return res.status(500).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "User not authorized",
            result: []
        });
    }

    next()

}

export const deleteAwardsValidator = (req, res, next) => {
  

    if (req.body.awards.length === 0) {
        return res.status(500).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "awards should be an array containing at least one value",
            result: []
        });
    }

    if (!Array.isArray(req.body.awards)) {
        return res.status(500).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "Awards should be an array",
            result: []
        });
    }

    if (!req.headers.authorization) {
        return res.status(500).send({
            success: false,
            isAuth: false,
            errorCode: -1,
            message: "User not authorized",
            result: []
        });
    }
    next()
}