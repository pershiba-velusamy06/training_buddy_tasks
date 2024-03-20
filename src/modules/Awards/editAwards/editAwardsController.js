import { sendErrorResponse, successMessage } from "../../../utils/Awards/awardsConstants.js";
import { editAwardsDataCheckers } from "./edisAwardsDataCheckers.js";

export async function editAwardsController(req, res, next) {
    try {
        await editAwardsDataCheckers(req, res, next).then((response, error) => {

            if (response) {
                if (Array.isArray(response)) {
                    if (response.length > 0) {
                        return res.status(200).send({
                            Result: response,
                            success: true,
                            isAuth: true,
                            message: successMessage.editAwardsSucess,
                        });
                    } else {
                        return sendErrorResponse(res, "Failed to edit award")
                    }
                } else {
                    return sendErrorResponse(res, response)
                }

            } else {
                return sendErrorResponse(res, "Award not belongs to the user")

            }

        })

    } catch (err) {
      
        res.status(500).send({ errorCode: -1, result: [], status: 'Failure', message: 'internal server error' });


    }
}