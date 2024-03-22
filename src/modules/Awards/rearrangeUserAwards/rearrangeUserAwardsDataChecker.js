import { findAwardsExsistingUser } from "../deleteAwards/deleteAwardsValidator.js";
import { rearrangeUserAwardsValidator } from "./rearrangeUserAwardsValidator.js";

import jwt from "jsonwebtoken";


export const rearrangeUserAwardsDataChecker = async (req, res) => {
    try {

        let bearerAuth = req.headers.authorization
        let auth = bearerAuth.replace("Bearer ", "");
        const decoded = jwt.verify(auth, "elred");
        let phoneNumber = decoded.phoneNumber
       
        const awardIdsSet = [];
        let pinnedAwardsCount = 0;
        for (const award of req.body.awards) {

            if (!["hidden", "unpinned", "pinned"].includes(award.pinStatus)) {
                return `Invalid pinStatus value for awardId ${award.awardId}`
            }
            const pinSequence = parseInt(award.pinSequence);
            if (isNaN(pinSequence) || pinSequence < -1 || pinSequence > 10) {
                return `Invalid pinSequence for awardId ${award.awardId}. pinSequence should be a number from -1 to 10.`
            }
            if ((pinSequence !== 0 && award.pinStatus === "unpinned") || (pinSequence !== -1 && award.pinStatus === "hidden")||((pinSequence<1) &&award.pinStatus==="pinned")) {
                return `Invalid combination of pinStatus and pinSequence for awardId ${award.awardId}.`
            }
            if (awardIdsSet.includes(award.awardId)) {
                return `Duplicate awardId ${award.awardId} in the awards array.`
            } else {
                awardIdsSet.push(award.awardId);
            }
            if (award.pinStatus === "pinned") {
                pinnedAwardsCount++;
                if (pinnedAwardsCount > 10) {
                    return "More than 10 awards are pinned."
                }
            }
        }

        let awardsList = [];
        const isExsit = await findAwardsExsistingUser(phoneNumber, awardIdsSet)
        if (isExsit) {
            for (const award of req.body.awards) {

                let bodyData = {
                    awardId: award.awardId,
                    pinStatus: award.pinStatus,
                    pinSequence: award.pinSequence.toString()
                };
                let awards = await rearrangeUserAwardsValidator(bodyData);
                awardsList.push(awards);

            }
            return awardsList;
        } else {
            return "Award not belongs to the user";
        }

    } catch (error) {
        console.log(error)
        throw new Error('Internal server Error');
    }
}
