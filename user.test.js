import mongoose from 'mongoose';
import 'dotenv/config'; 
import request from 'supertest';
import express from 'express';
import rootRouter from './src/combineRoutes';

const MongoDbString = process.env.MONGODBSTRING;

mongoose.connect(MongoDbString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use('/', rootRouter);

// sign up api 

describe('User Routes', () => {
  it('should return success response for valid user signup data', async () => {
    const validUserData = {
      firstname: 'Pershiba',
      lastname: 'Velusamy',
      phoneNumber: '+919787546335', 
      email: 'pershiba@elred.io'
    };

    const response = await request(app)
      .post('/userSignUp')
      .send(validUserData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('Result');
    expect(response.body.Result.length).toBeGreaterThan(0);
  }, 60000);

  it('should return error response for invalid user signup data', async () => {
    const invalidUserData = {
      firstname: 'Pershiba',
      lastname: 'Velusamy',
      phoneNumber: '+919787', 
      email: 'pershiba@elred.io'
    };

    const response = await request(app)
      .post('/userSignUp')
      .send(invalidUserData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid user signup data', async () => {
    const invalidUserData = {
      firstname: 'Pershiba',
      lastname: 'V',
      phoneNumber: '+919787546335', 
      email: 'pershiba@elred.io'
    };

    const response = await request(app)
      .post('/userSignUp')
      .send(invalidUserData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid user signup data', async () => {
    const invalidUserData = {
      firstname: 'Pershiba',
      lastname: 'Velusamy',
      phoneNumber: '+919787546335', 
      email: 'pershiba@elred.io',
      age:25
    };

    const response = await request(app)
      .post('/userSignUp')
      .send(invalidUserData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid user signup data', async () => {
    const invalidUserData = {
      firstname: 'Pershiba',
      lastname: 'Velusamy',
      phoneNumber: '+919787546335', 
      email: 'pershibaelred.io'
    };

    const response = await request(app)
      .post('/userSignUp')
      .send(invalidUserData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);

  it('should return error response for existing email', async () => {
   
    const response = await request(app)
      .post('/userSignUp')
      .send({
        firstname: 'Jane',
        lastname: 'Doe',
        phoneNumber: '+911234567891',
        email: 'pershiba@elred.io'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message', 'This email is already in use with another phone number. Please enter the correct phone and email combination.');
  }, 60000);
});

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

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('Result');
    expect(response.body.Result.length).toBeGreaterThan(0);
  }, 60000);

  it('should return error response for invalid awards data', async () => {
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
  

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid awards data', async () => {
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
  

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid awards data', async () => {
    const invalidAwardsData = {
      awardTitle: "Awards",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "11/03/2024",
      test:"szdsada"
    };
  
    const response = await request(app)
      .post('/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);
  

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  
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

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message', 'User not authorized');
  }, 60000);
});

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
    expect(response.body).toHaveProperty('message');

  }, 60000);
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
    expect(response.body.Result.length).toBeGreaterThan(0);
  }, 60000);

  

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
    expect(response.body).toHaveProperty('message');

  }, 60000);
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
    expect(response.body).toHaveProperty('message');

  }, 60000);
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
    expect(response.body).toHaveProperty('message');

  }, 60000);



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
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);





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
  }, 60000);
});

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
    expect(response.body).toHaveProperty('message');
  }, 60000);
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
    expect(response.body).toHaveProperty('message');
  }, 60000);

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
  }, 60000);
  it('should return error response for missing usercode', async () => {
    const invalidViewAwardsData = {
      usercode: '65eef4d347b0156efb1d08e4', 
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
  }, 60000);

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
  }, 60000);
});

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

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('message', 'Awards Deleted Successfully.');
  }, 60000);

  it('should return error response for missing authorization token', async () => {
    const validAwardsToDelete = {
      awards: ["65f003041ea36b47123ad212"] 
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .send(validAwardsToDelete);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'User not authorized');
  }, 60000);

  it('should return error response for invalid awards', async () => {
    const invalidAwardsToDelete = {
      awards: [""] 
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk') 
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid awards', async () => {
    const invalidAwardsToDelete = {
      awards: [""] ,
      age:"dvsdfd"
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk') 
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
  it('should return error response for invalid awards', async () => {
    const invalidAwardsToDelete = {
      awards: ""
    };

    const response = await request(app)
      .delete('/deleteUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk') 
      .send(invalidAwardsToDelete);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors.length).toBeGreaterThan(0);
  }, 60000);
});

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

  it('should return error response for invalid rearrangement data', async () => {
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
  it('should return error response for invalid rearrangement data', async () => {
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

  it('should return error response for invalid rearrangement data', async () => {
    const invalidUserAwards = {
      awards: [
        { awardId: "65eefc18b43a554aafd2c89c", pinStatus: "invalidStatus", pinSequence: 1 },
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


  it('should return error response for invalid rearrangement data', async () => {
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
  it('should return error response for invalid rearrangement data', async () => {
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

