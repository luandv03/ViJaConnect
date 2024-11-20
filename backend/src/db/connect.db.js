import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

function mongooseConnection() {
    // Connect to the MongoDB cluster
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

    // // Handling connection events
    // const db = mongoose.connection;

    // db.on("error", (error) => {
    //     console.error("MongoDB connection error:", error);
    // });

    // db.once("open", () => {
    //     console.log("Connected to MongoDB");
    // });

    // db.on("disconnected", () => {
    //     console.log("Disconnected from MongoDB");
    // });

    // // Gracefully close the connection when the application exits
    // process.on("SIGINT", () => {
    //     mongoose.connection.close(() => {
    //         console.log(
    //             "Mongoose connection is disconnected" +
    //                 " due to application termination"
    //         );
    //         process.exit(0);
    //     });
    // });
}

export default mongooseConnection;
