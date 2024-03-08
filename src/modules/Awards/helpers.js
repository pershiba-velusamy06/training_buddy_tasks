
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