import { IconUserPlus, IconDots, IconSend2, IconX } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";

const MESSAGES = [
    {
        id: 1,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content:
            "みなさん、もうすぐ年末ですね。今年の忘年会について話し合いませんか？",
    },
    {
        id: 2,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "そうですね。今年もたくさん頑張りましたし、みんなで楽しい時間を過ごしたいですね。",
    },
    {
        id: 200,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "はい！場所はどうしますか？去年は居酒屋でしたが、今年はちょっと変えてみませんか？",
    },
    {
        id: 3,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content:
            "いいですね。ホテルのバンケットルームとかどうでしょう？少しフォーマルな感じで。",
    },
    {
        id: 4,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content:
            "フォーマルもいいですが、コストが気になりますね。会社の予算を確認しないといけませんね。",
    },
    {
        id: 5,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content:
            "それなら、オフィスでカジュアルなパーティーをするのはどうですか？ケータリングを頼んで。",
    },
    {
        id: 1,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content:
            "それもいいですね！みんなが参加しやすくなりますし、準備も簡単です。",
    },
    {
        id: 2,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "じゃあ、まずアンケートを取って、どちらがいいかみんなに聞いてみましょう。",
    },
    {
        id: 3,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content: "了解です！アンケートフォームは私が作りますね。",
    },
    {
        id: 4,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content: "よろしくお願いします！では、来週までに結果をまとめましょう。",
    },
    {
        id: 5,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content: "了解です！",
    },
    {
        id: 2,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "アンケートは食事についても聞いたほうがいいですね。みんなが好きなものを提供できればいいと思います。",
    },
    {
        id: 1,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content:
            "そうですね！和食だけじゃなくて、洋食や中華も候補に入れたらどうですか？",
    },
    {
        id: 2,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "いいアイデアですね！飲み物も重要なので、アルコールの有無についても確認したほうがいいですね。",
    },
    {
        id: 200,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content: "確かに。最近はお酒を飲まない人も増えていますからね。",
    },
    {
        id: 3,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content:
            "それと、ゲームやプレゼント交換など、何かアクティビティを入れたほうがいいと思います！",
    },
    {
        id: 4,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content: "プレゼント交換は面白いですね。でも、予算はどうしますか？",
    },
    {
        id: 5,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content: "一人千円くらいでどうですか？負担にならない程度に。",
    },
    {
        id: 1,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content: "それなら良さそうですね！企画リストに追加しましょう。",
    },
    {
        id: 2,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "あと、日時についてもアンケートで確認しましょう。忙しい時期なので全員の都合を考えたいですね。",
    },
    {
        id: 3,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content: "了解です。フォームに質問を追加しておきます。",
    },
    {
        id: 4,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content:
            "みなさん、いいアイデアありがとうございました！良い忘年会になりそうですね。",
    },
    {
        id: 5,
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content: "こちらこそ、楽しみですね！",
    },
];

