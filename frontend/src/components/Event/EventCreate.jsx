import { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";

const EventCreate = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md relative w-1/2">

                    </div>
                </div>
            )}
        </>
    );
};

export default EventCreate;
