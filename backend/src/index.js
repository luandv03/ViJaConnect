import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.route.js";
import mongooseConnection from "./db/connect.db.js";
import initModels from "./db/initModel.db.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

// xử lý dữ liệu gửi lên từ Client
app.use(express.json()); // xử lý dữ liệu gửi từ frontend -> backend dưới định dạng json:

// xử lý dữ liệu được gửi lên dưới dạng form HTML (application/x-www-form-url)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

mongooseConnection();

// 🛠️ Tự động load models
const models = initModels();
console.log("📦 Models loaded:", Object.keys(models));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

app.use(express.static("public"));
