const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const quizRouter = require("./routes/quizRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

//express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//handle pug engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//db connection
db();

//routes middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/quiz", quizRouter);

//error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.ENVIRONMENT === "DEVELOPMENT" ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render("error");
});

//connect server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
