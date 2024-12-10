import { IconArrowNarrowLeft, IconCalendarMonth, IconCheck, IconMapPin, IconShare3, IconThumbUp, IconThumbUpFilled, IconUser } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const EventDetail = () => {
  const location = useLocation();
  const isAdminOrManager = location.pathname.includes("admin") || location.pathname.includes("manager");

  // State for Like and Join
  const [isLiked, setIsLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  // Handlers
  const handleLike = () => setIsLiked((prev) => !prev);
  const handleJoin = () => setIsJoined((prev) => !prev);

  return (
    <>
      <div className="flex justify-between py-5 px-10">
        <div className="flex flex-col">
          <div className="py-2 px-10 rounded-lg bg-alice-blue text-xl mb-2 text-center">ベトナム文化交流フェスティバル</div>
          <div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 flex items-center space-x-2 text-sm">
            <IconCalendarMonth stroke={2} size={18} />
            <span>土曜日、2024-05-02 15:00</span>
          </div>
          <div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 flex items-center space-x-2 text-sm">
            <IconMapPin stroke={2} size={18} />
            <span>ハノイ文化センター</span>
          </div>
          <div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 flex items-center space-x-2 text-sm">
            <IconUser size={18} />
            <span>オーガナイザー : Manager ABC</span>
          </div>
        </div>
        <div>
          <Link to='/event'>
            <IconArrowNarrowLeft stroke={2} size={60} width={150} />
          </Link>
          {isAdminOrManager && (<div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 text-xl text-center">
            <span>エディット</span>
          </div>)}
        </div>
      </div>

      <div className="px-10 mb-4">
        <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-md">
          <img src="https://meetsvietnam.vietnamairlines.com/wp-content/uploads/2024/07/448504984_870598721767452_1562326102109704185_n.jpg" alt="event banner" className="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <div className="px-10 mb-4">
        <div className="border rounded-lg">
          このフェスティバルでは、ベトナムの伝統文化、衣装、料理、音楽を楽しむことができます。地元のアーティストが参加し、文化交流を促進します。
        </div>
      </div>

      {isAdminOrManager ? (
        <div className="px-10">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg">キャンセル</button>
        </div>
      ) : (
        <div className="px-10">
          <div className="flex justify-between items-center space-x-4">
            <button
              onClick={handleLike}
              className={`py-2 px-4 flex items-center rounded-2xl border transition ${isLiked ? "bg-blue-100 text-blue-600" : ""
                }`}
            >
              {isLiked ? <IconThumbUpFilled stroke={2} size={18} fill="blue" /> : <IconThumbUp stroke={2} size={18} />}
              <span className="ml-2">いいね</span>
            </button>

            <button
              onClick={handleJoin}
              className={`py-2 px-4 flex items-center rounded-2xl border transition ${isJoined ? "bg-green-100 text-green-600" : ""
                }`}
            >
              <IconCheck stroke={2} size={18} className={`${isJoined ? "text-green-600" : ""}`} />
              <span className="ml-2">参考</span>
            </button>

            <div className="py-2 px-4 flex items-center rounded-2xl border">
              <IconShare3 stroke={2} size={18} />
              <span className="ml-2">共有</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
