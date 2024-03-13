import { practiceAsyncDataChecker } from "./practiceAsyncDataChecker.js"


export const practiceAsyncControllers = async (req, res) => {
    await practiceAsyncDataChecker(req, res).then(async (response) => {
        console.log(response, "response")
        await res.send({
            result: response,
            message: "success"
        })
    })
}