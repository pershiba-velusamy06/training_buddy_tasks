import { Schema, model } from 'mongoose';

const awardsschema = new Schema({
    awardTitle: { type: String, required: true },
    description: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedDate: { type: String, required: true },
    approvalStatus: { type: String, required: true },
    pinStatus: { type: String, required: true },
    pinSequence:{type:String,required:true}
});

const Awards = model('Awards', awardsschema);
export default Awards;

