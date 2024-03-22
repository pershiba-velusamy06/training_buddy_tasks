import jwt from 'jsonwebtoken';
import { CreateAwardsValidator, updateAwardCreationinUser } from './createAwardsValidator.js';
import multer from 'multer';
import fs from 'fs'
import { validateAddUserAwards } from '../../../middleware/v2CreateAwardsMiddleAware.js';
import path from 'path';
export const createAwardsDataCheckers = async (req, res) => {

    try {
        const valid = await validateAddUserAwards(req.body);

        if (!valid) {

            const errors = validateAddUserAwards.errors.map(error => ({
                field: error?.keyword === "additionalProperties" ? error?.params?.additionalProperty :
                    error?.keyword === "required" ?
                        error?.params?.missingProperty : error.instancePath.replace("/", ""),
                message: error.keyword === 'pattern' ? `Invalid format for issuedDate. It should be in the format dd/mm/yyyy.` : error.message,
            }));

            return errors[0]

        }
        if (!req.headers.authorization) {

            return {
                message: "User not authorized"
            }
        }
       
        let bearerAuth = req.headers.authorization
        let auth = bearerAuth.replace("Bearer ", "");
        const decoded = jwt.verify(auth, "elred");
        let phoneNumber = decoded.phoneNumber;
        let bodyData = {
            ...req.body, approvalStatus: "accepted", pinStatus: "unpinned", pinSequence: 0,
            awardCertificateURL: {
                data: fs.readFileSync(path.join("C:/Pershiba/Elred/Backend_training/training_buddy_tasks" + '/uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            }
        }
        let Award = await CreateAwardsValidator(bodyData)
        if (Award) {
            await updateAwardCreationinUser(phoneNumber, Award.awardId)
            return [Award]
        } else {
            return []
        }

    } catch (err) {
        console.log(err)
        throw Error('Internal server Error')
    }


}
