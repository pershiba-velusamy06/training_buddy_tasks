import mongoose from 'mongoose';
import 'dotenv/config'; 
import request from 'supertest';
import express from 'express';
//import userRoutes from './src/modules/Users/userRoutes';
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU')
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU')
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU')
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU')
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



describe('Awards Routes - Edit', () => {
  it('should return success response for valid edit awards data', async () => {
    const validEditAwardsData = {
      awardId: '65eefbaeb43a554aafd2c894', 
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU') 
      .send(validEditAwardsData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('isAuth', true);
    expect(response.body).toHaveProperty('Result');
    expect(response.body.Result.length).toBeGreaterThan(0);
  }, 60000);

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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU') 
      .send(invalidEditAwardsData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message');

  }, 60000);
  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefbaeb43a554aafd2c894', 
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU') 
      .send(invalidEditAwardsData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message');

  }, 60000);
  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefbaeb43a554aafd2c894', 
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU') 
      .send(invalidEditAwardsData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message');

  }, 60000);
  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefbaeb43a554aafd2c894', 
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU') 
      .send(invalidEditAwardsData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('isAuth', false);
    expect(response.body).toHaveProperty('errorCode', -1);
    expect(response.body).toHaveProperty('message');

  }, 60000);



  it('should return error response for invalid edit awards data', async () => {
    const invalidEditAwardsData = {
      awardId: '65eefbaeb43a554aafd2c894',
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
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTAxNjA1ODYsImV4cCI6MTcxMTAyNDU4Nn0.9ATQQCCm0oYqQ1UarAzEUPATo06wKwid91DA038R9GU')
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
      awardId: '65eefbaeb43a554aafd2c894', 
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
