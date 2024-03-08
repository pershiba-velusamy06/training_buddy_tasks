import { successMessage } from "../../../utils/Awards/awardsConstants.js";
import { deleteAwardsDao, findAwardsExsistingUser, removeAwardsFromUser } from "./deleteAwardsValidator.js";
import  jwt  from "jsonwebtoken";
export const deleteAwardsDataChecker = async (req, res) => {
    try {

        if (req.body.awards.length === 0) {
          
            return  "awards should be an array containing at least one value"
        }
    
        if (!Array.isArray(req.body.awards)) {
          
            return  "Awards should be an array"

        }
    
     

        let auth = req.headers.authorization;
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
        console.log(error,"error")
        throw Error('Internal server Error')
    }
}

