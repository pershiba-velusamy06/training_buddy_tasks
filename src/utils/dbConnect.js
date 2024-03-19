import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();




export const dbConnect = async () => {
    const uri = await mongoServer.getUri();
    console.log(uri, "uri")
    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true

    };
    await mongoose.connect(uri);
};

export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.start()
    await mongoServer.stop();
};

