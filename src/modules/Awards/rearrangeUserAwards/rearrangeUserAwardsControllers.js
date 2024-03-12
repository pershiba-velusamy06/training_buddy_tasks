import { rearrangeUserAwardsDataChecker } from "./rearrangeUserAwardsDataChecker.js"

export const rearrangeUserAwardsControllers = async (req, res) => {

    try {
        await rearrangeUserAwardsDataChecker(req, res).then((response) => {
            if (response) {
                if (Array.isArray(response)) {
                    res.send({
                        statusCode: 200,
                        result: response,
                        success: true,
                        isAuth: true,
                        message: "Updated User Awards Successfully"
                    })
                } else {
                    res.send({
                        success: false, isAuth: false, errorCode: -1,
                        message: response,
                        result: []
                    })
                }


            }

        })
    } catch (error) {
        console.log(error, "error<<<<<<<<<<<<<<<<<<")
        res.status(500).send({ errorCode: -1, result: [], status: 'Failure', message: 'internal server error' });

    }

}