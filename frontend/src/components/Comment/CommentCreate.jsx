import { IconSend2 } from "@tabler/icons-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function CommentCreate({ handleAddComment, inputRef }) {
    const [commentValue, setCommentValue] = useState("");

    const sendComment = () => {
        if (!commentValue.trim().length) return;

        handleAddComment({
            id: `${Math.floor(Math.random() * 100)}`,
            author: "ディン・ヴァン・ルアン",
            content: commentValue,
            time: "1分前",
            avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        });

        setCommentValue("");
    };

    return (
        <div>
            <div className="flex items-center space-x-2 rounded-full">
                <div>
                    <img
                        className="w-10 h-10 object-cover rounded-full"
                        src="https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd."
                        alt="Anh luan dep trai"
                    />
                </div>
                <div className="border-none p-2 bg-alice-blue flex-1 rounded-md">
                    <div>
                        <textarea
                            className="w-full bg-alice-blue min-h-8 rounded-md p-x-8 outline-none resize-none"
                            name=""
                            id=""
                            placeholder="コメントを追加"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            ref={inputRef}
                        ></textarea>
                    </div>
                    <div
                        className={`flex w-full ${
                            commentValue.trim().length > 0
                                ? "cursor-pointer hover:opacity-60"
                                : ""
                        }`}
                        onClick={() => sendComment()}
                    >
                        <div
                            className={`ml-auto ${
                                commentValue.trim().length > 0
                                    ? ""
                                    : "text-gray-400"
                            }`}
                        >
                            <IconSend2 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentCreate;
