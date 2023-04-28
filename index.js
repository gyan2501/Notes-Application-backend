const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");

const { auth } = require("./middleware/Auth.middleware");
const { noteRouter } = require("./routes/Notes.routes");
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(express.json());

app.use(cors())

app.use("/users", userRouter);

//protected Route
app.use(auth) // auth middleware

// Example
app.get("/movie", (req, res) => {
  res.status(200).send(" Showing Movie Data");
});

app.get("/series", (req, res) => {
  res.status(200).send("Showing series Data");
});


//Notes Route
app.use("/notes",noteRouter)



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB!");
  } catch (error) {
    console.log(error);
    console.log("not able to connect");
  }
  console.log(`Server running on port ${process.env.port}`);
});
