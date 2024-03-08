
export const awardsAuthMiddleware=(req,res,next)=>{
    if (!req.headers.authorization) {
        return sendErrorResponse(res,"User not authorized")
    }
    next()
}