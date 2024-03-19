import express from 'express';
import mongoose from 'mongoose';
import rootRouter from './combineRoutes.js';
import 'dotenv/config'
const port = process.env.PORT || 5000;
const MongoDbString=process.env.MONGODBSTRING;
const app = express();
import helmet from 'helmet';

app.use(helmet.hidePoweredBy())



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', rootRouter);

mongoose.connect(MongoDbString);
const db = mongoose.connection;
db.on('error', (err) => { console.log('MongoDB connection error:', err) });
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Node server is running in port ${port}`);
  })
});


app.timeout = 60000;
