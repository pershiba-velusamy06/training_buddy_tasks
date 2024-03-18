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

// Delete awards api

describe('Awards Routes - Delete User Awards', () => {
  it('should return success response for valid awards deletion', async () => {
    const validAwardsToDelete = {
      awards: ["65f003041ea36b47123ad212"]
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(validAwardsToDelete);

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: true,
      message: 'Awards Deleted Successfully.',
      Result:[]
    });
  });

  it('should return error response for missing authorization token', async () => {
    const validAwardsToDelete = {
      awards: ["65f003041ea36b47123ad212"]
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [{
        field: "awards",
        message: 'Awards array should not contain empty strings'
      }]
    });
  });

  it('should return error response for invalid awards (additional property)', async () => {
    const invalidAwardsToDelete = {
      awards: ["65f003041ea36b47123ad212"],
      age: "dvsdfd"
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [{
        field: "age",
        message: 'must NOT have additional properties'
      }]
    });
  });

  it('should return error response for invalid awards (not an array)', async () => {
    const invalidAwardsToDelete = {
      awards: ""
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [{ 
        field: "awards",
        message: 'must be array' }]
    });
  });
});
