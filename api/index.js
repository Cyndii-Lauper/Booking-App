import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

//Connect database
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

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,res,resp,next) =>{
  //console.log("hi im a middleware!")
  //resp.send("Hello from middleware")
  //next()
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return resp.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(8800, () => {
  connect();
  console.log("server is running on port 8800");
});
