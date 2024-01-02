import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
const options = {};

const connectToMongoDB = async () => {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client;
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the value across HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectToMongoDB();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for each request.
  clientPromise = connectToMongoDB();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
