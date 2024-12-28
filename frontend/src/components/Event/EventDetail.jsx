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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { eventService } from "../../services/event.service";
import { formatDate } from "../../helpers/formatDate";
import { AuthContext } from "../../providers/AuthProvider";
import { Button } from "../ui/Button";
import { uploadImage } from "../../services/upload.service";
import { useEvent } from "../../providers/EventProvider";
import { toast } from "react-toastify";

const EventDetail = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const { profile } = useContext(AuthContext);
    const { refreshParticipants } = useEvent();

    // State for Like and Join
    const [isLiked, setIsLiked] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const handleEdit = () => setIsEditing(!isEditing);

    // Handlers
    const handleLike = () => setIsLiked((prev) => !prev);

    const [event, setEvent] = useState({});


    useEffect(() => {
        if (eventId) {
            eventService.fetchEventById(eventId).then((data) => {
                setEvent(data.data);

                // Kiểm tra xem người dùng đã tham gia chưa
                const joined = data.data.joined_users.some(
                    (joined_id) => joined_id === profile._id
                );
                setIsJoined(joined); // Cập nhật trạng thái isJoined
            });
        }
    }, [eventId, profile._id]);
    
    if (!event || Object.keys(event).length === 0) {
        return <div>イベントデータを読み込んでいます...</div>;
    }

    const handleCancel = () => {
        // Mở modal
        setIsModalOpen(true);
    };

    const confirmCancel = async () => {
        if (cancelReason.trim() === "") {
            alert("理由を入力してください");
            return;
        }
    
        try {
            await eventService.cancelEvent(eventId, cancelReason);
            toast.done("イベントがキャンセルされました！");
            setIsModalOpen(false);
            navigate("/event"); // Điều hướng về danh sách sự kiện
        } catch (error) {
            console.error("イベントのキャンセルに失敗しました:", error);
            alert("キャンセル中にエラーが発生しました。");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveEvent = async () => {
        try {
            const updatedEvent = {
                title: event.title,
                desc: event.desc,
                location: event.location,
                date: event.date,
                banner_link: event.banner_link,
            };

            const response = await eventService.updateEvent(eventId, updatedEvent);
            toast.success("イベントが正常に更新されました！");
            setEvent(response.data); // Cập nhật state với dữ liệu mới

            setIsEditing(false); // Kết thúc chế độ chỉnh sửa
        } catch (error) {
            toast.error("イベントを更新中にエラーが発生しました。");
            console.error(error);
        }
    };

    const handleFileUpload = async (file, setEvent, event) => {
        try {
            if (!file) return;

            // Hiển thị trạng thái "đang upload" (có thể thêm loader nếu cần)
            toast.info("画像をアップロード中...");

            // Sử dụng FileReader để preview ảnh trước
            const reader = new FileReader();
            reader.onloadend = () => {
                setEvent({
                    ...event,
                    banner_link: reader.result, // Lưu ảnh preview (base64)
                });
            };
            reader.readAsDataURL(file);

            // Thực hiện upload ảnh lên server
            const uploadedImage = await uploadImage(file); // Gọi service upload

            // Cập nhật URL ảnh từ server vào state
            setEvent({
                ...event,
                banner_link: uploadedImage.data.url,
            });

            alert("画像が正常にアップロードされました！");
        } catch (error) {
            console.error("画像のアップロード中にエラーが発生しました:", error);
            alert("画像のアップロードに失敗しました。");
        }
    };

    const joinEvent = async (eventId, userId) => {
        try {
            await eventService.joinEvent(eventId, userId);
            toast.success("イベントに参加しました");
            setIsJoined(true); // Cập nhật trạng thái
            refreshParticipants(eventId);
        } catch (error) {
            console.error("参加中にエラーが発生しました:", error);
            alert("参加できませんでした。もう一度お試しください。");
        }
    };
    
    // Hàm rời khỏi sự kiện
    const leaveEvent = async (eventId, userId) => {
        try {
            await eventService.leaveEvent(eventId, userId);
            toast.error("イベントから退会しました");
            setIsJoined(false); // Cập nhật trạng thái
            refreshParticipants(eventId);
        } catch (error) {
            console.error("退会中にエラーが発生しました:", error);
            alert("退会できませんでした。もう一度お試しください。");
        }
    };

    const handleJoinOrLeaveEvent = async () => {
        if (isJoined) {
            await leaveEvent(event._id, profile._id);
        } else {
            await joinEvent(event._id, profile._id);
        }
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
                                    handleFileUpload(file, setEvent, event); // Gọi hàm đã tách ra
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

            {profile.role_id.name === "Admin" && (
                <div className="px-10 mb-2">
                    <Button type="submit" className="mr-2" onClick={handleEdit}>イベント情報を編集</Button>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg">
                        キャンセル
                    </button>
                </div>
            )}

            {profile.role_id.name === "Manager" && (
                <div className="px-10 flex mb-2">
                    {isEditing && (
                        <button
                            type="submit"
                            className="bg-blue-600 py-2 px-4 rounded-lg mr-2"
                            onClick={handleSaveEvent}
                        >
                            セープ
                        </button>
                    )}
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-lg"
                        onClick={isEditing ? handleEdit : handleCancel}
                    >
                        {isEditing ? "編集を終了" : "キャンセル"}
                    </button>
                </div>
            )}

            {profile.role_id.name === "Staff" && (
                <div className="px-10 mb-4">
                    <div className="flex justify-between items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className={`py-2 px-4 flex items-center rounded-2xl border transition ${isLiked ? "bg-blue-100 text-blue-600" : ""
                                }`}
                        >
                            {isLiked ? (
                                <IconThumbUpFilled stroke={2} size={18} fill="blue" />
                            ) : (
                                <IconThumbUp stroke={2} size={18} />
                            )}
                            <span className="ml-2">いいね</span>
                        </button>

                        <button
                            onClick={handleJoinOrLeaveEvent}
                            className={`py-2 px-4 flex items-center rounded-2xl border transition ${isJoined ? "bg-green-100 text-green-600" : ""
                                }`}
                        >
                            <IconCheck
                                stroke={2}
                                size={18}
                                className={isJoined ? "text-green-600" : ""}
                            />
                            <span className="ml-2">{isJoined ? "退会" : "参加"}</span>
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
                    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl w-[400px] relative">
                        {/* Nút đóng modal */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        {/* Tiêu đề */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                            キャンセル理由を入力
                        </h3>

                        {/* Input */}
                        <div className="mb-6">
                            <textarea
                                className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 placeholder-gray-400 text-gray-800 resize-none"
                                placeholder="理由を入力してください..."
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                            />
                        </div>

                        {/* Nút xác nhận */}
                        <button
                            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                            onClick={confirmCancel}
                        >
                            確認
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default EventDetail;
