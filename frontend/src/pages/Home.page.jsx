import PostItem from "../components/Post/PostItem";
import PostCreate from "../components/Post/PostCreate";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPosts, getPostsByTopicId, searchPostsByTopicIdAndTitle } from "../services/post.service";

function Home() {
    const { topicId } = useParams(); // Lấy topicId từ URL
    const location = useLocation(); // Lấy query parameters từ URL
    const [postItem, setPostItem] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // Lấy query parameters
        const query = queryParams.get("query"); // Lấy giá trị của param "query"
        setLoading(true);

        // Xử lý API call dựa trên trạng thái
        if (query) {
            // Nếu có param "query", gọi API tìm kiếm
            searchPostsByTopicIdAndTitle(topicId, query)
                .then((data) => setPostItem(data))
                .catch((err) => console.error("Error searching posts:", err))
                .finally(() => setLoading(false));
        } else if (topicId === undefined) {
            // Nếu không có topicId, lấy tất cả posts
            getPosts()
                .then((data) => setPostItem(data))
                .catch((err) => console.error("Error fetching posts:", err))
                .finally(() => setLoading(false));
        } else {
            // Nếu có topicId, lấy posts theo topicId
            getPostsByTopicId(topicId)
                .then((data) => setPostItem(data))
                .catch((err) => console.error("Error fetching posts by topicId:", err))
                .finally(() => setLoading(false));
        }
    }, [topicId, location.search]);

    return (
        <>
            <div>
                <div className="px-8 py-4">
                    <PostCreate setPostItem={setPostItem} />
                    <div>
                        {loading ? (
                            <div className="text-gray-500 text-center">読み込み中...</div>
                        ) : Array.isArray(postItem) && postItem.length > 0 ? (
                            postItem.map((item) => (
                                <PostItem key={item._id} post={item} />
                            ))
                        ) : (
                            <div className="text-gray-500 text-center">
                                投稿が見つかりません
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
