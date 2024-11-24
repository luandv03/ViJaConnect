import { IconPlus, IconReload, IconX } from "@tabler/icons-react";
import TopicItem from "./Topic/TopicItem";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TopicTab from "./Topic/TopicTab";

const Sidebar = () => {
  const location = useLocation();
  const isActive = location.pathname === '/';
  const eventActive = location.pathname === '/event';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="sidebar">
      <Link to="/">
        <div className="px-4 py-3 border-b border-red-600">
          <div className={`rounded-xl flex justify-between items-center px-3 py-2 ${isActive ? 'bg-alice-blue' : ''}`}>
            <h2>ホーム</h2>
            <IconReload stroke={2} size={20} onClick={() => showModal()} />
          </div>
        </div>
      </Link>

      <div className="py-4 pl-4 border-b border-red-600">

        <div className="flex items-center mb-3">
          <h2 className="mr-1">トピック</h2>
          <IconPlus stroke={2} size={20} />
        </div>
        <div className="overflow-y-auto 2xl:max-h-[675px] max-h-[530px] relative">
          <div className="flex flex-col justify-center pl-5 pr-3">
            {Array.from({ length: 20 }, (_, i) => (
              <TopicItem title={`React ${i + 1}`} id={i + 1} key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link to='/event'>
          <div className={`flex items-center p-4 rounded-lg ${eventActive ? 'bg-alice-blue' : ''}`}>
            <h2 className="mr-1">エベント</h2>
            <IconPlus stroke={2} size={20} />
          </div>
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-alice-blue p-6 rounded-md shadow-md relative w-1/2">
            <SearchBar placeholder="もっとトピックを見つける" />
            <div className="mt-5 flex flex-wrap gap-4">
              {Array.from({ length: 20 }, (_, i) => (
                <TopicTab title={`エグザンプル トピック ${i + 1}`} id={i + 1} key={i} />
              ))}
            </div>
            <button
              className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 absolute top-2 right-2"
              onClick={closeModal}
            >
              <IconX stroke={2} size={16} />
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Sidebar;
