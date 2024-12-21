import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { ChevronLeft, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const ChatSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");

  const chats = [
    { id: 1, title: "ゾオンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64." },
    { id: 2, title: "フさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123." },
    { id: 3, title: "キエンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6." },
    { id: 4, title: "ヒエンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b." },
    { id: 5, title: "日本の文化グループ", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAh-J6uNAaOjtPhz_IIAnPBg36rfnu8SO7RkTVaDEtwNvReWQWDFOmsH6pFNoIHb1rl28&usqp=CAU" },
    { id: 6, title: "日本の音楽グループ", avatar: "https://assets.st-note.com/production/uploads/images/122677351/rectangle_large_type_2_46126dac4a768397733d7070247c3e3f.jpeg?fit=bounds&quality=85&width=1280" },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      console.log("New Group Created:", groupName);
      setIsModalOpen(false);
      setGroupName(""); // Reset group name
    } else {
      alert("グループ名を入力してください。");
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
          <IconSearch stroke={2} size={20} className="text-gray-500" />
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
      <ul className="mt-6 space-y-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg overflow-y-auto max-h-[calc(100vh-350px)]" style={{
        height: "calc(100vh - 278px)",
        overflowY: "auto",
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}>
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;  // Chrome, Safari, and Opera
            }
          `}
        </style>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <li
              key={`chat-${chat.id}`} // Sử dụng prefix để tránh trùng key
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg shadow-md hover:bg-blue-100 cursor-pointer transition duration-300"
            >
              <img
                src={chat.avatar}
                alt={chat.title}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{chat.title}</h3>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-4">見つかりません</li>
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
                onClick={() => setIsModalOpen(false)}
                className="w-full"
                variant="destructive"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleCreateGroup}
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
