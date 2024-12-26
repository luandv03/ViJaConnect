import PostItem from "../components/Post/PostItem";
import PostCreate from "../components/Post/PostCreate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts, getPostsByTopicId } from "../services/post.service";

function Home() {
    const { topicId } = useParams();
    const [postItem, setPostItem] = useState([]);
    console.log(topicId);
    useEffect(() => {
        if (topicId === undefined) {
            getPosts().then((data) => setPostItem(data));
            return;
        }
        getPostsByTopicId(topicId).then((data) => setPostItem(data));
    }, [topicId]);

    return (
        <>
            <div>
                <div className="px-8 py-4">
                    <PostCreate />
                    <div>
                        {Array.isArray(postItem) && postItem.length > 0 ? (
                            postItem.map((item) => (
                                <PostItem key={item._id} post={item} />
                            ))
                        ) : (
                            <div className="text-gray-500 text-center">投稿が見つかりません</div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;
