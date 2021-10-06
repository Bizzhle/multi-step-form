// const path = require("path");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.Port || 3030;

const mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1:27017/form-user";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", function () {
    console.log("connection has been made");
  })
  .on("error", function (err) {
    console.log("error is:", err);
  });

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("<h2>This is from index.js file</h2>");
  console.log("get request");
});

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
