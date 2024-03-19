import mongoose from 'mongoose';
import 'dotenv/config';
import request from 'supertest';
import express from 'express';
import awardsRoutes from '../routes';

// const MongoDbString = process.env.MONGODBSTRING;

// mongoose.connect(MongoDbString);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const app = express();
// app.use(express.json());
// app.use('/', awardsRoutes);

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




// Edit awards

describe('Awards Routes - Edit', () => {

  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefbaeb43a554aafd2c895',
      awardTitle: 'Updated Award Title',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'unpinned',
      pinSequence: 0
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidEditAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Failed to edit award",
      result: []
    });

  });
  it('should return success response for valid edit awards data', async () => {
    const validEditAwardsData = {
      awardId: awardsId,
      awardTitle: 'Updated Award Title',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'unpinned',
      pinSequence: 0
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(validEditAwardsData);

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: true,
      Result: expect.arrayContaining([
        expect.objectContaining({
          awardId: expect.any(String),
          awardTitle: 'Updated Award Title',
          description: 'Updated description',
          issuedBy: 'Updated Issuer',
          issuedDate: '15/03/2024',
          approvalStatus: 'accepted',
          pinStatus: "unpinned",
          pinSequence: "0"
        })
      ]),
      message: "Selected Award Modified Successfully."
    });
  });

  it('should return error response for invalid pinSequence', async () => {
    const invalidEditAwardsData = {
      awardId: awardsId,
      awardTitle: 'Updated Award Title',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'unpinned',
      pinSequence: -1
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidEditAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: `Invalid combination of pinStatus and pinSequence for awardId ${invalidEditAwardsData.awardId}.`
    });
  });

  it('should return error response for invalid pinStatus', async () => {
    const invalidEditAwardsData = {
      awardId: awardsId,
      awardTitle: 'Updated Award Title',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'unpin',
      pinSequence: 0
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidEditAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: `Invalid pinStatus value for awardId ${invalidEditAwardsData.awardId}`
    });
  });

  it('should return error response for invalid awardTitle', async () => {
    const invalidEditAwardsData = {
      awardId: awardsId,
      awardTitle: '',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'unpinned',
      pinSequence: 0
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidEditAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [{ field: "awardTitle", message: "must NOT have fewer than 3 characters" }],

    });
  });

  it('should return error response for missing authorization token', async () => {
    const validEditAwardsData = {
      awardId: awardsId,
      awardTitle: 'Updated Award Title',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'unpinned',
      pinSequence: 0
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .send(validEditAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'User not authorized',
      result: []
    });
  });
});
