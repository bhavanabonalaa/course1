const mongoose = require("mongoose");

// Cache connection across warm serverless invocations
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
      .then(m => m)
      .catch(err => {
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB connection error:", err.message);
    throw err;
  }

  return cached.conn;
};

module.exports = connectDB;