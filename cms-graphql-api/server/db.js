// import mongoose from "mongoose";

// let cached = null;

// export async function connectDB() {
//   if (cached) return cached;

//   if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI missing");
//   }

//   cached = await mongoose.connect(process.env.MONGO_URI, {
//     bufferCommands: false,
//   });

//   console.log("✅ MongoDB connected");
//   return cached;
// }

import mongoose from "mongoose";

let cachedConnection = null;

export async function connectDB() {
  if (cachedConnection) return cachedConnection;

  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    cachedConnection = conn;
    console.log("✅ MongoDB connected");
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
