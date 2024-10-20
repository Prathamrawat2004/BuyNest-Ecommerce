import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const MongoDbURI = "mongodb+srv://prathamrawat2004:PrathamRawat@cluster0.o8jgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
import usersRoute from "./Routes/Users.route.js";
import cors from "cors";
import stripe from "./Routes/Stripe.js";



const app = express();

dotenv.config();
const Port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173', 'https://frabjous-treacle-d70bd6.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no 'origin' (like curl or Postman) or requests from allowed origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
};


// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// connecting to db
mongoose.connect(MongoDbURI, {
}).then(()=>{
    console.log("Connected to database");
}).catch(()=>{
    console.log("Not connected");
});

// routes
app.use("/User",usersRoute);
app.use("/Stripe",stripe);



app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
})
