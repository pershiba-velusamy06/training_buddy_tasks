import { Schema, model } from 'mongoose';

const awardsschema = new Schema({
    awardTitle: { type: String, required: true },
    description: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedDate: { type: String, required: true },
    awardCertificateURL: { type: String }
    
});

const Award = model('Award', awardsschema);
export default Award;

