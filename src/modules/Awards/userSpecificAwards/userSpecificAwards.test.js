import awardsRoutes from "../routes";
import mongoose from 'mongoose';
import 'dotenv/config'; 
import request from 'supertest';
import express from 'express';

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



// view user specific awards list

describe('Awards Routes - View User Awards List', () => {
  it('should return success response for valid user and parameters', async () => {
    const validViewAwardsData = {
      usercode: '65eef4d347b0156efb1d08e4', 
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

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result');
    expect(response.body).toHaveProperty('totalAwardsCount');
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('message',"Awards Fetched Successfully.");
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

    expect(response.statusCode).toBe(200);
  
    expect(response.body).toHaveProperty('result');
    expect(response.body).toHaveProperty('totalAwardsCount',0);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('message',"Awards Fetched Successfully.");
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'usercode should not be empty string');
  });
  it('should return error response for missing usercode', async () => {
    const invalidViewAwardsData = {
      usercode: '65eef4d347b0156efb1d08e4'
    };
    const queryParams = {
      start: 0,
      offset: 10
    };

    const response = await request(app)
      .post('/viewUserAwards')
      .query(queryParams)
      .send(invalidViewAwardsData);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('isAuth', false);
      expect(response.body).toHaveProperty('errorCode', -1);
      expect(response.body).toHaveProperty('message', 'User not authorized');
  });

  it('should return error response for invalid query parameters', async () => {
    const validViewAwardsData = {
      usercode: '65eef4d347b0156efb1d08e4', 
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Extra query parameters found: invalidParam.');
  });
});
