const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Enhanced Database Configuration
 *
 * MongoDB connection setup with connection pooling and error handling
 */

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fusion_cars';

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    };

    const connection = await mongoose.connect(mongoURI, options);

    console.log('✅ MongoDB Connected Successfully');
    console.log(`📍 Database: ${connection.connection.name}`);
    console.log(`🔗 Host: ${connection.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.error('   Please ensure MongoDB is running and the connection string is correct');
    console.error('   Continuing with server startup anyway...');
    // Don't exit - allow server to start even if DB connection fails
    // The app can still serve other endpoints
    return null;
  }
};

module.exports = connectDB;
