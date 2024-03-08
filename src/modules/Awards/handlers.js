import {  deleteAwardsDao, getAllAwardsByReference, updateAwardsDao } from '../../dao/Awards.js';
import jwt from 'jsonwebtoken';
import { findAwardsExsistinUser, findUser, finduserById, removeAwardsFromUser } from '../../dao/User.js';
import { successMessage } from '../../utils/Awards/awardsConstants.js';


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
                res.status(200).send({
                    
                    Result: [updateAwardsDetail],
                    success: true,
                    isAuth: true,
                    message: successMessage.editAwardsSucess,
                });
            }
        } else {
            return res.status(200).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: "Award not belongs to the user",
                result: []
            });
        }
    } catch (err) {
      
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }

}


export async function viewAllAwardsOfUser(req, res) {
    try {
        const { start, offset } = req.query;
        const usercode = req.body.usercode;


        let user = await finduserById(usercode)
        console.log(user)
        if (user) {

            const awardsList = await getAllAwardsByReference(user.awards, start, offset)

            res.send({
                statusCode: 200,
                result: awardsList,
                totalAwardsCount: user.awards.length,
                success: true,
                isAuth: true,
                message: successMessage.fetchAwardsSucess,
            });
        }else{
            res.send({
                statusCode: 200,
                result: [],
                totalAwardsCount: 0,
                success: true,
                isAuth: true,
                message: "invalid usercode",
            }); 
        }

    } catch (error) {
     
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }
}

export async function deleteAwards(req, res) {
    try {
        let auth = req.headers.authorization;
        const decoded = jwt.verify(auth, "elred");

        let phoneNumber = decoded.phoneNumber
        const isexsist = await findAwardsExsistinUser(phoneNumber, req.body.awards)
        if (isexsist) {
            const deleteResult = await deleteAwardsDao(req.body.awards)
            if (deleteResult) {
                const removeAwards = await removeAwardsFromUser(phoneNumber, req.body.awards)
                if (removeAwards) {
                    res.status(200).send({
                        success: true,
                        isAuth: true,
                        message: successMessage.deleteAwardsSucess,
                        result: []
                    });
                }
            }

        } else {

            return res.status(200).send({
                success: false,
                isAuth: false,
                errorCode: -1,
                message: "Award not belongs to the user",
                result: []
            });


        }

    } catch (error) {
   
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }
}