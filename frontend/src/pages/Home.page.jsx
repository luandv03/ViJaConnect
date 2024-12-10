import PostItem from "../components/Post/PostItem";
import PostCreate from "../components/Post/PostCreate";

function Home() {
    const postItem = [
        {
            id: 1,
            avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
            img: "https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg",
            name: "ディン・ヴァン・ルアン",
            date: "2024-12-20",
            description: "これは、文化交流についてのトピックです。ベトナムと日本の間の文化的な違いを探ります。",
        },
        {
            id: 2,
            avatar: "https://ca.slack-edge.com/T02QFU9TCTD-U050YRP1CKD-db63e56c3a98-512",
            img: "https://www.xserver.ne.jp/blog/wp-content/uploads/2020/05/how-to-write-blog-for-beginner-eyecatch.png",
            name: "グエン・ザ・トゥン・ゾオン",
            date: "2024-12-20",
            description: "日本語学習の方法についてのトピックです。初級者向けの学習方法を共有します。",
        },
        {
            id: 3,
            avatar: "https://ca.slack-edge.com/T02QFU9TCTD-U05LS8WME6L-e9f842c7fcee-512",
            img: "https://www.xserver.ne.jp/blog/wp-content/uploads/2024/09/wordpress-xwrite-post-eyecatch.png",
            name: "グエン・ドゥック・フ",
            date: "2024-12-20",
            description: "料理体験のワークショップについてのトピックです。日越の料理を試して学びます。",
        },
    ];

    return (
        <>
            <div>
                <div className="px-8 py-4">
                    <PostCreate />
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
