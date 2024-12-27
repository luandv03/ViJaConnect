import {
    IconArrowNarrowLeft,
    IconCalendarMonth,
    IconCheck,
    IconMapPin,
    IconShare3,
    IconThumbUp,
    IconThumbUpFilled,
    IconUser,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { eventService } from "../../services/event.service";
import { formatDate } from "../../helpers/formatDate";
import { AuthContext } from "../../providers/AuthProvider";
import { Button } from "../ui/Button";

const EventDetail = () => {
    const { eventId } = useParams();
    const { profile } = useContext(AuthContext);

    // State for Like and Join
    const [isLiked, setIsLiked] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const handleEdit = () => setIsEditing(!isEditing);

    // Handlers
    const handleLike = () => setIsLiked((prev) => !prev);
    const handleJoin = () => setIsJoined((prev) => !prev);

    const [event, setEvent] = useState({});

    useEffect(() => {
        eventService.fetchEventById(eventId).then((data) => setEvent(data.data));
    }, [eventId]);

    if (!event || Object.keys(event).length === 0) {
        return <div>イベントデータを読み込んでいます...</div>;
    }

    const handleCancel = () => {
        // Mở modal
        setIsModalOpen(true);
    };

    const confirmCancel = () => {
        if (cancelReason.trim() === "") {
            alert("理由を入力してください"); // Yêu cầu nhập lý do
            return;
        }
        alert(`キャンセルが確認されました。理由: ${cancelReason}`);
        setIsModalOpen(false); // Đóng modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between py-5 px-10">
                <div className="flex flex-col">
                    {isEditing ? (
                        <input
                            type="text"
                            className="border rounded-lg p-2 mb-2 text-xl text-center"
                            value={event.title}
                            onChange={(e) =>
                                setEvent({ ...event, title: e.target.value })
                            }
                        />
                    ) : (
                        <div className="py-2 px-10 rounded-lg bg-alice-blue text-xl mb-2 text-center">
                            {event.title}
                        </div>
                    )}
                    <div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 flex items-center space-x-2 text-sm">
                        <IconCalendarMonth stroke={2} size={18} />
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                className="border rounded-lg p-2"
                                value={
                                    event.date
                                        ? new Date(event.date).toISOString().slice(0, 16) // Chuyển đổi sang định dạng phù hợp
                                        : ""
                                }
                                onChange={(e) =>
                                    setEvent({ ...event, date: e.target.value })
                                }
                            />
                        ) : (
                            <span>{event.date ? formatDate(event.date) : "N/A"}</span>
                        )}
                    </div>
                    <div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 flex items-center space-x-2 text-sm">
                        <IconMapPin stroke={2} size={18} />
                        {isEditing ? (
                            <input
                                type="text"
                                className="border rounded-lg p-2"
                                value={event.location}
                                onChange={(e) =>
                                    setEvent({
                                        ...event,
                                        location: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <span>{event.location}</span>
                        )}
                    </div>
                    {!isEditing && (
                        <div className="rounded-lg bg-alice-blue mb-2 py-2 px-4 flex items-center space-x-2 text-sm">
                            <IconUser size={18} />
                            <span>オーガナイザー : {event.author.display_name}</span>
                        </div>
                    )}
                </div>
                <div>
                    <Link to="/event">
                        <IconArrowNarrowLeft stroke={2} size={60} width={150} />
                    </Link>
                    {profile.role_id.name === 'Manager' && !isEditing && (
                        <div
                            className="rounded-lg bg-blue-500 text-white mb-2 py-2 px-4 text-xl text-center hover:bg-blue-600 hover:shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
                            onClick={handleEdit}
                        >
                            <span>エディット</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-10 mb-4">
                <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-md">
                    {isEditing ? (
                        <div className="w-full h-[500px] bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer relative">
                            {/* Hiển thị ảnh preview nếu có */}
                            {event.banner_link ? (
                                <img
                                    src={event.banner_link}
                                    alt={event.title || "イベントの写真"}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="text-gray-500 text-center">
                                    イベントの写真
                                    <br />
                                    (ある場合)
                                </div>
                            )}

                            {/* Input file ẩn */}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setEvent({
                                                ...event,
                                                banner_link: reader.result, // Lưu URL ảnh base64 vào state
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <img
                            src={event.banner_link}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-md"
                        />
                    )}
                </div>
            </div>

            <div className="px-10 mb-4">
                {isEditing ? (
                    <textarea
                        className="border rounded-lg p-2 w-full"
                        value={event.desc}
                        onChange={(e) =>
                            setEvent({ ...event, desc: e.target.value })
                        }
                        placeholder="説明"
                    />
                ) : (
                    <div className="border rounded-lg">{event.desc}</div>
                )}
            </div>

            {profile.role_id.name == 'Admin' && (
                <div className="px-10">
                    <Button type="submit">
                        ポスト
                    </Button>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg">
                        キャンセル
                    </button>
                </div>
            )}

            {profile.role_id.name == 'Manager' ? (
                <div className="px-10 flex mb-2">
                    {isEditing && (
                        <button type="submit" className="bg-blue-600 py-2 px-4 rounded-lg mr-2">
                            セープ
                        </button>)}
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-lg"
                        onClick={isEditing ? handleEdit : handleCancel}
                    >
                        {isEditing ? "編集を終了" : "キャンセル"}
                    </button>
                </div>
            ) : (
                <div className="px-10">
                    <div className="flex justify-between items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className={`py-2 px-4 flex items-center rounded-2xl border transition ${isLiked ? "bg-blue-100 text-blue-600" : ""
                                }`}
                        >
                            {isLiked ? (
                                <IconThumbUpFilled
                                    stroke={2}
                                    size={18}
                                    fill="blue"
                                />
                            ) : (
                                <IconThumbUp stroke={2} size={18} />
                            )}
                            <span className="ml-2">いいね</span>
                        </button>

                        <button
                            onClick={handleJoin}
                            className={`py-2 px-4 flex items-center rounded-2xl border transition ${isJoined ? "bg-green-100 text-green-600" : ""
                                }`}
                        >
                            <IconCheck
                                stroke={2}
                                size={18}
                                className={`${isJoined ? "text-green-600" : ""
                                    }`}
                            />
                            <span className="ml-2">参考</span>
                        </button>

                        <div className="py-2 px-4 flex items-center rounded-2xl border">
                            <IconShare3 stroke={2} size={18} />
                            <span className="ml-2">共有</span>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative w-96">
                        {/* Nút đóng modal */}
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        {/* Tiêu đề và input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full py-2 px-3 rounded-lg bg-gray-600 text-white placeholder-gray-400"
                                placeholder="理由を入力してください"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                            />
                        </div>

                        {/* Nút xác nhận */}
                        <button
                            className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700"
                            onClick={confirmCancel}
                        >
                            キャンセルを確認
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventDetail;
