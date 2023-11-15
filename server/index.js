const express = require("express");
const PORT = 2000;
const db = require("./models");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json());


app.get("/api", (req, res) => {
  res.send("this is my API");
});

const { userRouter, productRouter } = require("./router");
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true })
  console.log(`server running on port : ${PORT}`);
});
