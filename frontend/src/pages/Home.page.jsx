import { IconCirclePlus } from "@tabler/icons-react";

import PostItem from "../components/Post/PostItem";
import { Link } from "react-router-dom";

function Home() {
    const postItem = [
        {
            id: 1,
            avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
            img: "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
            name: "ディン・ヴァン・ルアン",
            date: "2024-12-20",
        },
        {
            id: 2,
            avatar: "https://ca.slack-edge.com/T02QFU9TCTD-U050YRP1CKD-db63e56c3a98-512",
            img: "https://www.xserver.ne.jp/blog/wp-content/uploads/2020/05/how-to-write-blog-for-beginner-eyecatch.png",
            name: "グエン・ザ・トゥン・ゾオン",
            date: "2024-12-20",
        },
        {
            id: 3,
            avatar: "https://ca.slack-edge.com/T02QFU9TCTD-U05LS8WME6L-e9f842c7fcee-512",
            img: "https://www.xserver.ne.jp/blog/wp-content/uploads/2024/09/wordpress-xwrite-post-eyecatch.png",
            name: "グエン・ドゥック・フ",
            date: "2024-12-20",
        },
    ];
    return (
        <>
            <div>
                <div className="px-8 py-4">
                    <Link
                        to="/test"
                        className="p-4 flex items-center space-x-10 bg-alice-blue rounded-lg mb-4 hover:text-gray-400"
                    >
                        <IconCirclePlus stroke={2} />
                        <div>新しいポストを作成する</div>
                    </Link>
                    <div>
                        {postItem.map((item) => (
                            <PostItem key={item.id} post={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
