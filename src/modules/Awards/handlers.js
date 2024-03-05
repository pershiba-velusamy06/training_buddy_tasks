import { CreateAwards } from '../../dao/Awards.js';
import jwt from 'jsonwebtoken';
import { updateAwardCreationinUser } from '../../dao/User.js';
export async function createAwards(req, res) {

    try {
        let auth = req.headers.authorization;
        const decoded = jwt.verify(auth, "elred");

        let phoneNumber = decoded.phoneNumber
        console.log(req.body, "res.body")
        let bodyData = { ...req.body, approvalStatus: "accepted" }

        let Award = await CreateAwards(bodyData)
        console.log(Award, "Award")
        if (Award) {
            const insertToUser = await updateAwardCreationinUser(phoneNumber, Award.awardId)
            res.send({
                statusCode: 200,
                Result: Award,
                success: true,
                isAuth: true,
                message: "User Created Award added Successfully.",
            });
        } else {
            return res.status(400).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: "Awards not created",
                result: []
            });
        }
     
    } catch (err) {
        console.log(err, "err>>>>>>>>>>>")
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }
}