import { sendErrorResponse, successMessage } from "../../../utils/Awards/awardsConstants.js";
import { userSpecificAwardsDataChecker } from "./userSpecificAwardsDatachecker.js";



export async function userSpecificAwardsController(req, res) {
    try {

        userSpecificAwardsDataChecker(req,res).then((response)=>{
            if(Array.isArray(response)){
                if (response) {
                    console.log(response,"response")
                  return  res.send({
                        statusCode: 200,
                        result: response[0].awardsList,
                        totalAwardsCount: response[0].count,
                        success: true,
                        isAuth: true,
                        message: successMessage.fetchAwardsSucess,
                    });
                   
                } 
            }else{
                return sendErrorResponse(res, response)
            }
            
        })
     
    
    } catch (error) {
    
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }
}
