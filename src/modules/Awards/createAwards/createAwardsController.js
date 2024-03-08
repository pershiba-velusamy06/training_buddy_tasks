
import { successMessage } from "../../../utils/Awards/awardsConstants.js";
import { createAwardsDataCheckers } from "./createAwardsDataCheckers.js";

export async function createAwardsController(req, res) {
    try {
        await createAwardsDataCheckers(req, res).then((response) => {
            if (response.length > 0) {
                res.status(200).send({
                    Result: response,
                    success: true,
                    isAuth: true,
                    message: successMessage.createAwardSucess,
                });
            } else {

                return res.status(500).send({
                    success: false,
                    isAuth: false,
                    errorCode: -1,
                    message: "Awards not created",
                    result: []
                });
            }
        })
    } catch (err) {
        
        res.status(500).send({ errorCode: -1, result: [], status: 'Failure', message: 'internal server error' });
    }
}