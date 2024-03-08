import { sendErrorResponse } from "../utils/Awards/awardsConstants.js"

export const awardsAuthMiddleware=(req,res,next)=>{
    if (!req.headers.authorization) {
        return sendErrorResponse(res,"User not authorized")
    }
    next()
}

export const awardsAuthWithUsercodeMiddleWare=(req,res,next)=>{
    if (!req.headers.authorization) {
        return sendErrorResponse(res,"User not authorized")
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
    next()
}