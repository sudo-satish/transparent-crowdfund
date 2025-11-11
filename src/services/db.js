import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  retryWrites: true,
};

if (mongoose.connection.readyState === 0) {
  mongoose.connect(uri, clientOptions).catch(err => {
    console.error('MongoDB connection failed:', err);
  });
}

export const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


