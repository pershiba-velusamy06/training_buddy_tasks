import { rearrangeUserAwardsDataChecker } from "./rearrangeUserAwardsDataChecker.js"

export const rearrangeUserAwardsControllers = async (req, res) => {

    try {
        await rearrangeUserAwardsDataChecker(req, res).then((response) => {
            if (response) {
                if (Array.isArray(response)) {
                    res.status(200).send({
                       
                        result: response,
                        success: true,
                        isAuth: true,
                        message: "Updated User Awards Successfully"
                    })
                } else {
                    res.status(500).send({
                        success: false, isAuth: false, errorCode: -1,
                        message: response,
                        result: []
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).send({ errorCode: -1, result: [], status: 'Failure', message: 'internal server error' });

    }

}