import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";

import { TopicCreate } from "../Topic";
import TopicItem from "../Topic/TopicItem";
import TopicTab from "../Topic/TopicTab";
import SearchBar from "../SearchBar";

const topicItemsData = [
  { id: 1, title: "文化交流: ベトナムと日本の文化を学ぶ" },
  { id: 2, title: "日越料理体験: 食で繋がる" },
  { id: 3, title: "日本語とベトナム語の学び合い" },
  { id: 4, title: "留学生のリアルな体験談" },
  { id: 5, title: "日越ビジネスの架け橋" },
  { id: 6, title: "日越共同プロジェクトの成功事例" },
];

const MainSidebar = () => {
  const location = useLocation();
  const isActive = location.pathname === "/";
  const eventActive = location.pathname === "/event";
  const topicActive = location.pathname === "/topic";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTopicCreatedModal, setIsTopicCreatedModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = useMemo(() => {
    if (!searchTerm.trim()) return topicItemsData;
    return topicItemsData.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const openSearchModal = () => setIsModalOpen(true);
  const closeSearchModal = () => setIsModalOpen(false);

  const openTopicCreateModal = () => setIsTopicCreatedModal(true);
  const closeTopicCreateModal = () => setIsTopicCreatedModal(false);

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="px-4 py-3 border-b border-red-600">
          <div className={`rounded-xl flex justify-between items-center px-3 py-2 ${isActive ? "bg-alice-blue" : ""}`}>
            <h2>ホーム</h2>
          </div>
        </div>
      </Link>

      <div className="py-4 pl-4 border-b border-red-600">
        <div
          className={`flex items-center mb-3 hover:bg-alice-blue hover:rounded-md cursor-pointer justify-between mr-4 p-4 ${topicActive ? "bg-alice-blue" : ""}`}
        >
          <Link to="/topic">
            <h2>トピック</h2>
          </Link>
          <IconPlus stroke={2} size={20} onClick={openTopicCreateModal} />
        </div>

        <div className="flex items-center ml-5 border-b mb-2 mr-5">
          <IconSearch stroke={2} size={20} onClick={openSearchModal} />
          <input
            type="text"
            placeholder="トピックを検索"
            className="w-full p-2 mr-3 rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto 2xl:max-h-[675px] max-h-[530px] relative">
          <div className="flex flex-col justify-center pl-5 pr-3">
            {filteredTopics.map((topic) => (
              <TopicItem key={topic.id} title={topic.title} id={topic.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link to="/event">
          <div className={`flex items-center justify-between p-4 rounded-lg ${eventActive ? "bg-alice-blue" : ""}`}>
            <h2 className="mr-1">イベント</h2>
            <IconPlus stroke={2} size={20} />
          </div>
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-alice-blue p-6 rounded-md shadow-md relative w-1/2">
            <SearchBar placeholder="もっとトピックを見つける" />
            <div className="mt-5 flex flex-wrap gap-4">
              {Array.from({ length: 20 }, (_, i) => (
                <TopicTab
                  title={`エグザンプル トピック ${i + 1}`}
                  id={i + 1}
                  key={i}
                />
              ))}
            </div>
            <button
              className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 absolute top-2 right-2"
              onClick={closeSearchModal}
            >
              <IconX stroke={2} size={16} />
            </button>
          </div>
        </div>
      )}

      {isTopicCreatedModal && (
        <TopicCreate closeTopicCreatedModal={closeTopicCreateModal} />
      )}
    </div>
  );
};

export default MainSidebar;
