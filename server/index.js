const express = require("express");
const PORT = 2000;
const db = require("./models");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static("./public"));

// app.get('/cors', (req, res) => {
//   res.send('This has CORS enabled 🎈')
// })

app.get("/api", (req, res) => {
  res.send("this is my API");
});


const {
  userRouter,
  productRouter,
  categoryRouter,
  transactionRouter,
  salesReportRouter,
} = require("./router");

app.use("/users", userRouter);
app.use("/transactions", transactionRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/sales-report", salesReportRouter)

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true })
  console.log(`server running on port : ${PORT}`);
});
