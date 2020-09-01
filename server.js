const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const app = express();
const path = require("path");
// connect data base
connectDB();

//init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

//Define Routes
app.use("/api/employees", require("./routes/api/employees"));
app.use("/api/feedbackrequests", require("./routes/api/requestPool"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/feedback", require("./routes/api/feedback"));

// serve static assets in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is started on port-${PORT}`));
