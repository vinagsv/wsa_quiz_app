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
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB Connection
db();

// View engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Main route
app.use("/api/v1/question", questionRouter);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// General error handler
app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.ENVIRONMENT === "DEVELOPMENT";
  res.status(error.status || 500);
  res.render("error");
});

// app.use("/api/v1/question", questionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ☁️`);
});
