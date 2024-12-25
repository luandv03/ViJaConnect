import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";
import { Topic } from "../models/topic.model.js";
import { Post } from "../models/post.model.js";

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

    const topics = [
        {
            _id: "676c5b3cf2eccfd783d9eb69",
            title: "技術",
            desc: "最新の技術トレンドと革新についての議論。",
        }, // Technology
        {
            _id: "676c5b3cf2eccfd783d9eb6a",
            title: "健康",
            desc: "健康的な生活を送るためのヒントやリソース。",
        }, // Health
        {
            _id: "676c5b3cf2eccfd783d9eb6b",
            title: "教育",
            desc: "現代教育の方法と実践を探る。",
        }, // Education
        {
            _id: "676c5b3cf2eccfd783d9eb6c",
            title: "旅行",
            desc: "旅行愛好家のための冒険とガイド。",
        }, // Travel
        {
            _id: "676c5b3cf2eccfd783d9eb6d",
            title: "フィットネス",
            desc: "アクティブに過ごし、フィットネス目標を達成するためのアドバイス。",
        }, // Fitness
        {
            _id: "676c5b3cf2eccfd783d9eb6e",
            title: "金融",
            desc: "財務管理や賢い投資について学ぶ。",
        }, // Finance
        {
            _id: "676c5b3cf2eccfd783d9eb6f",
            title: "料理",
            desc: "食べ物愛好家のためのおいしいレシピと料理のヒント。",
        }, // Food
        {
            _id: "676c5b3cf2eccfd783d9eb70",
            title: "ミニマリズム",
            desc: "より意味のある人生のためにシンプルさを取り入れる。",
        }, // Minimalism
        {
            _id: "676c5b3cf2eccfd783d9eb71",
            title: "AIと機械学習",
            desc: "人工知能と機械学習の未来。",
        }, // AI & ML
    ];

    try {
        await Role.deleteMany({});
        const insertedRoles = await Role.insertMany(roles);
        console.log("Roles seeded successfully");

        const users = [
            {
                _id: "676c5ca80137d9539987bc30",
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
                _id: "676c5ca80137d9539987bc31",
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
                _id: "676c5ca80137d9539987bc32",
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
            {
                _id: "676c5ca80137d9539987bc33",
                name: "チュー・ディン・ヒエン",
                email: "hien.cv@vijaconnect.com",
                phone_number: "0867888888",
                password: "luandeptrai",
                display_name: "チュー・ディン・ヒエン",
                department: "IT",
                address: "123 Main St",
                company_role: "Developer",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
                role_id: insertedRoles[2]._id,
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
                _id: "676c5ca80137d9539987bc34",
                name: "グエン・ドゥック・フ",
                email: "phu.nd@vijaconnect.com",
                phone_number: "0867888888",
                password: "luandeptrai",
                display_name: "グエン・ドゥック・フ",
                department: "IT",
                address: "123 Main St",
                company_role: "Developer",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
                role_id: insertedRoles[2]._id,
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
        ];

        await User.deleteMany({});
        await User.insertMany(users);
        console.log("Users seeded successfully");

        await Topic.deleteMany({});
        await Topic.insertMany(topics);
        console.log("Topics seeded successfully");

        const posts = [
            {
                title: "技術革新の未来",
                author_id: "676c5ca80137d9539987bc30", // グエン・ザ・トゥン・ゾオン
                topic_id: "676c5b3cf2eccfd783d9eb69", // 技術
                likes: 15,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "最新の技術革新がどのように私たちの生活を変えるかについて。",
            },
            {
                title: "健康的な食生活",
                author_id: "676c5ca80137d9539987bc31", // ホアン・ドゥック・ザ・フン
                topic_id: "676c5b3cf2eccfd783d9eb6a", // 健康
                likes: 8,
                image_link:
                    "https://www.xserver.ne.jp/blog/wp-content/uploads/2020/05/how-to-write-blog-for-beginner-eyecatch.png",
                desc: "健康を維持するための毎日の簡単なヒント。",
            },
            {
                title: "教育の現代的な方法",
                author_id: "676c5ca80137d9539987bc33", // チュー・ディン・ヒエン
                topic_id: "676c5b3cf2eccfd783d9eb6b", // 教育
                likes: 10,
                image_link:
                    "https://www.xserver.ne.jp/blog/wp-content/uploads/2024/09/wordpress-xwrite-post-eyecatch.png",
                desc: "現代教育で効果的な方法と戦略。",
            },
            {
                title: "旅行中の体験",
                author_id: "676c5ca80137d9539987bc34", // グエン・ドゥック・フ
                topic_id: "676c5b3cf2eccfd783d9eb6c", // 旅行
                likes: 20,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "世界中の冒険と忘れられない体験について。",
            },
            {
                title: "ミニマリズムの実践",
                author_id: "676c5ca80137d9539987bc30",
                topic_id: "676c5b3cf2eccfd783d9eb70", // ミニマリズム
                likes: 25,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "シンプルさを取り入れることで人生をより充実させる方法。",
            },
            {
                title: "家庭料理の楽しみ",
                author_id: "676c5ca80137d9539987bc31",
                topic_id: "676c5b3cf2eccfd783d9eb6f", // 料理
                likes: 12,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "家族で楽しむためのおいしい家庭料理のレシピ。",
            },
            {
                title: "技術革新が社会に与える影響",
                author_id: "676c5ca80137d9539987bc33",
                topic_id: "676c5b3cf2eccfd783d9eb69",
                likes: 18,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "技術が社会やコミュニティにどのような影響を与えるか。",
            },
            {
                title: "健康維持のためのエクササイズ",
                author_id: "676c5ca80137d9539987bc34",
                topic_id: "676c5b3cf2eccfd783d9eb6a",
                likes: 22,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "簡単にできる健康維持のためのエクササイズ。",
            },
            {
                title: "未来の教育トレンド",
                author_id: "676c5ca80137d9539987bc30",
                topic_id: "676c5b3cf2eccfd783d9eb6b",
                likes: 5,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "教育の未来を形作る可能性のあるトレンドとテクノロジー。",
            },
            {
                title: "旅行の計画を立てる方法",
                author_id: "676c5ca80137d9539987bc31",
                topic_id: "676c5b3cf2eccfd783d9eb6c",
                likes: 30,
                image_link:
                    "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
                desc: "効率的な旅行計画を立てるためのヒント。",
            },
        ];

        await Post.deleteMany({});
        await Post.insertMany(posts);
        console.log("Posts seeded successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedRoles();
