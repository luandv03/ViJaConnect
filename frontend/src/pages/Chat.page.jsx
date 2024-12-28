import { IconUserPlus, IconDots, IconSend2, IconX } from "@tabler/icons-react";
import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { chatService } from "../services/chat.service";
import { AuthContext } from "../providers/AuthProvider";

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
    const [searchValue, setSearchValue] = useState("");
    const [userResultSearch, setUserResultSearch] = useState([]);
    const [userAddedList, setUserAddedList] = useState([]);

    const { profile } = useContext(AuthContext);
    const { chatId } = useParams();

    const showGroupChatModal = () => {
        setIsGroupChatModal(true);
    };

    const closeGroupChatModal = () => {
        setIsGroupChatModal(false);
        setSearchValue("");
        setUserResultSearch([]);
        setUserAddedList([]);
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

    const handleSearchUserInGroup = async () => {
        if (!chatId) return;

        const res = await chatService.getUsersNotInGroupChat(
            chatId,
            searchValue
        );

        if (res.status === 200) {
            setUserResultSearch(res.data);
        }
    };

    const handleAddUserToGroup = async (userAdded) => {
        setUserResultSearch((prev) =>
            prev.filter((user) => user._id !== userAdded._id)
        );

        setUserAddedList((prev) => [...prev, userAdded]);
    };

    const handleRemoveUserFromGroup = async (userRemoved) => {
        setUserAddedList((prev) =>
            prev.filter((user) => user._id !== userRemoved._id)
        );

        handleSearchUserInGroup();
    };

    // call API
    const handleAddUserIntoGroupChat = async () => {
        if (!chatId || userAddedList.length === 0)
            return toast.warning("ユーザーを選んでください。");

        const users = userAddedList.map((user) => user._id);

        const res = await chatService.addUserIntoGroupChat(chatId, users);

        if (res.status === 200) {
            toast.success("メンバーを追加しました。");
            closeGroupChatModal();
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

        const res = chatService.sendMessage(chatId, profile?._id, value);
        setMessages([...messages, newMessage]);
        setValue("");

        if (res.status === 201) {
            toast.success("メッセージを送信しました。");
        }
    };

    useEffect(() => {
        handleGetChat();
        handleGetMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        handleSearchUserInGroup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

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
                            <div className="min-w-96 max-w-2xl bg-white p-2 rounded-xl space-y-4">
                                <div
                                    className="flex justify-end cursor-pointer"
                                    onClick={() => closeGroupChatModal()}
                                >
                                    <IconX />
                                </div>
                                <div className="bg-none rounded-3xl flex items-center flex-wrap max-h-32 overflow-y-auto custom-scrollbar">
                                    {userAddedList.length > 0 &&
                                        userAddedList.map((user) => (
                                            <div
                                                key={user?._id}
                                                className="bg-alice-blue h-8 p-1 rounded-3xl space-x-2 flex items-center m-1"
                                            >
                                                <span>{user?.name}</span>

                                                <span
                                                    className="cursor-pointer bg-black rounded-full text-white"
                                                    onClick={() =>
                                                        handleRemoveUserFromGroup(
                                                            user
                                                        )
                                                    }
                                                >
                                                    <IconX size={16} />
                                                </span>
                                            </div>
                                        ))}
                                    <div className="p-2">
                                        <input
                                            className="bg-none p-x-8 outline-none resize-none"
                                            value={searchValue}
                                            onChange={(e) =>
                                                setSearchValue(e.target.value)
                                            }
                                            placeholder="ユーザーを検索"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="border-b-2 border-alice-blue"></div>
                                </div>

                                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                                    {userResultSearch.length > 0 ? (
                                        userResultSearch.map((user) => (
                                            <div
                                                key={user?._id}
                                                className="flex items-center space-x-2 hover:bg-blue-100 cursor-pointer p-1"
                                                onClick={() =>
                                                    handleAddUserToGroup(user)
                                                }
                                            >
                                                <div>
                                                    <img
                                                        src={user?.avatar_link}
                                                        alt=""
                                                        className="w-8 h-8 object-cover rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <span>{user?.name}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center">
                                            <span>ユーザーがありません。</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex w-full ">
                                    <button
                                        className="w-full min-h-8 bg-gray-400 hover:opacity-70 p-2 rounded-3xl"
                                        onClick={() =>
                                            handleAddUserIntoGroupChat()
                                        }
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
