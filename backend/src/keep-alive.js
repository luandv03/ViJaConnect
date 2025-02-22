import cron from "node-cron";
import axios from "axios";

const URL = "https://vijaconnect.onrender.com";

cron.schedule("* * * * *", async () => {
    try {
        console.log("🕒 Đang ping server Render...");
        await axios.get(URL);
    } catch (error) {
        console.error("❌ Lỗi ping server:", error.message);
    }
});

console.log("🚀 Cron Job Keep-Alive đã khởi chạy!");
