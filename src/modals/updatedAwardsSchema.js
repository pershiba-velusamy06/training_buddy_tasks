import { Schema, model } from 'mongoose';

const awardsschema = new Schema({
    awardTitle: { type: String, required: true },
    description: { type: String },
    issuedBy: { type: String, required: true },
    issuedDate: { type: String, required: true },
    awardCertificateURL: {
        data: { type: "Buffer" },
        contentType: { type: 'string' }
    }

});

const Award = model('Award', awardsschema);
export default Award;

