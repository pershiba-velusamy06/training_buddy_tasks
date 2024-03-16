
import { successMessage } from "../../../utils/Awards/awardsConstants.js";
import { createAwardsDataCheckers } from "./createAwardsDataChecker.js";


export async function createAwardsController(req, res) {

    try {

      
        // if (err) {
        //     // console.log(err, "err")
        //     return res.status(500).json({
        //         success: false,
        //         isAuth: false,
        //         errorCode: -1,
        //         message: err.message,
        //         result: []
        //     });
        // } else {
            await createAwardsDataCheckers(req, res).then((response) => {
                if (Array.isArray(response)) {
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
                } else {
                    return res.status(500).send({
                        success: false,
                        isAuth: false,
                        errorCode: -1,
                        message: response,
                        result: []
                    });
                }

            })
//        }

    } catch (error) {
    //  console.log(error,"errr>>>>>>>>>>>>.")
        res.status(500).send({ errorCode: -1, result: [], status: 'Failure', message: 'internal server error' });
    }
}