function ChatPage() {
    const [messages, setMessages] = useState(MESSAGES);
    const [value, setValue] = useState("");
    const messagesEndRef = useRef(null);
    const [isGroupChatModal, setIsGroupChatModal] = useState(false);

    const showGroupChatModal = () => {
        setIsGroupChatModal(true);
    };

    const closeGroupChatModal = () => {
        setIsGroupChatModal(false);
    };

    const handleSendMessage = () => {
        if (!value) return;

        const newMessage = {
            id: messages.length + 1,
            avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
            sender: "luan",
            content: value,
        };

        setMessages([...messages, newMessage]);
        setValue("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="px-8 py-4 ">
            {/* header chat */}
            <div className="p-4 flex items-center justify-between space-x-10 bg-alice-blue rounded-lg mb-4 ">
                <div className="flex items-center space-x-2">
                    <div>
                        <img
                            src="https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd."
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                        />
                    </div>
                    <div className="font-medium text-lg">
                        <span>グループチャット</span>
                    </div>
                </div>

                <div
                    className="hover:text-gray-400 cursor-pointer"
                    onClick={() => showGroupChatModal()}
                >
                    <IconUserPlus />
                </div>
            </div>

            {/* body chat */}
            <div
                className="p-4 bg-alice-blue rounded-t-md flex-grow"
                style={{
                    height: "calc(100vh - 278px)",
                    overflowY: "auto",
                    msOverflowStyle: "none", // IE and Edge
                    scrollbarWidth: "none", // Firefox
                }}
            >
                <style>
                    {`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;  // Chrome, Safari, and Opera
                        }
                    `}
                </style>
                {/* panel content chat */}
                <div className="space-y-2">
                    {messages.map((message, index) => {
                        const showAvatar =
                            index === 0 ||
                            messages[index - 1].sender !== message.sender;

                        return message.sender !== "luan" ? (
                            <div className="flex space-x-1" key={message.id}>
                                <div className={showAvatar || "invisible"}>
                                    <img
                                        src={message.avatar}
                                        alt=""
                                        className="w-8 h-8 object-cover rounded-full"
                                    />
                                </div>
                                <div className="bg-white px-1 rounded-sm">
                                    <span>{message.content}</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="flex space-x-1 justify-end"
                                key={message.id}
                            >
                                <div className={showAvatar || "invisible"}>
                                    <img
                                        src={message.avatar}
                                        alt=""
                                        className="w-8 h-8 object-cover rounded-full"
                                    />
                                </div>
                                <div className="bg-blue-400 px-1 text-white rounded-sm flex-start">
                                    <span>{message.content}</span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* action send message body */}
                {/* flex justify-between space-x-4 fixed bottom-8 bg-alice-blue  */}
            </div>
            <div className="w-full flex space-x-4 p-4 bg-alice-blue rounded-b-md">
                <div className="px-4 flex flex-1 justify-between items-center rounded-md space-x-2 bg-white">
                    <input
                        className="w-full flex flex-1 h-full outline-none rounded-md"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <div
                        className={`  ${
                            value.length > 0
                                ? "hover:opacity-70 cursor-pointer"
                                : "text-gray-400 "
                        }`}
                        onClick={() => handleSendMessage()}
                    >
                        <IconSend2 />
                    </div>
                </div>

                <div>
                    <button className="w-12 h-12 flex justify-center items-center bg-white rounded-full">
                        <IconDots />
                    </button>
                </div>
            </div>

            {/* Modal add member into group */}
            {isGroupChatModal ? (
                <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-over-layer mt-0">
                    <div className="min-w-96 bg-white p-2 rounded-xl space-y-4">
                        <div
                            className="flex justify-end cursor-pointer"
                            onClick={() => closeGroupChatModal()}
                        >
                            <IconX />
                        </div>
                        <div className="bg-none rounded-3xl flex items-center">
                            <div className="bg-alice-blue h-8 p-1 rounded-3xl space-x-2 flex items-center">
                                <span>Luan Dinh</span>

                                <span className="cursor-pointer bg-black rounded-full text-white">
                                    <IconX size={16} />
                                </span>
                            </div>
                            <div className="p-2">
                                <input className="bg-none p-x-8 outline-none resize-none"></input>
                            </div>
                        </div>
                        <div>
                            <div className="border-b-2 border-alice-blue"></div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex w-full items-center">
                                <button className="w-full min-h-8 bg-alice-blue  p-2 rounded-3xl ">
                                    <span>Dinh Van Luan</span>
                                </button>
                            </div>
                            <div className="flex w-full ">
                                <button className="w-full min-h-8 bg-alice-blue  p-2 rounded-3xl">
                                    <span>Chu Dinh Hien</span>
                                </button>
                            </div>
                            <div className="flex w-full ">
                                <button className="w-full min-h-8 bg-alice-blue  p-2 rounded-3xl">
                                    <span>Nguyen Duc Phu</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex w-full ">
                            <button
                                className="w-full min-h-8 bg-gray-400 hover:opacity-70 p-2 rounded-3xl"
                                onClick={() => closeGroupChatModal()}
                            >
                                <span>メンバーを追加</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default ChatPage;
