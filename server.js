const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const cardRoute = require("./routes/card");

app.use("/api/card", cardRoute);

//setting up mongoose
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
require("dotenv/config");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

//setting up PORTS
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log("server is up and running at port number " + PORT)
);
