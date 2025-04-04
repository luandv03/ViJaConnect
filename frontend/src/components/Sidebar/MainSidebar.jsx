import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useContext } from "react";

import { TopicCreate } from "../Topic";
import TopicItem from "../Topic/TopicItem";
import TopicTab from "../Topic/TopicTab";
import SearchBar from "../SearchBar";
import { topicService } from "../../services/topic.service";
import { AuthContext } from "../../providers/AuthProvider";

const MainSidebar = () => {
    const location = useLocation();
    const { profile } = useContext(AuthContext);
    const isActive = location.pathname === "/";
    const eventActive = location.pathname === "/event";
    const topicActive = location.pathname === "/topic";
    const adminActive = location.pathname === "/admin";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTopicCreatedModal, setIsTopicCreatedModal] = useState(false);
    const [topicItems, setTopicItems] = useState([]);

    useEffect(() => {
        topicService.fetchTopics().then((data) => setTopicItems(data.data));
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredTopics = useMemo(() => {
        if (!searchTerm.trim()) return topicItems;
        return topicItems.filter((topic) =>
            topic.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, topicItems]);

    const openSearchModal = () => setIsModalOpen(true);
    const closeSearchModal = () => setIsModalOpen(false);

    const openTopicCreateModal = () => setIsTopicCreatedModal(true);
    const closeTopicCreateModal = () => setIsTopicCreatedModal(false);

    return (
        <div className="sidebar max-w-96">
            {profile?.role_id?.name === "Admin" ? (
                <Link to="/admin">
                    <div className="px-4 py-3 border-b border-red-600">
                        <div
                            className={`rounded-xl flex justify-between items-center px-3 py-2 ${
                                adminActive ? "bg-alice-blue" : ""
                            }`}
                        >
                            <h2>ユーザー管理</h2>
                        </div>
                    </div>
                </Link>
            ) : (
                <Link to="/">
                    <div className="px-4 py-3 border-b border-red-600">
                        <div
                            className={`rounded-xl flex justify-between items-center px-3 py-2 ${
                                isActive ? "bg-alice-blue" : ""
                            }`}
                        >
                            <h2>ホーム</h2>
                        </div>
                    </div>
                </Link>
            )}

            <div className="py-4 pl-4 border-b border-red-600">
                <div
                    className={`flex items-center mb-3 cursor-pointer justify-between mr-4 p-4 ${
                        topicActive ? "bg-alice-blue" : ""
                    }`}
                >
                    <h2>トピック</h2>
                    <IconPlus
                        stroke={2}
                        size={20}
                        onClick={openTopicCreateModal}
                    />
                </div>

                <div className="flex items-center ml-5 border-b mb-2 mr-5">
                    <IconSearch
                        stroke={2}
                        size={20}
                        onClick={openSearchModal}
                    />
                    <input
                        type="text"
                        placeholder="トピックを検索"
                        className="w-full p-2 mr-3 rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="sidebar overflow-y-auto scrollbar-hide p-4 max-h-[calc(100vh-360px)]">
                    <div className="flex flex-col justify-center pl-5 pr-3">
                        {filteredTopics.map((topic) => (
                            <TopicItem key={topic.id} topic={topic} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <Link to="/event">
                    <div
                        className={`flex items-center justify-between p-4 rounded-lg ${
                            eventActive ? "bg-alice-blue" : ""
                        }`}
                    >
                        <h2 className="mr-1">イベント</h2>
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
