import {
    IconThumbUp,
    IconMessageCircle,
    IconShare3,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { getPost } from "../../services/post.service";
import { formatDate } from "../../helpers/formatDate";

// eslint-disable-next-line react/prop-types
function PostDetail({ inputRef }) {
    const [actionPost, setActionPost] = useState({
        like: {
            active: false,
        },
        comment: {
            active: false,
            commentList: [],
        },
        share: {
            active: false,
        },
    });

    const handleLikePost = () => {
        setActionPost({
            like: {
                active: !actionPost.like.active,
            },
            comment: {
                active: false,
                commentList: [],
            },
            share: {
                active: false,
            },
        });
    };

    const handleCommentPost = () => {
        // eslint-disable-next-line react/prop-types
        inputRef.current.focus();
    };

    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        getPost(postId).then((data) => setPost(data));
    }, [postId]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 rounded-full">
                    <div>
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={post.author?.avatar_link}
                            alt={post.author?.display_name}
                        />
                    </div>
                    <div>
                        <div>
                            <span className="text-lg font-bold">
                                {post.author?.display_name}
                            </span>
                        </div>
                        <div>
                            <span>{post.date ? formatDate(post.date) : "日付が不明です"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <span className="font-bold text-blue-400">{post.title}</span>
            </div>

            <div>
                <img src={post.image_link} alt={post.title} />
            </div>
            <div>
                <p>{post.desc}</p>
            </div>
            <div className="flex space-x-8">
                <div
                    className="flex hover:text-blue-400 cursor-pointer"
                    onClick={() => handleLikePost()}
                >
                    {!actionPost.like.active ? (
                        <div>
                            <IconThumbUp />
                        </div>
                    ) : (
                        <div className="text-blue-400">
                            <IconThumbUpFilled />
                        </div>
                    )}

                    <div>
                        <span>ライク</span>
                    </div>
                </div>
                <div
                    className="flex hover:text-blue-400 cursor-pointer"
                    onClick={() => handleCommentPost()}
                >
                    <div>
                        <IconMessageCircle />
                    </div>
                    <div>コメント</div>
                </div>
                <div className="flex hover:text-blue-400 cursor-pointer">
                    <div>
                        <IconShare3 />
                    </div>
                    <div>共有</div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
