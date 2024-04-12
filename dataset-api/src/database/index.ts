import {MongoClient} from "mongodb";
import mongoose from "mongoose";

export async function connectToCluster(uri: string) {
    let mongoClient: MongoClient | undefined;

    try {
        console.log('Connecting to MongoDB Atlas cluster...');

        // @ts-ignore
        mongoClient =await mongoose.connect(uri, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        throw error;
    }
}
