import {
    IconThumbUp,
    IconMessageCircle,
    IconShare3,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";

function PostDetail() {
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

    console.log(actionPost);

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 rounded-full">
                <div>
                    <img
                        className="w-12 rounded-full"
                        src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/428297162_1760349381143905_2080811858875395246_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=z1fkJuv8C58Q7kNvgHBpSro&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AEqaVRD01ihiFdEqLyH_zHe&oh=00_AYBTEdAskxOmG1Oo8jkm_vYn79OQ6hC7XR-rFFq1-DbqHg&oe=67473A49"
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
    );
}

export default PostDetail;
