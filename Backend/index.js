import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const MongoDbURI =
  "mongodb+srv://prathamrawat2004:PrathamRawat@cluster0.o8jgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
import usersRoute from "./Routes/Users.route.js";
import cors from "cors";
import stripe from "./Routes/Stripe.js";

const app = express();

dotenv.config();
const Port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Optional: Use if you need cookies/auth headers
  })
);

// middlewares

app.use(express.json());

// connecting to db
mongoose
  .connect(MongoDbURI, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Not connected");
  });

// routes
app.use("/User", usersRoute);
app.use("/Stripe", stripe);

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
