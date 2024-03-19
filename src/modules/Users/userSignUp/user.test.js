import mongoose from 'mongoose';
import 'dotenv/config';
import request from 'supertest';
import express from 'express';
import userRoutes from '../userRoutes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import userInfo from '../../../modals/UserSchema';

let mongoServer;
let createdUserId;
let app;
let userData={
  firstname: 'Pershiba',
  lastname: 'Velusamy',
  phoneNumber: '+919787546335',
  email: 'pershiba@elred.io'
}
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri);
   app = express();
  app.use(express.json());
  app.use('/', userRoutes);
  const newUser = await userInfo.create(userData);
  createdUserId = newUser._id;
},100000);

afterAll(async () => {
  await userInfo.findByIdAndDelete(createdUserId);
  await mongoose.disconnect();
  await mongoServer.stop();
},100000);


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
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: false,
      Result: expect.arrayContaining([
        expect.objectContaining({
          accessToken: expect.any(String),
          expiryTime: expect.any(String),
          email: 'pershiba@elred.io',
          phoneNumber: '+919787546335'
        })
      ]),
      message: "User authenticated successfully!"
    });
  });

  it('should return error response for invalid user signup data (invalid phone number)', async () => {
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
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [
        expect.objectContaining({
          field: "phoneNumber",
          message: 'Invalid phone number format. It should start with +91 and be 10 digits long.'
        })
      ]
    });
  });

  it('should return error response for invalid user signup data (invalid last name)', async () => {
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
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [
        expect.objectContaining({
          field: "lastname",
          message: 'Last name should be between 3 and 20 characters long.'
        })]
    });
  });

  it('should return error response for invalid user signup data (additional field)', async () => {
    const invalidUserData = {
      firstname: 'Pershiba',
      lastname: 'Velusamy',
      phoneNumber: '+919787546335',
      email: 'pershiba@elred.io',
      age: 25
    };

    const response = await request(app)
      .post('/userSignUp')
      .send(invalidUserData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [
        expect.objectContaining({
          field: "age",
          message: 'must NOT have additional properties'
        })]
    });
  });

  it('should return error response for invalid user signup data (invalid email)', async () => {
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
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      errors: [
        expect.objectContaining({
          field: "email",
          message: 'Invalid email format.'
        })]
    });
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
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'This email is already in use with another phone number. Please enter the correct phone and email combination.',
      result: expect.arrayContaining([])
    });
  });



});
