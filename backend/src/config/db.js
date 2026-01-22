import mongoose from "mongoose";
//Database
export async function connectDB(mongoUri) {
  if (!mongoUri) throw new Error("MONGODB_URI lost");
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected:", mongoose.connection.host);
}
