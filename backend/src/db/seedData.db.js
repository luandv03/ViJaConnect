import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";
import { Topic } from "../models/topic.model.js";
import { Post } from "../models/post.model.js";
import { Event } from "../models/event.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

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
                _id: "676c5ca80137d9539987bc30",
                name: "グエン・ザ・トゥン・ゾオン",
                email: "duong.gt@vijaconnect.com",
                phone_number: "0912345678",
                password: "luandeptrai",
                display_name: "グエン・ザ・トゥン・ゾオン",
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
                name: "管理者",
                email: "admin@vijaconnect.com",
                phone_number: "0867888888",
                password: "luandeptrai",
                display_name: "管理者",
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
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
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
                _id: "676c5ca80137d9539987bc35",
                name: "レ・バー・チョン",
                email: "trong.lb@vijaconnect.com",
                phone_number: "0845123456",
                password: "luandeptrai",
                display_name: "レ・バー・チョン",
                department: "IT",
                address: "456 Elm St",
                company_role: "Tester",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/630e08f3c6416.",
                role_id: insertedRoles[0]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: true,
                    language: "jap",
                },
                contacts: [],
                point: 70,
            },
            {
                _id: "676c5ca80137d9539987bc36",
                name: "ド・ヴァン・フォン",
                email: "phong.dv@vijaconnect.com",
                phone_number: "0934765432",
                password: "luandeptrai",
                display_name: "ド・ヴァン・フォン",
                department: "HR",
                address: "789 Oak St",
                company_role: "HR Manager",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/64a7e2cfcab63.",
                role_id: insertedRoles[0]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: false,
                    dark_mode: false,
                    language: "eng",
                },
                contacts: [],
                point: 85,
            },
            {
                _id: "676c5ca80137d9539987bc37",
                name: "グエン・ディン・ヒエウ",
                email: "hieu.nd@vijaconnect.com",
                phone_number: "0923456789",
                password: "luandeptrai",
                display_name: "グエン・ディン・ヒエウ",
                department: "Finance",
                address: "101 Pine St",
                company_role: "Accountant",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/6162e78d13086.",
                role_id: insertedRoles[0]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: false,
                    language: "jap",
                },
                contacts: [],
                point: 90,
            },
            {
                _id: "676c5ca80137d9539987bc38",
                name: "ゾオン・チュン・キエン",
                email: "kien.dt@vijaconnect.com",
                phone_number: "0987654321",
                password: "luandeptrai",
                display_name: "ゾオン・チュン・キエン",
                department: "IT",
                address: "123 Cherry St",
                company_role: "Designer",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
                role_id: insertedRoles[0]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: true,
                    language: "eng",
                },
                contacts: [],
                point: 60,
            },
            {
                _id: "676c5ca80137d9539987bc39",
                name: "ディン・ヴァン・ルアン",
                email: "luan.dv@vijaconnect.com",
                phone_number: "0951234567",
                password: "luandeptrai",
                display_name: "ディン・ヴァン・ルアン",
                department: "Marketing",
                address: "456 Maple St",
                company_role: "SEO Specialist",
                avatar_link:
                    "https://schooler.sun-asterisk.com/storage/images/avatar/student/63083b4681ab9.",
                role_id: insertedRoles[1]._id,
                shared_posts: [],
                liked_posts: [],
                settings: {
                    notification: true,
                    dark_mode: false,
                    language: "eng",
                },
                contacts: [],
                point: 75,
            },
        ];

        await User.deleteMany({});
        await User.insertMany(users);
        console.log("Users seeded successfully");

        const topics = [
            {
                _id: "676c5b3cf2eccfd783d9eb69",
                title: "文化交流: ベトナムと日本の文化を学ぶ",
                desc: "最新の技術トレンドと革新についての議論。",
                author_id: "676c5ca80137d9539987bc34",
            }, // Technology
            {
                _id: "676c5b3cf2eccfd783d9eb6a",
                title: "日越料理体験: 食で繋がる",
                desc: "健康的な生活を送るためのヒントやリソース。",
                author_id: "676c5ca80137d9539987bc34",
            }, // Health
            {
                _id: "676c5b3cf2eccfd783d9eb6b",
                title: "日本語とベトナム語の学び合い",
                desc: "現代教育の方法と実践を探る。",
                author_id: "676c5ca80137d9539987bc34",
            }, // Education
            {
                _id: "676c5b3cf2eccfd783d9eb6c",
                title: "留学生のリアルな体験談",
                desc: "旅行愛好家のための冒険とガイド。",
                author_id: "676c5ca80137d9539987bc34",
            }, // Travel
            {
                _id: "676c5b3cf2eccfd783d9eb6d",
                title: "日越共同プロジェクトの成功事例",
                desc: "アクティブに過ごし、フィットネス目標を達成するためのアドバイス。",
                author_id: "676c5ca80137d9539987bc34",
            }, // Fitness
            {
                _id: "676c5b3cf2eccfd783d9eb6e",
                title: "金融",
                desc: "財務管理や賢い投資について学ぶ。",
                author_id: "676c5ca80137d9539987bc33",
            }, // Finance
            {
                _id: "676c5b3cf2eccfd783d9eb6f",
                title: "料理",
                desc: "食べ物愛好家のためのおいしいレシピと料理のヒント。",
                author_id: "676c5ca80137d9539987bc33",
            }, // Food
            {
                _id: "676c5b3cf2eccfd783d9eb70",
                title: "ミニマリズム",
                desc: "より意味のある人生のためにシンプルさを取り入れる。",
                author_id: "676c5ca80137d9539987bc34",
            }, // Minimalism
            {
                _id: "676c5b3cf2eccfd783d9eb71",
                title: "AIと機械学習",
                desc: "人工知能と機械学習の未来。",
                author_id: "676c5ca80137d9539987bc34",
            }, // AI & ML
        ];

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

        const events = [
            {
                title: "テクノロジー展示会 2024",
                desc: "最新の技術を紹介する展示会。",
                location: "東京ビッグサイト",
                date: new Date("2025-01-15T09:00:00Z"),
                banner_link:
                    "https://meetsvietnam.vietnamairlines.com/wp-content/uploads/2024/07/448504984_870598721767452_1562326102109704185_n.jpg",
                author_id: "676c5ca80137d9539987bc30", // グエン・ザ・トゥン・ゾオン
                joined_users: [
                    "676c5ca80137d9539987bc31",
                    "676c5ca80137d9539987bc33",
                ],
            },
            {
                title: "AIと未来のセミナー",
                desc: "AI技術の活用について議論するセミナー。",
                location: "大阪市立大学",
                date: new Date("2025-01-10T14:00:00Z"),
                banner_link:
                    "https://d19ri4mdy82u9u.cloudfront.net/images/64abca6c03c3da4c3afee054/UJSXbBSAK1ZFltyiaC2M.jpg",
                author_id: "676c5ca80137d9539987bc31", // ホアン・ドゥック・ザ・フン
                joined_users: [
                    "676c5ca80137d9539987bc30",
                    "676c5ca80137d9539987bc34",
                ],
            },
            {
                title: "デザイン思考ワークショップ",
                desc: "創造的な問題解決を学ぶワークショップ。",
                location: "名古屋クリエイティブセンター",
                date: new Date("2025-01-05T10:00:00Z"),
                banner_link:
                    "https://www.tsttourist.com/vnt_upload/news/09_2023/thumbs/(600x400)_TSTtourist_van_hoa_am_thuc_Nhat_Ban.jpg",
                author_id: "676c5ca80137d9539987bc32", // ディン・ヴァン・ルアン
                joined_users: [
                    "676c5ca80137d9539987bc30",
                    "676c5ca80137d9539987bc33",
                ],
            },
            {
                title: "プログラミングコンテスト",
                desc: "若手エンジニア向けの競技プログラミングイベント。",
                location: "福岡ハッカースペース",
                date: new Date("2024-01-20T13:00:00Z"),
                banner_link:
                    "https://wkvetter.com/wp-content/uploads/41th-Hanoi-Ongakutai-Naoko-1024x1024.jpg",
                author_id: "676c5ca80137d9539987bc33", // チュー・ディン・ヒエン
                joined_users: [
                    "676c5ca80137d9539987bc30",
                    "676c5ca80137d9539987bc32",
                ],
            },
            {
                title: "ゲーム開発者会議",
                desc: "ゲーム業界の最新トレンドを共有する会議。",
                location: "札幌コンベンションセンター",
                date: new Date("2024-01-25T09:30:00Z"),
                banner_link: "https://www.oaff.jp/2018/img/report/15_c12_1.jpg",
                author_id: "676c5ca80137d9539987bc34", // グエン・ドゥック・フ
                joined_users: [
                    "676c5ca80137d9539987bc31",
                    "676c5ca80137d9539987bc32",
                ],
            },
            {
                title: "IoTワークショップ",
                desc: "IoTデバイスの設計と実装を学ぶ。",
                location: "横浜技術センター",
                date: new Date("2024-06-10T15:00:00Z"),
                banner_link: "https://i.imgur.com/Q9BQZ8h.jpg",
                author_id: "676c5ca80137d9539987bc30",
                joined_users: [
                    "676c5ca80137d9539987bc31",
                    "676c5ca80137d9539987bc34",
                ],
            },
            {
                title: "データサイエンスセミナー",
                desc: "データ分析とAIの統合についての講義。",
                location: "京都大学",
                date: new Date("2024-07-08T10:00:00Z"),
                banner_link: "https://i.imgur.com/9WEPzOA.jpg",
                author_id: "676c5ca80137d9539987bc31",
                joined_users: [
                    "676c5ca80137d9539987bc32",
                    "676c5ca80137d9539987bc33",
                ],
            },
            {
                title: "クラウドコンピューティング展",
                desc: "クラウド技術の革新を紹介する展示会。",
                location: "広島ITセンター",
                date: new Date("2024-08-18T11:00:00Z"),
                banner_link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavKhWpCC7VynBSNCby5A4b0qcPn36iLOeNw&s",
                author_id: "676c5ca80137d9539987bc32",
                joined_users: [
                    "676c5ca80137d9539987bc30",
                    "676c5ca80137d9539987bc34",
                ],
            },
            {
                title: "VRとAR体験イベント",
                desc: "最新のVR/AR技術を体験できるイベント。",
                location: "神戸メディアホール",
                date: new Date("2024-09-12T12:00:00Z"),
                banner_link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHktETJQ6hnTu6ijNcWPkaCfpR3VjWaN1_nw&s",
                author_id: "676c5ca80137d9539987bc33",
                joined_users: [
                    "676c5ca80137d9539987bc31",
                    "676c5ca80137d9539987bc34",
                ],
            },
            {
                title: "サイバーセキュリティ会議",
                desc: "情報セキュリティの最新動向を議論する会議。",
                location: "長崎テクノロジーパーク",
                date: new Date("2024-10-05T14:00:00Z"),
                banner_link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_830yAuudnpnX_MFFA0WMfBrte1d9YXHGjQ&s",
                author_id: "676c5ca80137d9539987bc34",
                joined_users: [
                    "676c5ca80137d9539987bc30",
                    "676c5ca80137d9539987bc32",
                ],
            },
        ];

        await Event.deleteMany({});
        await Event.insertMany(events);

        const chats = [
            {
                _id: "64cfcff00137d9539987bc00",
                chatName: "エンジニアの会話",
                isGroupChat: true,
                users: [
                    "676c5ca80137d9539987bc30",
                    "676c5ca80137d9539987bc31",
                    "676c5ca80137d9539987bc32",
                ],
                latestMessage: null,
                groupAdmin: "676c5ca80137d9539987bc30",
            },
            {
                _id: "64cfcff00137d9539987bc01",
                chatName: "プログラミング初心者",
                isGroupChat: true,
                users: ["676c5ca80137d9539987bc33", "676c5ca80137d9539987bc34"],
                latestMessage: null,
                groupAdmin: "676c5ca80137d9539987bc33",
            },
            {
                _id: "64cfcff00137d9539987bc02",
                chatName: "ダイレクトメッセージ",
                isGroupChat: false,
                users: ["676c5ca80137d9539987bc30", "676c5ca80137d9539987bc31"],
                latestMessage: null,
            },
            {
                _id: "64cfcff00137d9539987bc03",
                chatName: "テストプロジェクト",
                isGroupChat: true,
                users: [
                    "676c5ca80137d9539987bc32",
                    "676c5ca80137d9539987bc34",
                    "676c5ca80137d9539987bc33",
                ],
                latestMessage: null,
                groupAdmin: "676c5ca80137d9539987bc34",
            },
            {
                _id: "64cfcff00137d9539987bc04",
                chatName: "日常の話",
                isGroupChat: false,
                users: ["676c5ca80137d9539987bc30", "676c5ca80137d9539987bc34"],
                latestMessage: null,
            },
        ];

        await Chat.deleteMany({});
        await Chat.insertMany(chats);
        console.log("Chats seeded successfully");

        const messages = [
            {
                sender: "676c5ca80137d9539987bc30",
                content: "こんにちは！元気ですか？", // Xin chào! Bạn khỏe không?
                chat: "64cfcff00137d9539987bc00",
            },
            {
                sender: "676c5ca80137d9539987bc31",
                content: "はい、元気です。あなたは？", // Vâng, tôi khỏe. Còn bạn?
                chat: "64cfcff00137d9539987bc00",
            },
            {
                sender: "676c5ca80137d9539987bc32",
                content: "このプロジェクトの進捗はどうですか？", // Tiến độ dự án này thế nào?
                chat: "64cfcff00137d9539987bc00",
            },
            {
                sender: "676c5ca80137d9539987bc33",
                content: "順調に進んでいます。", // Tiến triển tốt.
                chat: "64cfcff00137d9539987bc01",
            },
            {
                sender: "676c5ca80137d9539987bc34",
                content: "新しいアイデアがありますか？", // Có ý tưởng mới nào không?
                chat: "64cfcff00137d9539987bc01",
            },
            {
                sender: "676c5ca80137d9539987bc30",
                content: "そうですね、いくつか考えています。", // Đúng vậy, tôi có vài ý tưởng.
                chat: "64cfcff00137d9539987bc02",
            },
            {
                sender: "676c5ca80137d9539987bc31",
                content: "コードレビューは終わりましたか？", // Bạn đã xong code review chưa?
                chat: "64cfcff00137d9539987bc02",
            },
            {
                sender: "676c5ca80137d9539987bc32",
                content: "いいえ、まだです。", // Chưa, vẫn chưa.
                chat: "64cfcff00137d9539987bc03",
            },
            {
                sender: "676c5ca80137d9539987bc33",
                content: "締め切りまでに間に合いますか？", // Có kịp deadline không?
                chat: "64cfcff00137d9539987bc03",
            },
            {
                sender: "676c5ca80137d9539987bc34",
                content: "がんばります！", // Tôi sẽ cố gắng!
                chat: "64cfcff00137d9539987bc04",
            },
            // Tiếp tục thêm...
        ];

        // Phần dưới thêm 90 message nữa
        for (let i = 20; i <= 109; i++) {
            const randomChat = [
                "64cfcff00137d9539987bc00",
                "64cfcff00137d9539987bc01",
                "64cfcff00137d9539987bc02",
                "64cfcff00137d9539987bc03",
                "64cfcff00137d9539987bc04",
            ];
            const randomUser = [
                "676c5ca80137d9539987bc30",
                "676c5ca80137d9539987bc31",
                "676c5ca80137d9539987bc32",
                "676c5ca80137d9539987bc33",
                "676c5ca80137d9539987bc34",
            ];
            const randomContent = [
                "了解しました！", // Đã hiểu!
                "それは良いアイデアですね。", // Đó là một ý tưởng hay.
                "また明日話しましょう。", // Hãy nói chuyện vào ngày mai.
                "新しいタスクがありますか？", // Có nhiệm vụ mới nào không?
                "少し手伝ってもらえますか？", // Bạn có thể giúp tôi một chút không?
                "どのように進めたらいいですか？", // Tôi nên tiếp tục như thế nào?
                "ドキュメントを確認しましたか？", // Bạn đã kiểm tra tài liệu chưa?
                "すぐに取り掛かります。", // Tôi sẽ bắt đầu ngay.
                "コードにバグがありました。", // Có lỗi trong code.
                "解決策を見つけました！", // Tôi đã tìm ra giải pháp!
            ];
            messages.push({
                sender: randomUser[
                    Math.floor(Math.random() * randomUser.length)
                ],
                content:
                    randomContent[
                        Math.floor(Math.random() * randomContent.length)
                    ],
                chat: randomChat[Math.floor(Math.random() * randomChat.length)],
            });
        }

        await Message.deleteMany({});
        await Message.insertMany(messages);
        console.log("Messages seeded successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedRoles();
