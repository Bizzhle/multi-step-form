const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/form-user", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", function () {
    console.log("connection has been made");
  })
  .on("error", function (err) {
    console.log("error is:", err);
  });
