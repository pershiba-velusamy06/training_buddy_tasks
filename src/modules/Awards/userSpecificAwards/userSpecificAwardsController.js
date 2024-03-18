import { sendErrorResponse, successMessage } from "../../../utils/Awards/awardsConstants.js";
import { userSpecificAwardsDataChecker } from "./userSpecificAwardsDatachecker.js";



export async function userSpecificAwardsController(req, res) {
    try {

        userSpecificAwardsDataChecker(req, res).then((response) => {
            if (Array.isArray(response)) {
                if (response) {
                  
                    return res.status(200).send({
                      
                        result: response[0].awardsList,
                        totalAwardsCount: response[0].count,
                        success: true,
                        isAuth: true,
                        message: successMessage.fetchAwardsSucess,
                    });

                }
            } else {
                return sendErrorResponse(res, response)
            }

        })


    } catch (error) {
       
        res.status(500).send({ result: [], status: 'Failure', message: 'internal server error' });
    }
}
