/* eslint-disable react/prop-types */
import {
    IconThumbUp,
    IconMessageCircle,
    IconShare3,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";

function CommentCreate({ comment }) {
    const [actionComment, setActionComment] = useState({
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

    const handleLikeComment = () => {
        setActionComment({
            like: {
                active: !actionComment.like.active,
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

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2 rounded-full ">
                <div>
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={comment.avatar}
                        alt="Anh luan dep trai"
                    />
                </div>
                <div>
                    <div className="text-sm">
                        <div>
                            <span>{comment.author}</span>
                        </div>
                        <div>
                            <span>{comment.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pl-12 space-y-2">
                <div className="p-2 bg-alice-blue rounded-md">
                    <p>{comment.content}</p>
                </div>
                <div className="flex space-x-8 text-sm">
                    <div
                        className="flex hover:text-blue-400 cursor-pointer items-center"
                        onClick={() => handleLikeComment()}
                    >
                        {!actionComment.like.active ? (
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
                    <div className="flex hover:text-blue-400 cursor-pointer">
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
        </div>
    );
}

export default CommentCreate;
