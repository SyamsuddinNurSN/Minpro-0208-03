const express = require("express");
const PORT = 2000;

const db = require("./models");

const app = express();
app.use(express.json());


app.get("/api", (req, res) => {
  res.send("this is my API");
});

// const { userRouter } = require("./router");
app.use("/users", userRouter);

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true })
  console.log(`server running on port : ${PORT}`);
});
