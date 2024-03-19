import { sendErrorResponse } from "../../../utils/Awards/awardsConstants.js";
import { deleteAwardsDataChecker } from "./deleteAwardsDataChecker.js";

export async function deleteAwardsControllers(req, res) {
    try {
    
        deleteAwardsDataChecker(req,res).then((response)=>{
            if(Array.isArray(response)){
                return res.status(200).send({
                    Result: [],
                    success: true,
                    isAuth: true,
                    message: response[0],
                });
            }else{
               // return sendErrorResponse(res, response)
                return res.status(200).send({
                    Result: [],
                    success: true,
                    isAuth: true,
                    message: response
                });
            }
        })

    } catch (error) {
 
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }
}