import fs from "fs/promises";
import path from "path";

export default async function initModels() {
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

    return models;
}
