import { CreateAwards, getAllAwardsByReference, updateAwardsDao } from '../../dao/Awards.js';
import jwt from 'jsonwebtoken';
import { findUser, finduserById, updateAwardCreationinUser } from '../../dao/User.js';
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
                Result: [Award],
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

export async function updateAwards(req, res) {
    try {
        let auth = req.headers.authorization;
        const decoded = jwt.verify(auth, "elred");

        let phoneNumber = decoded.phoneNumber
        let user = await findUser(phoneNumber, req.body.awardId)
        if (user) {
            const reqObject = {
                _id: req.body.awardId,
                awardTitle: req.body.awardTitle,
                description: req.body.description,
                issuedBy: req.body.issuedBy,
                issuedDate: req.body.issuedDate,
                approvalStatus: req.body.approvalStatus
            };

            let updateAwardsDetail = await updateAwardsDao(req.body.awardId, reqObject)
            if (updateAwardsDetail) {
                res.send({
                    statusCode: 200,
                    Result: [updateAwardsDetail],
                    success: true,
                    isAuth: true,
                    message: "Selected Award Modified Successfully.",
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: "Award not belongs to the user",
                result: []
            });
        }
    } catch (err) {
        console.log(err, "err>>>>>>>>>>>")
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }

}


export async function viewAllAwardsOfUser(req, res) {
    try {
        const { start, offset } = req.query;
        const usercode = req.body.usercode;
       
        if (!usercode) {
            return res.status(400).send({
                statusCode: 400,
                success: false,
                isAuth: false,
                message: "User code is missing.",
            });
        }
        let user = await finduserById(usercode)
        console.log(user)
        if (user) {

            const awardsList = await getAllAwardsByReference(user.awards,start, offset )

            res.send({
                statusCode: 200,
                result: awardsList,
                totalAwardsCount:user.awards.length,
                success: true,
                isAuth: true,
                message: "Awards Fetched Successfully.",
            });
        }

    } catch (error) {
        console.log(error, "err>>>>>>>>>>>")
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }
}