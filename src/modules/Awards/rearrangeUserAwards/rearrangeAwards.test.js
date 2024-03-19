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
  console.log(newUser.awards[0], "newUser.awards[0]")
  awardsId = createAwards._id;
}, 100000);

afterAll(async () => {
  await Awards.findByIdAndDelete(awardsId);
  await userInfo.findByIdAndDelete(createdUserId);
  await mongoose.disconnect();
  await mongoServer.stop();
}, 100000);





// Rearrange user awards api

describe('Awards Routes - Rearrange User Awards', () => {
  

  it('should return success response for valid rearrangement', async () => {
    const validUserAwards = {
      awards: [
        { awardId: awardsId, pinStatus: "pinned", pinSequence: 1 }
      ]
    };

    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(validUserAwards);

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: true,
      message: 'Updated User Awards Successfully',
      result: expect.arrayContaining([
        expect.objectContaining( {
          "awardId": expect.any(String),
          "awardTitle": expect.any(String),
          "description":expect.any(String),
          "issuedBy": expect.any(String),
          "issuedDate": expect.any(String),
          "approvalStatus":expect.any(String),
          "pinStatus": expect.any(String),
          "pinSequence":expect.any(String)
        }),
        expect.objectContaining(  {
          "awardId": expect.any(String),
          "awardTitle": expect.any(String),
          "description":expect.any(String),
          "issuedBy": expect.any(String),
          "issuedDate": expect.any(String),
          "approvalStatus": expect.any(String),
          "pinStatus": expect.any(String),
          "pinSequence":expect.any(String)
        })
      ])
    });
    
  });


  it('should return error response for missing authorization token', async () => {
    const validUserAwards = {
      awards: [
        { awardId:awardsId, pinStatus: "pinned", pinSequence: 1 }
      ]
    };

    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .send(validUserAwards);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      message: 'User not authorized'
    });
  });


  it('should return error response for invalid rearrangement data in pinStatus', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: awardsId, pinStatus: "invalidStatus", pinSequence: 1 }
      ]
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      message: `Invalid pinStatus value for awardId ${invalidUserAwards.awards[0].awardId}`
    });
  });


  it('should return error response for missmatching pinStatus and pinSequence', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: awardsId, pinStatus: "hidden", pinSequence: 0 }
      ]
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      message: `Invalid combination of pinStatus and pinSequence for awardId ${invalidUserAwards.awards[0].awardId}.`
    });

  });


  it('should return error response for invalid extra data passed', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: awardsId, pinStatus: "pinned", pinSequence: 1 }
      ],
      invalid:"invalid"
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      errors: [{
        field: "invalid",
        message: "must NOT have additional properties" }],
    });
  });


  it('should return error response for invalid data without awards data', async () => {
    const invalidUserAwards = {
      awards: []
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      errors: [{ 
        field: "awards",
        message: "Awards array cannot be empty." }]
    });
  });
  it('should return error response for missing params', async () => {
    const invalidUserAwards = {
    };

    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      errors: [{ 
        field: "awards",
        message: "must have required property 'awards'" }]
    });
  });


});

