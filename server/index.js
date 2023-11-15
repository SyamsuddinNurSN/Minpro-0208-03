const express = require("express");
const PORT = 2000;
const db = require("./models");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("./public"));

app.get("/api", (req, res) => {
  res.send("this is my API");
});

const { userRouter, transactionRouter } = require("./router");
app.use("/users", userRouter);
app.use("/transactions", transactionRouter)

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true })
  console.log(`server running on port : ${PORT}`);
});
