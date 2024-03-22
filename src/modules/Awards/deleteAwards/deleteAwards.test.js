import mongoose from 'mongoose';
import 'dotenv/config';
import request from 'supertest';
import express from 'express';
import awardsRoutes from '../routes';



import userInfo from '../../../modals/UserSchema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Awards from '../../../modals/AwardsSchema';


let mongoServer;
let createdUserId;
let app;
let awardsId;
const validAwardsData = {
  awardTitle: "Awards 12",
  description: "sxcxcdscdvdsgdfgsdgds",
  issuedBy: "xzcsccdscs cdfasfsfa",
  issuedDate: "12/03/2024",
  approvalStatus: "accepted",
  pinStatus:"unpinned" ,
  pinSequence:0
};


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri);
  app = express();
  app.use(express.json());
  app.use('/', awardsRoutes);
  const createAwards = await Awards.create(validAwardsData)
 
  let userData = {
    firstname: 'Pershiba',
    lastname: 'Velusamy',
    phoneNumber: '+919787546335',
    email: 'pershiba@elred.io',
    awards: [createAwards._id],
  }
  const newUser = await userInfo.create(userData);
  createdUserId = newUser._id;
  awardsId = createAwards._id;
}, 100000);

afterAll(async () => {
  await Awards.findByIdAndDelete(awardsId);
  await userInfo.findByIdAndDelete(createdUserId);
  await mongoose.disconnect();
  await mongoServer.stop();
}, 100000);


// Delete awards api

describe('Awards Routes - Delete User Awards', () => {



  it('should return success response for valid awards deletion', async () => {
    const validAwardsToDelete = {
      awards: [awardsId]
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMDUiLCJpYXQiOjE3MTEwODg0NTUsImV4cCI6MTcxMTk1MjQ1NX0.qsTyaJIi4vqKiGQIt0z02EbJwZ8ApF3293QLDmrstOc')
      .send(validAwardsToDelete);

    // expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: true,
      // message: 'Awards Deleted Successfully.' || "Award not belongs to the user",
      message: expect.any(String),
      Result: []
    });
  });

  it('should return error response for missing authorization token', async () => {
    const validAwardsToDelete = {
      awards: [awardsId]
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .send(validAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'User not authorized',
      result: expect.arrayContaining([])
    });
  });

  it('should return error response for invalid awards (empty string)', async () => {
    const invalidAwardsToDelete = {
      awards: [""]
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMDUiLCJpYXQiOjE3MTEwODg0NTUsImV4cCI6MTcxMTk1MjQ1NX0.qsTyaJIi4vqKiGQIt0z02EbJwZ8ApF3293QLDmrstOc')
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'Awards array should not contain empty strings'
      // errors: [{
      //   field: "awards",
      //   message: 'Awards array should not contain empty strings'
      // }]
    });
  });

  it('should return error response for invalid awards (additional property)', async () => {
    const invalidAwardsToDelete = {
      awards: [awardsId],
      age: "dvsdfd"
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMDUiLCJpYXQiOjE3MTEwODg0NTUsImV4cCI6MTcxMTk1MjQ1NX0.qsTyaJIi4vqKiGQIt0z02EbJwZ8ApF3293QLDmrstOc')
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'must NOT have additional properties'
      // errors: [{
      //   field: "age",
      //   message: 'must NOT have additional properties'
      // }]
    });
  });

  it('should return error response for invalid awards (not an array)', async () => {
    const invalidAwardsToDelete = {
      awards: ""
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMDUiLCJpYXQiOjE3MTEwODg0NTUsImV4cCI6MTcxMTk1MjQ1NX0.qsTyaJIi4vqKiGQIt0z02EbJwZ8ApF3293QLDmrstOc')
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'must be array'
      // errors: [{
      //   field: "awards",
      //   message: 'must be array'
      // }]
    });
  });
});
