import express from 'express';
import mongoose from 'mongoose';
import rootRouter from './combineRoutes.js';
import 'dotenv/config'
const port = process.env.PORT || 5000;
const MongoDbString = process.env.MONGODBSTRING;
const app = express();
import helmet from 'helmet';

import { createClient } from 'redis';

app.use(helmet.hidePoweredBy())



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', rootRouter);
let  client
mongoose.connect(MongoDbString);
const db = mongoose.connection;
db.on('error', (err) => { console.log('MongoDB connection error:', err) });
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(port, () => {


    console.log(`Node server is running in port ${port}`);
  })
});



 client = createClient({
  password: 'TQfeLMt3RVOMP7bPw7KeMYssprYrnOcY',
  socket: {
    host: 'redis-10134.c309.us-east-2-1.ec2.cloud.redislabs.com',
    port: 10134
  },

});
client.connect()

client.on('error', (error) => {
  console.error('Redis client error:', error);
});

client.on('ready', () => {
  console.log('Redis client connected');
});

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('reconnecting', () => {
  console.log('Redis client reconnecting');
});

client.on('end', () => {
  console.log('Redis client connection closed');
});


app.timeout = 60000;
export default client