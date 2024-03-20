import { successMessage } from "../../../utils/Awards/awardsConstants.js";
import { deleteAwardsDao, findAwardsExsistingUser, removeAwardsFromUser } from "./deleteAwardsValidator.js";
import  jwt  from "jsonwebtoken";
export const deleteAwardsDataChecker = async (req, res) => {
    try {    
        let bearerAuth = req.headers.authorization
        let auth = bearerAuth.replace("Bearer ", "");

        const decoded = jwt.verify(auth, "elred");

        let phoneNumber = decoded.phoneNumber
        const isexsist = await findAwardsExsistingUser(phoneNumber, req.body.awards)
        if (isexsist) {
            const deleteResult = await deleteAwardsDao(req.body.awards)
            if (deleteResult) {
                const removeAwards = await removeAwardsFromUser(phoneNumber, req.body.awards)
                if (removeAwards) {
                    return [successMessage.deleteAwardsSucess]
                
                }
            }

        } else {

            return ["Award not belongs to the user"]
        }

    } catch (error) {
      
        throw Error('Internal server Error')
    }
}

