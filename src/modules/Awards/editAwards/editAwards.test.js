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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message', "Failed to edit award");

  });
  it('should return success response for valid edit awards data', async () => {
    const validEditAwardsData = {
      awardId: '65eefc1cb43a554aafd2c89f',
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

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('Result');
    expect(response.body).toHaveProperty('message', "Selected Award Modified Successfully.");
  });



  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefc1cb43a554aafd2c89f',
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message', 'Invalid combination of pinStatus and pinSequence for awardId 65eefc1cb43a554aafd2c89f.');

  });
  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefc1cb43a554aafd2c89f',
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message', `Invalid pinStatus value for awardId ${invalidEditAwardsData.awardId}`);

  });
  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefc1cb43a554aafd2c89f',
      awardTitle: 'Updated Award Title',
      description: 'Updated description',
      issuedBy: 'Updated Issuer',
      issuedDate: '15/03/2024',
      approvalStatus: 'accepted',
      pinStatus: 'pinned',
      pinSequence: 12
    };

    const response = await request(app)
      .patch('/editUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidEditAwardsData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message',"Invalid pinSequence for awardId 65eefc1cb43a554aafd2c89f. pinSequence should be a number from -1 to 10.");

  });



  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefc1cb43a554aafd2c89f',
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty('field',"awardTitle");
    expect(response.body.errors[0]).toHaveProperty('message',"must NOT have fewer than 3 characters");
  });





  it('should return error response for missing authorization token', async () => {
    const validEditAwardsData = {
      awardId: '65eefc1cb43a554aafd2c89f',
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message', 'User not authorized');
  });
});