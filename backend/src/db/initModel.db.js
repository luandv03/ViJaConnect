import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

import fs from "fs/promises";
import path from "path";
async function initModels() {
    // Connect to db
    mongoose
        .connect(DB_URL, options)
        .then(() => {
            console.log("Mongoose is connected");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });

    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connected to DB!"));

    console.log("🔍 Loading models...");

    const models = {};
    const modelsDir = path.resolve("./src/models");

    // 🔍 Đọc tất cả các file trong thư mục models
    const files = await fs.readdir(modelsDir);
    for (const file of files) {
        if (file.endsWith(".model.js")) {
            const modelName = file.split(".")[0];
            const modelPath = path.resolve(modelsDir, file);

            // 🛠️ Sử dụng chuẩn `file://` cho đường dẫn
            const module = await import(`file://${modelPath}`);
            models[modelName] = module.default;
        }
    }

    dbConnection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
    });

    dbConnection.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log(
                "Mongoose connection is disconnected" +
                    " due to application termination"
            );
            process.exit(0);
        });
    }); // Gracefully close the connection when the application exits

    console.log("📦 Models loaded:", Object.keys(models));
}

// 🛠️ Tự động load models
initModels();
