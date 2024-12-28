import { useState, useContext, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { ChevronLeft, PlusIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../ui/Button";
import { AuthContext } from "../../providers/AuthProvider";
import { chatService } from "../../services/chat.service";

const CHATS = [
    {
        _id: 1,
        isGroup: false,
        chatName: "ゾオンさん",
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
    },
    {
        _id: 2,
        isGroup: false,
        chatName: "フさん",
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
    },
    {
        _id: 3,
        isGroup: false,
        chatName: "キエンさん",
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
    },
    {
        _id: 4,
        isGroup: false,
        chatName: "ヒエンさん",
        avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
    },
    {
        _id: 5,
        isGroup: false,
        chatName: "日本の文化グループ",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAh-J6uNAaOjtPhz_IIAnPBg36rfnu8SO7RkTVaDEtwNvReWQWDFOmsH6pFNoIHb1rl28&usqp=CAU",
    },
    {
        _id: 6,
        isGroup: false,
        chatName: "日本の音楽グループ",
        avatar: "https://assets.st-note.com/production/uploads/images/122677351/rectangle_large_type_2_46126dac4a768397733d7070247c3e3f.jpeg?fit=bounds&quality=85&width=1280",
    },
];

const ChatSidebar = () => {
    const [chats, setChats] = useState(CHATS);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const { profile } = useContext(AuthContext);

    const { chatId } = useParams();

    console.log("Chat ID:", chatId);

    const handleGetContacts = async () => {
        try {
            if (!profile?._id) return;
            const res = await chatService.getChatByUserId(profile?._id);

            if (res.status === 200) {
                const listChat = res?.data?.map((chat) =>
                    chat.isGroupChat
                        ? {
                              _id: chat._id,
                              isGroup: true,
                              chatName: chat.chatName,
                              avatar: chat.avatar,
                          }
                        : {
                              _id: chat._id,
                              isGroup: false,
                              chatName: chat.users.find(
                                  (user) => user._id !== profile._id
                              ).name,
                              avatar: chat.users.find(
                                  (user) => user._id !== profile._id
                              ).avatar_link,
                          }
                );
                setChats(listChat);
                console.log("Contacts:", res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredChats =
        chats.length &&
        chats.filter((chat) =>
            chat?.chatName.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleCreateGroup = async () => {
        if (groupName.trim()) {
            console.log("New Group Created:", groupName);
            const res = await chatService.createGroupChat(
                groupName,
                profile?._id,
                []
            );
            if (res.status === 201) {
                setIsModalOpen(false);
                setGroupName(""); // Reset group name
                const chatData = res.data;
                const newGroup = {
                    _id: chatData?._id,
                    isGroup: true,
                    chatName: chatData?.chatName,
                    avatar: chatData?.avatar,
                };

                setChats([newGroup, ...chats]);

                toast.success("グループが作成されました。");
            }
        } else {
            toast.error("グループ名を入力してください。");
        }
    };

    return (
        <div className="sidebar bg-gray-50 p-6 max-w-sm w-full h-screen">
            {/* Header + Search Bar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center mb-4">
                    <Link
                        to="/"
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-200"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <h2 className="text-xl font-semibold ml-3 text-gray-800">
                        コンタクト
                    </h2>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-300 shadow-sm">
                    <IconSearch
                        stroke={2}
                        size={20}
                        className="text-gray-500"
                    />
                    <input
                        type="text"
                        placeholder="チャットを検索..."
                        className="w-full ml-3 bg-transparent focus:outline-none text-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Chat List */}
            <ul
                className="mt-6 space-y-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg overflow-y-auto max-h-[calc(100vh-350px)]"
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
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <Link
                            to={`/chat/${chat._id}`}
                            key={`chat-${chat.id}`} // Sử dụng prefix để tránh trùng key
                            className={`flex items-center space-x-3 p-4 ${
                                chatId === chat?._id
                                    ? "bg-blue-100"
                                    : "bg-gray-50"
                            } rounded-lg shadow-md hover:bg-blue-100 cursor-pointer transition duration-300 `}
                        >
                            <img
                                src={chat?.avatar}
                                alt={chat?.chatName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {chat.chatName}
                                </h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <li className="text-gray-500 text-center py-4">
                        見つかりません
                    </li>
                )}
            </ul>

            {/* Add Chat Group Button */}
            <div className="flex justify-center items-center p-10">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200"
                >
                    <PlusIcon size={24} color="white" />
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-over-layer mt-0">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            チャットグループを作成
                        </h2>
                        <input
                            type="text"
                            placeholder="チャットグループ名"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none mb-4"
                        />
                        <div className="flex justify-end space-x-3">
                            <Button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setGroupName("");
                                }}
                                className="w-full"
                                variant="destructive"
                            >
                                キャンセル
                            </Button>
                            <Button
                                onClick={() => handleCreateGroup()}
                                className="w-full"
                            >
                                作成
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatSidebar;
