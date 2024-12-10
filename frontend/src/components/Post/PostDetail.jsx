import {
    IconThumbUp,
    IconMessageCircle,
    IconShare3,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";

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

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 rounded-full">
                    <div>
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src="https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd."
                            alt="Anh luan dep trai"
                        />
                    </div>
                    <div>
                        <div>
                            <span>ディン・ヴァン・ルアン</span>
                        </div>
                        <div>
                            <span>2024-12-20</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <span className="font-medium">ビジネス報連相</span>
            </div>

            <div>
                <img
                    src="https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg"
                    alt="Post avatar"
                />
            </div>
            <div>
                <p>
                    エキサイトブログはおかげさまで、今年20周年を迎えました！
                    これまで支えてくださったエキサイトブロガーの皆様、ありがとうございます！！
                    今後も皆様のブログライフを、より一層楽しく盛り上げていきたいと思います。これからもエキサイトブログをよろしくお願いいたします。
                </p>
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
