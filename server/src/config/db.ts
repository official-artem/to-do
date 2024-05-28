import mongoose from 'mongoose';

const connectDB = async () => {
  console.log(process.env.MONGO_DB_URI)
  await mongoose.connect(process.env.MONGO_DB_URI as string);

  console.log('MongoDB connected');
}

export default connectDB;