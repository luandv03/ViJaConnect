import { useContext, useState } from "react";
import { IconCirclePlus, IconCloudUpload } from "@tabler/icons-react";
import { Button } from "../ui/Button";
import { eventService } from "../../services/event.service";
import { uploadImage } from "../../services/upload.service"; // Import service upload
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const EventCreate = ({ refreshEvents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { profile } = useContext(AuthContext);
    const [isUploading, setIsUploading] = useState(false); // Trạng thái đang tải ảnh
    const [previewImage, setPreviewImage] = useState(""); // Ảnh preview cục bộ
    const [selectedFile, setSelectedFile] = useState(null); // File ảnh đã chọn
    const [formData, setFormData] = useState({
        author_id: profile._id, // Thay bằng ID author thật
        title: "",
        desc: "",
        location: "",
        date: "",
        banner_link: "",
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            author_id: profile._id,
            title: "",
            desc: "",
            location: "",
            date: "",
            banner_link: "",
        });
        setPreviewImage("");
        setSelectedFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file); // Lưu file để upload sau
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result); // Preview ảnh
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        try {
            setIsUploading(true);

            console.log("Starting submission with formData:", formData);

            // Nếu có ảnh, upload ảnh trước
            if (selectedFile) {
                console.log("Selected file:", selectedFile);
                const uploadedImage = await uploadImage(selectedFile); // Gọi service upload
                console.log("Uploaded image:", uploadedImage);

                if (uploadedImage && uploadedImage.data.url) {
                    console.log(uploadImage)
                    formData.banner_link = uploadedImage.data.url; // Cập nhật URL ảnh từ server
                    console.log("Updated formData with banner_link:", formData);
                } else {
                    console.error("Uploaded image is missing 'url'");
                }
            }

            // Gửi dữ liệu sự kiện lên server
            console.log("Final formData being sent:", formData);

            // Bỏ comment khi sử dụng eventService
            await eventService.createEvent(formData);

            toast.success("イベントが正常に作成されました！");
            closeModal();
            if (refreshEvents) {
                refreshEvents();
            }
        } catch (error) {
            toast.error("イベント作成中にエラーが発生しました。");
            console.error("Error while creating event:", error);
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <>
            <div
                onClick={openModal}
                className="p-4 flex items-center space-x-10 bg-alice-blue rounded-lg mb-4 hover:text-gray-400 cursor-pointer"
            >
                <IconCirclePlus stroke={2} />
                <div>新しいイベントを作成する</div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="min-w-96 bg-white p-6 rounded-xl space-y-6 shadow-lg">
                        <div>
                            <h3 className="text-lg font-bold">新しいイベントを追加</h3>
                        </div>
                        <div>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border-b border-gray-400 outline-none"
                                placeholder="イベント名を入力"
                            />
                        </div>
                        <div>
                            <input
                                name="date"
                                type="datetime-local"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full p-2 border-b border-gray-400 outline-none"
                                placeholder="イベントの時間を入力"
                            />
                        </div>
                        <div>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border-b border-gray-400 outline-none"
                                placeholder="イベントの場所を入力"
                            />
                        </div>
                        <div className="flex flex-col h-48 w-full bg-alice-blue rounded-md items-center justify-center relative">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="イベントバナー"
                                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <div className="text-center">
                                    {isUploading ? "アップロード中..." : "イベントバナー"}
                                </div>
                            )}
                            <label className="items-end absolute right-2 bottom-2 cursor-pointer">
                                <IconCloudUpload />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={isUploading} // Vô hiệu hóa nếu đang tải ảnh
                                />
                            </label>
                        </div>
                        <div>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                className="w-full p-2 border-b border-gray-400 outline-none"
                                placeholder="イベントの説明を入力"
                            ></textarea>
                        </div>

                        <div className="flex w-full space-x-4 mt-6">
                            <Button
                                type="button"
                                className="w-full"
                                variant="destructive"
                                onClick={closeModal}
                            >
                                キャンセル
                            </Button>
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={handleSubmit}
                                disabled={isUploading} // Không cho phép tạo sự kiện khi đang tải ảnh
                            >
                                ポスト
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventCreate;
