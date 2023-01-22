const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const announceRoute = require("./routes/announceRoute");
const morgan = require("morgan");
const connectDB = require("./db/db");
require("dotenv").config();
connectDB();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: `http://localhost:3000` }));

app.use("/api/auth", authRoutes);
app.use("/api/announce", announceRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

const port = 8000;
app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
