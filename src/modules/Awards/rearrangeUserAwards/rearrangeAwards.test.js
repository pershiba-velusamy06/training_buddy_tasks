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




// Rearrange user awards api

describe('Awards Routes - Rearrange User Awards', () => {
  

  it('should return success response for valid rearrangement', async () => {
    const validUserAwards = {
      awards: [
        { awardId: "65eefc18b43a554aafd2c89c", pinStatus: "pinned", pinSequence: 1 },
        { awardId: "65eefc1cb43a554aafd2c89f", pinStatus: "unpinned", pinSequence: 0 }
      ]
    };

    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(validUserAwards);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('message', 'Updated User Awards Successfully');
    expect(response.body.result.length).toBeGreaterThan(0);
  });


  it('should return error response for missing authorization token', async () => {
    const validUserAwards = {
      awards: [
        { awardId: "65eefc18b43a554aafd2c89c", pinStatus: "pinned", pinSequence: 1 },
        { awardId: "65eefc1cb43a554aafd2c89f", pinStatus: "unpinned", pinSequence: 0 }
      ]
    };

    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .send(validUserAwards);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'User not authorized');
  });


  it('should return error response for invalid rearrangement data in pinStatus', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: "65eefc18b43a554aafd2c89c", pinStatus: "invalidStatus", pinSequence: 1 },
        { awardId: "65eefc1cb43a554aafd2c89f", pinStatus: "unpinned", pinSequence: 0 }
      ]
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  });


  it('should return error response for missmatching pinStatus and pinSequence', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: "65eefc18b43a554aafd2c89c", pinStatus: "hidden", pinSequence: 0 },
        { awardId: "65eefc1cb43a554aafd2c89f", pinStatus: "unpinned", pinSequence: -1 }
      ]
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');

  });


  it('should return error response for invalid extra data passed', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: "65eefc18b43a554aafd2c89c", pinStatus: "pinned", pinSequence: 1 },
        { awardId: "65eefc1cb43a554aafd2c89f", pinStatus: "unpinned", pinSequence: 0 }
      ],
      invalid:"invalid"
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  });


  it('should return error response for invalid data without awards data', async () => {
    const invalidUserAwards = {
      awards: []
    };
    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it('should return error response for missing params', async () => {
    const invalidUserAwards = {
    };

    const response = await request(app)
      .patch('/rearrangeUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidUserAwards);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  });


});

