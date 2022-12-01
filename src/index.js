const env = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT ?? 5555;
// router
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
// db
const connectDb = require("./db/connection");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/products", productRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
  connectDb();
});
