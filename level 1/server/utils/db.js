// import mongoose from "mongoose";
// import "dotenv/config";

// const db = () => {
//   mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => {
//       console.log("mongodb connected😎...");
//     })
//     .catch(() => console.log("error in connecting to mongodb..."));
// };

// export default db;
const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected 😎...");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err.message);
    });
};

module.exports = db;
