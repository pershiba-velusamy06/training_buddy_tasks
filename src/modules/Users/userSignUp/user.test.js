import mongoose from 'mongoose';
import 'dotenv/config'; 
import request from 'supertest';
import express from 'express';
// import rootRouter from './src/combineRoutes';
import userRoutes from '../userRoutes';

const MongoDbString = process.env.MONGODBSTRING;

mongoose.connect(MongoDbString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use('/', userRoutes);

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
  });

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
    expect(response.body.errors[0]).toHaveProperty('message','Invalid phone number format. It should start with +91 and be 10 digits long.');
  });
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
  });
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
  });
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
  });

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
  });
});