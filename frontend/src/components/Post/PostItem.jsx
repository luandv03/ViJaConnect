/* eslint-disable react/prop-types */
import {
    IconMessageCircle,
    IconShare3,
    IconThumbUp,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { formatDate } from "../../helpers/formatDate";
import { highlightText } from "../../helpers/highlight";
const PostItem = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    return (
        <>
            <div className="bg-alice-blue p-5 rounded-lg mb-5">
                <div className="flex space-x-5 mb-4">
                    <div className="h-12 w-12 rounded-full bg-white">
                        <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={post.author.avatar_link}
                            alt="Anh luan dep trai"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            <span className="font-bold">
                                {post.author.display_name}
                            </span>
                        </div>
                        <div>
                            <span>{formatDate(post.date)}</span>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <h3
                        dangerouslySetInnerHTML={{
                            __html: highlightText(post.title, query),
                        }}
                    />
                </div>
                <Link to={`/post/${post._id}`}>
                    <div className="mb-5">
                        <img
                            src={post.image_link}
                            alt="Post avatar"
                            className="w-full object-cover"
                        />
                    </div>
                </Link>
                <div className="flex items-center justify-between">
                    <div
                        className={`flex items-center cursor-pointer ${liked ? "text-blue-400" : "hover:text-blue-400"
                            }`}
                        onClick={() => setLiked(!liked)}
                    >
                        {liked ? (
                            <IconThumbUpFilled />
                        ) : (
                            <IconThumbUp stroke={2} />
                        )}
                        <span className="ml-2">いいね</span>
                    </div>
                    <Link to="/post/123">
                        <div className="flex items-center cursor-pointer">
                            <IconMessageCircle stroke={2} />
                            <span className="ml-2">コメント</span>
                        </div>
                    </Link>
                    <div className="flex items-center">
                        <IconShare3 stroke={2} />
                        <span className="ml-2">共有</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostItem;
