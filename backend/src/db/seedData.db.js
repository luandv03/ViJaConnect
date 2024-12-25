import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

const DB_URL = process.env.DB_URL;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const seedRoles = async () => {
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

    console.log("Seeding data...");

    const roles = [{ name: "Staff" }, { name: "Manager" }, { name: "Admin" }];

    try {
        await Role.deleteMany({});
        const insertedRoles = await Role.insertMany(roles);
        console.log("Roles seeded successfully");

        const users = [
            {
                name: "グエン・ザ・トゥン・ゾオン",
                email: "duong.gt@vijaconnect.com",
                phone_number: "0912345678",
                password: "luandeptrai",
                display_name: "Duong Gio Tai",
                department: "IT",
                address: "123 Main St",
                company_role: "Developer",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
                role_id: insertedRoles[0]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: false,
                    language: "jap",
                },
                contacts: [],
                point: 50,
            },
            {
                name: "ホアン・ドゥック・ザ・フン",
                email: "hunghdg@vijaconnect.com",
                phone_number: "0867888888",
                password: "luandeptrai",
                display_name: "ホアン・ドゥック・ザ・フン",
                department: "IT",
                address: "123 Main St",
                company_role: "Developer",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f9bac0669c9.",
                role_id: insertedRoles[1]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: false,
                    language: "jap",
                },
                contacts: [],
                point: 50,
            },
            {
                name: "ディン・ヴァン・ルアン",
                email: "luan.dv@vijaconnect.com",
                phone_number: "0867888888",
                password: "luandeptrai",
                display_name: "ディン・ヴァン・ルアン",
                department: "IT",
                address: "123 Main St",
                company_role: "Developer",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
                role_id: insertedRoles[2]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: false,
                    language: "jap",
                },
                contacts: [],
                point: 100,
            },
        ];

        await User.deleteMany({});
        await User.insertMany(users);
        console.log("Users seeded successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedRoles();
