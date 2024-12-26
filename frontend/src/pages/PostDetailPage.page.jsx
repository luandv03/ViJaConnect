import { useState, useRef } from "react";

import { PostDetail } from "../components/Post";
import { CommentCreate, CommentDetail } from "../components/Comment";
import { BackPage } from "../components/BackPage";

const COMMENT_LISTS = [
    {
        id: "1",
        author: "チュー・ディン・ヒエン",
        content:
            "エキサイトブログはおかげさまで、今年20周年を迎えました！ これまで支えてくださったエキサイトブロガーの皆様、ありがとうございます！！ 今後も皆様のブログライフを、より一層楽しく盛り上げていきたいと思います。これからもエキサイトブログをよろしくお願いいたします。",
        time: "45分前",
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
    },
    {
        id: "2",
        author: "グエン・ザ・トゥン・ゾオン",
        content: `翻訳ャtトで変換したというコメントは気にしないで良いのではないでしょうか？だってtenshi-chan＠ヤッフーなんだよ～メアド(笑)用があるなら英語でくるよ！でも翻訳ャtトってやつは堅いのか進歩はしているハズなのに、まるで宇宙船との交信のようだ。。`,
        time: "2時前",
        avatar: "https://ca.slack-edge.com/T02QFU9TCTD-U050YRP1CKD-db63e56c3a98-72",
    },
    {
        id: "3",
        author: "グエン・ドゥック・フ",
        content: `この記事を読めば、ブログの書き方の基本がしっかりとつかめるでしょう。
                そして書き方がわかることで、ブログを楽しめるようになってほしいという思いを込めました！`,
        time: "4時前",
        avatar: "https://ca.slack-edge.com/T02QFU9TCTD-U05LS8WME6L-e9f842c7fcee-72",
    },
];

function PostDetailPage() {
    const [commentList, setCommentList] = useState(COMMENT_LISTS);
    const inputRef = useRef(null);

    const handleAddComment = (comment) => {
        setCommentList((prev) => [comment, ...prev]);
    };

    return (
        <div className="p-4 space-y-4">
            <BackPage />
            <PostDetail inputRef={inputRef} />

            <CommentCreate
                handleAddComment={handleAddComment}
                inputRef={inputRef}
            />

            {commentList.length > 0 &&
                commentList.map((comment, index) => (
                    <CommentDetail key={index} comment={comment} />
                ))}
        </div>
    );
}

export default PostDetailPage;
