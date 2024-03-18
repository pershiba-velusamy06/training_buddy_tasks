import mongoose from 'mongoose';
import 'dotenv/config'; 
import request from 'supertest';
import express from 'express';
import awardsRoutes from '../routes';

const MongoDbString = process.env.MONGODBSTRING;

mongoose.connect(MongoDbString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use('/', awardsRoutes);


// create awards

describe('Awards Routes', () => {
  it('should return success response for valid awards data', async () => {
    const validAwardsData = {
      awardTitle: "Awards 12",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "12/03/2024"
    };

    const response = await request(app)
      .post('/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(validAwardsData);

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: true,
      Result: expect.arrayContaining([
        expect.objectContaining({
          awardId: expect.any(String),
          awardTitle: "Awards 12",
          description: "sxcxcdscdvdsgdfgsdgds",
          issuedBy: "xzcsccdscs cdfasfsfa",
          issuedDate: "12/03/2024",
          approvalStatus: "accepted",
          pinStatus: "unpinned",
          pinSequence: "0"
        })
      ]),
      message: "User Created Award added Successfully."
    });
  });

  it('should return error response for invalid awards data (empty award title)', async () => {
    const invalidAwardsData = {
      awardTitle: "",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "12/03/2024"
    };

    const response = await request(app)
      .post('/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      errorCode: -1,
      success: false,
      isAuth: false,
      errors: [
        expect.objectContaining({
          field: "awardTitle",
          message: "must NOT have fewer than 3 characters"
        })
      ]
    });
  });

  it('should return error response for invalid awards data (invalid issued date)', async () => {
    const invalidAwardsData = {
      awardTitle: "Awards",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "cscscsdcsc"
    };

    const response = await request(app)
      .post('/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      errorCode: -1,
      success: false,
      isAuth: false,
      errors: [
        expect.objectContaining( {
          field: "issuedDate",
          message: "Invalid format for issuedDate. It should be in the format dd/mm/yyyy."
        })
       
      ]
    });
  });

  it('should return error response for invalid awards data (additional field)', async () => {
    const invalidAwardsData = {
      awardTitle: "Awards",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "11/03/2024",
      test: "szdsada"
    };

    const response = await request(app)
      .post('/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      errorCode: -1,
      success: false,
      isAuth: false,
      errors: [
        {
          field: "test",
          message: "must NOT have additional properties"
        }
      ]
    });
  });
  
  it('should return error response for missing authorization token', async () => {
    const validAwardsData = {
      awardTitle: 'Best Employee',
      description: 'Employee of the month',
      issuedBy: 'Company X',
      issuedDate: '01/01/2024'
    };

    const response = await request(app)
      .post('/addUserAwards')
      .send(validAwardsData);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'User not authorized',
      result:expect.arrayContaining([])
    });
  });
});
