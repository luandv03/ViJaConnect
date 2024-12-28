import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { formatDate } from "../../helpers/formatDate";

import { getPostByAuthor, deletePost } from "../../services/post.service";

function PostTab({ profile }) {
    const [posts, setPosts] = useState([]);

    const handleDeletePost = async (postId) => {
        try {
            const res = await deletePost(postId);

            if (res.status === 200) {
                setPosts(posts.filter((post) => post._id !== postId));

                toast.success("ポストを削除しました");
            }
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    useEffect(() => {
        const handleGetPosts = async () => {
            try {
                const res = await getPostByAuthor(profile?._id);
                setPosts(res);
            } catch (error) {
                console.error("Failed to get posts", error);
            }
        };

        handleGetPosts();
    }, [profile?._id]);

    return (
        <div className="space-y-4">
            {posts.length > 0 ? (
                posts?.map((post, key) => (
                    <div className="p-4 flex items-center space-x-4" key={key}>
                        <div className="bg-alice-blue p-5 rounded-lg mb-5">
                            <div className="flex space-x-5 mb-4">
                                <div className="flex flex-col justify-center">
                                    <div>
                                        <span className="font-medium">
                                            {formatDate(post?.date)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 font-bold text-blue-400">
                                {post?.title}
                            </div>
                            <Link to={`/post/${post?._id}`}>
                                <div className="mb-5">
                                    <img
                                        src={post?.image_link}
                                        alt="Post avatar"
                                        className="w-full object-cover"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div>
                            <button
                                className="w-9 h-9 bg-alice-blue flex justify-center items-center rounded-full hover:bg-gray-400"
                                onClick={() => handleDeletePost(post?._id)}
                            >
                                <IconTrash />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div>ポストがありません</div>
            )}
        </div>
    );
}

PostTab.propTypes = {
    profile: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default PostTab;
