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

// view user specific awards list

describe('Awards Routes - View User Awards List', () => {
  it('should return success response for valid user and parameters', async () => {
    const validViewAwardsData = {
      usercode: createdUserId, 
    };
    const queryParams = {
      start: 0,
      offset: 10
    };

    const response = await request(app)
      .post('/viewUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .query(queryParams)
      .send(validViewAwardsData);

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      result: expect.any(Array),
      totalAwardsCount: expect.any(Number),
      success: true,
      isAuth: true,
      message: "Awards Fetched Successfully."
    });
  });

  it('should return error response for invalid user', async () => {
    const validViewAwardsData = {
      usercode: '65eef4d347b0156efb1d08e5', 
    };
    const queryParams = {
      start: 0,
      offset: 10
    };

    const response = await request(app)
      .post('/viewUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .query(queryParams)
      .send(validViewAwardsData);

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      result: [],
      totalAwardsCount: 0,
      success: true,
      isAuth: true,
      message: "Awards Fetched Successfully."
    });
  });

  it('should return error response for missing usercode', async () => {
    const invalidViewAwardsData = {
      usercode: '', 
    };
    const queryParams = {
      start: 0,
      offset: 10
    };

    const response = await request(app)
      .post('/viewUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .query(queryParams)
      .send(invalidViewAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      message: 'usercode should not be empty string'
    });
  });

  it('should return error response for missing AuthoriZation token', async () => {
    const invalidViewAwardsData = {
      usercode: createdUserId
    };
    const queryParams = {
      start: 0,
      offset: 10
    };

    const response = await request(app)
      .post('/viewUserAwards')
      .query(queryParams)
      .send(invalidViewAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result: [],
      message: 'User not authorized',

    });
  });

  it('should return error response for invalid query parameters', async () => {
    const validViewAwardsData = {
      usercode:createdUserId, 
    };
    const queryParams = {
      start: 0,
      offset: 10,
      invalidParam: 'invalid' 
    };

    const response = await request(app)
      .post('/viewUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .query(queryParams)
      .send(validViewAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      message: 'Extra query parameters found: invalidParam.'
    });
  });
});
