import mongoose from 'mongoose';
import 'dotenv/config'; 
import request from 'supertest';
import express from 'express';
import v2awardsRoutes from '../routes';


const MongoDbString = process.env.MONGODBSTRING;

mongoose.connect(MongoDbString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use('/v2', v2awardsRoutes);


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
      .post('/v2/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(validAwardsData); 

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('Result');
    expect(response.body).toHaveProperty('message',"User Created Award added Successfully.");
    expect(response.body.Result.length).toBeGreaterThan(0);
  });

  it('should return error response for invalid awards data', async () => {
    const invalidAwardsData = {
      awardTitle: "",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "12/03/2024"
    };
  
    const response = await request(app)
      .post('/v2/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);;
  

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty('field',"awardTitle");
    expect(response.body.errors[0]).toHaveProperty('message',"must NOT have fewer than 3 characters");
  });

  it('should return error response for invalid awards data', async () => {
    const invalidAwardsData = {
      awardTitle: "Awards",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "cscscsdcsc"
    };
  
    const response = await request(app)
      .post('/v2/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);;
  

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty('field',"issuedDate");
    expect(response.body.errors[0]).toHaveProperty('message',"Invalid format for issuedDate. It should be in the format dd/mm/yyyy.");
  });

  it('should return error response for invalid awards data', async () => {
    const invalidAwardsData = {
      awardTitle: "Awards",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "11/03/2024",
      test:"szdsada"
    };
  
    const response = await request(app)
      .post('/v2/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);;
  

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty('field',"test");
    expect(response.body.errors[0]).toHaveProperty('message',"must NOT have additional properties");

  });
  
  it('should return error response for missing authorization token', async () => {
    const validAwardsData = {
      awardTitle: 'Best Employee',
      description: 'Employee of the month',
      issuedBy: 'Company X',
      issuedDate: '01/01/2024'
    };

    const response = await request(app)
      .post('/v2/addUserAwards')
      .send(validAwardsData);;

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body.errors[0]).toHaveProperty('message', 'User not authorized');
  });
  
});