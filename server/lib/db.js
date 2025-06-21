import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    //const conn = await mongoose.connect(process.env.DATABASE_URL||'mongodb://localhost:27017');
    mongoose
      .connect(process.env.DATABASE_URL||"mongodb://localhost:27017/hello", {
        useNewUrlParser: true,
      })
      .then(() => console.log("database connected successfully"))
      // .catch((err) => console.log("error connecting to mongodb", err));
    //console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
