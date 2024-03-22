import mongoose from 'mongoose';
import 'dotenv/config';
import request from 'supertest';
import express from 'express';
import v2awardsRoutes from '../routes';
const multer = require('multer');
import fs from 'fs';
import path from 'path';

// const MongoDbString = process.env.MONGODBSTRING;

// mongoose.connect(MongoDbString);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const app = express();
// app.use(express.json());
// app.use('/v2', v2awardsRoutes);




import userInfo from '../../../modals/UserSchema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Awards from '../../../modals/AwardsSchema';
import Award from '../../../modals/updatedAwardsSchema';

let mongoServer;
let createdUserId;
let app;
let awardsId;
const validAwardsData = {
  awardTitle: "Awards 12",
  description: "sxcxcdscdvdsgdfgsdgds",
  issuedBy: "xzcsccdscs cdfasfsfa",
  issuedDate: "12/03/2024"
};


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri);
  app = express();
  app.use(express.json());
  app.use('/v2', v2awardsRoutes);
  const createAwards = await Award.create(validAwardsData)

  let userData = {
    firstname: 'Pershiba',
    lastname: 'Velusamy',
    phoneNumber: '+919787546335',
    email: 'pershiba@elred.io',
    awards: [createAwards._id],
  }
  const newUser = await userInfo.create(userData);
  createdUserId = newUser._id;
  awardsId = createAwards._id;
}, 100000);

afterAll(async () => {
  await Award.findByIdAndDelete(awardsId);
  await userInfo.findByIdAndDelete(createdUserId);
  await mongoose.disconnect();
  await mongoServer.stop();
}, 100000);



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

    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      isAuth: true,
      message: "User Created Award added Successfully.",
      Result: expect.any(Array)
    });
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
      .send(invalidAwardsData);


    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      errorCode: -1,
      isAuth: false,
      success: false,
      result:[],
      message: "must NOT have fewer than 3 characters" 
     
    });
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
      .send(invalidAwardsData);


    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      errorCode: -1,
      isAuth: false,
      success: false,
      message: "Invalid format for issuedDate. It should be in the format dd/mm/yyyy.",
      result:[]
     
    });
  });

  it('should return error response for invalid awards data', async () => {
    const invalidAwardsData = {
      awardTitle: "Awards",
      description: "sxcxcdscdvdsgdfgsdgds",
      issuedBy: "xzcsccdscs cdfasfsfa",
      issuedDate: "11/03/2024",
      test: "szdsada"
    };

    const response = await request(app)
      .post('/v2/addUserAwards')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Iis5MTk3ODc1NDYzMzUiLCJpYXQiOjE3MTA1MDA4ODgsImV4cCI6MTcxMTM2NDg4OH0.76LxDkKSpAup4rsdm0uxblh1NP5zy7tyiiyzG79BFdk')
      .send(invalidAwardsData);


    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      errorCode: -1,
      isAuth: false,
      success: false,
      message: "must NOT have additional properties" ,
      result:[],
    
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
      .post('/v2/addUserAwards')
      .send(validAwardsData);


    expect(response.statusCode).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      result:[],
      message: 'User not authorized' 
   
    });
  });




  it('Should return 500 with error message for invalid file type', async () => {
    const filePath = path.resolve(__dirname, 'training_buddy_tasks-main.zip');
    const fileBuffer = fs.readFileSync(filePath)
    const response = await request(app)
      .post('/v2/addUserAwards').field('awardTitle', 'sadsadsa')
      .field('description', 'sadsad')
      .field('issuedDate', '08/06/2023')
      .field('issuedBy', 'csadfda')
      .attach('awardCertificateURL', fileBuffer, 'training_buddy_tasks-main.zip');

    expect(response.status).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      
      message: 'Invalid file type. Only JPG/JPEG, PNG, and PDF files are allowed.'
    });

  });


  it('Should return 500 with error message for file too large', async () => {
    
    const filePath = path.resolve(__dirname, 'sample-pdf-download-10-mb.pdf');
    const fileBuffer = fs.readFileSync(filePath)


    const response = await request(app)
      .post('/v2/addUserAwards').field('awardTitle', 'sadsadsa')
      .field('description', 'sadsad')
      .field('issuedDate', '08/06/2023')
      .field('issuedBy', 'csadfda')
      .attach('awardCertificateURL', fileBuffer, 'sample-pdf-download-10-mb.pdf');

    expect(response.status).toStrictEqual(500);
    expect(response.body).toStrictEqual({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: 'File too large. Maximum file size allowed is 10MB.'
    });
  });





});



2893.20
