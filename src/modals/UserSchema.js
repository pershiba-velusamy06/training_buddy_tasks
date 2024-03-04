import { Schema, model } from 'mongoose';

const userschema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String },
  expiryTime: { type: String }
});

const userInfo = model('userInfo', userschema);
export default userInfo;
