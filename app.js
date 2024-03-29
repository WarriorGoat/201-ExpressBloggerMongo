//Standard Libraries
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config({ path: "./config.env" });

const { mongoConnect } = require("./mongo.js");
mongoConnect();

//setup router for each set of routes
const indexRouter = require("./routes/");
const blogsRouter = require("./routes/blogs");

//instantiate teh actual express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//associate libraries with the app
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //for static files (http, png, css, etc.)

//binds (associates) the routers to routes
app.use("/", indexRouter);
app.use("/blogs", blogsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.listen(port, () => {
// 	console.log(`ExpressBlogger app listening on port ${port}`)
// })

module.exports = app;
