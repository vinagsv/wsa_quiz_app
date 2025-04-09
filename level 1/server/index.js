// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import db from "./utils/db.js";
// import questionRouter from "./routes/questionRoutes.js";

const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
require("dotenv").config();
const questionRouter = require("./routes/questionRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

//express Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//DB connection
db();
app.use("/api/v1/question", questionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ☁️`);
});
