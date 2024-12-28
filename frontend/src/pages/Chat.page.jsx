import { IconUserPlus, IconDots, IconSend2, IconX } from "@tabler/icons-react";
import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { chatService } from "../services/chat.service";
import { AuthContext } from "../providers/AuthProvider";

const MESSAGES = [
    {
        _id: 1,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content:
            "みなさん、もうすぐ年末ですね。今年の忘年会について話し合いませんか？",
    },
    {
        _id: 2,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "そうですね。今年もたくさん頑張りましたし、みんなで楽しい時間を過ごしたいですね。",
    },
    {
        _id: 200,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "はい！場所はどうしますか？去年は居酒屋でしたが、今年はちょっと変えてみませんか？",
    },
    {
        _id: 3,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content:
            "いいですね。ホテルのバンケットルームとかどうでしょう？少しフォーマルな感じで。",
    },
    {
        _id: 4,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content:
            "フォーマルもいいですが、コストが気になりますね。会社の予算を確認しないといけませんね。",
    },
    {
        _id: 5,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content:
            "それなら、オフィスでカジュアルなパーティーをするのはどうですか？ケータリングを頼んで。",
    },
    {
        _id: 1,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content:
            "それもいいですね！みんなが参加しやすくなりますし、準備も簡単です。",
    },
    {
        _id: 2,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "じゃあ、まずアンケートを取って、どちらがいいかみんなに聞いてみましょう。",
    },
    {
        _id: 3,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content: "了解です！アンケートフォームは私が作りますね。",
    },
    {
        _id: 4,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content: "よろしくお願いします！では、来週までに結果をまとめましょう。",
    },
    {
        _id: 5,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content: "了解です！",
    },
    {
        _id: 2,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "アンケートは食事についても聞いたほうがいいですね。みんなが好きなものを提供できればいいと思います。",
    },
    {
        _id: 1,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content:
            "そうですね！和食だけじゃなくて、洋食や中華も候補に入れたらどうですか？",
    },
    {
        _id: 2,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "いいアイデアですね！飲み物も重要なので、アルコールの有無についても確認したほうがいいですね。",
    },
    {
        _id: 200,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content: "確かに。最近はお酒を飲まない人も増えていますからね。",
    },
    {
        _id: 3,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content:
            "それと、ゲームやプレゼント交換など、何かアクティビティを入れたほうがいいと思います！",
    },
    {
        _id: 4,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content: "プレゼント交換は面白いですね。でも、予算はどうしますか？",
    },
    {
        _id: 5,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content: "一人千円くらいでどうですか？負担にならない程度に。",
    },
    {
        _id: 1,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        sender: "hien",
        content: "それなら良さそうですね！企画リストに追加しましょう。",
    },
    {
        _id: 2,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        sender: "phu",
        content:
            "あと、日時についてもアンケートで確認しましょう。忙しい時期なので全員の都合を考えたいですね。",
    },
    {
        _id: 3,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        sender: "kien",
        content: "了解です。フォームに質問を追加しておきます。",
    },
    {
        _id: 4,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        sender: "duong",
        content:
            "みなさん、いいアイデアありがとうございました！良い忘年会になりそうですね。",
    },
    {
        _id: 5,
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        sender: "luan",
        content: "こちらこそ、楽しみですね！",
    },
];

const CHAT = {
    _id: "",
    chatName: "スカイチーム",
    isGroupChat: false,
    users: [],
    latestMessage: null,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fvRATLApWGN3kNsceiuLDW62rnXgwtbL8A&s",
};

function ChatPage() {
    const [chat, setChat] = useState(CHAT);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const messagesEndRef = useRef(null);
    const [isGroupChatModal, setIsGroupChatModal] = useState(false);
    const { profile } = useContext(AuthContext);
    const { chatId } = useParams();

    const showGroupChatModal = () => {
        setIsGroupChatModal(true);
    };

    const closeGroupChatModal = () => {
        setIsGroupChatModal(false);
    };

    const handleGetChat = async () => {
        if (!chatId || !profile?._id) return;

        const res = await chatService.getChatById(chatId, profile?._id);

        if (res.status === 200) {
            setChat(res.data);
        }
    };

    const handleGetMessages = async () => {
        if (!chatId) return;
        const res = await chatService.getMessagesByChatId(chatId);

        if (res.status === 200) {
            console.log("messgaes", res.data);
            setMessages(res.data);
        }
    };

    const handleSendMessage = () => {
        if (!value) return;

        const newMessage = {
            sender: {
                _id: profile?._id,
                name: profile?.name,
                email: profile?.email,
                avatar_link: profile?.avatar_link,
            },
            content: value,
        };

        setMessages([...messages, newMessage]);
        setValue("");
    };

    useEffect(() => {
        handleGetChat();
        handleGetMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            {chat._id ? (
                <div className="px-8 py-4 ">
                    {/* header chat */}
                    <div className="p-4 flex items-center justify-between space-x-10 bg-alice-blue rounded-lg mb-4 ">
                        <div className="flex items-center space-x-2">
                            <div>
                                <img
                                    src={chat?.avatar}
                                    alt=""
                                    className="w-12 h-12 object-cover rounded-full"
                                />
                            </div>
                            <div className="font-medium text-lg">
                                <span>{chat?.chatName}</span>
                            </div>
                        </div>

                        {chat?.isGroupChat && (
                            <div
                                className="hover:text-gray-400 cursor-pointer"
                                onClick={() => showGroupChatModal()}
                            >
                                <IconUserPlus />
                            </div>
                        )}
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
                            {messages.length > 0 &&
                                messages.map((message, index) => {
                                    const showAvatar =
                                        index === 0 ||
                                        messages[index - 1]?.sender?._id !==
                                            message.sender?._id;

                                    return message?.sender?._id !==
                                        profile?._id ? (
                                        <div
                                            className="flex space-x-1"
                                            key={message?._id}
                                        >
                                            <div
                                                className={
                                                    showAvatar || "invisible"
                                                }
                                            >
                                                <img
                                                    src={
                                                        message?.sender
                                                            ?.avatar_link
                                                    }
                                                    alt=""
                                                    className="w-8 h-8 object-cover rounded-full"
                                                />
                                            </div>
                                            <div className="bg-white px-1 rounded-sm">
                                                <span>{message?.content}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex space-x-1 justify-end"
                                            key={message?._id}
                                        >
                                            <div
                                                className={
                                                    showAvatar || "invisible"
                                                }
                                            >
                                                <img
                                                    src={
                                                        message?.sender
                                                            ?.avatar_link
                                                    }
                                                    alt=""
                                                    className="w-8 h-8 object-cover rounded-full"
                                                />
                                            </div>
                                            <div className="bg-blue-400 px-1 text-white rounded-sm flex-start">
                                                <span>{message?.content}</span>
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
            ) : (
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <span>チャットが見つかりません</span>
                        <br />
                        <span>チャットのためにコンタクトを選んでください</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatPage;
