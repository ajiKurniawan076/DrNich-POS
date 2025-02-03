import mongoose from "mongoose";

const dbConfig = async () => {
  console.log("MONGODB CONNECTING...  ");
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB Connection failed", error.message);
    process.exit(1);
  }
};

export default dbConfig;
