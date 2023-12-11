import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";


const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connect to backend");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})

//middlewares
app.use(express.json())

app.use("/api/auth", authRoute);
//app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
//app.use("/api/rooms", roomsRoute);


app.listen(8800, () => {
  connect();
  console.log("server is running on port 8800");
});
