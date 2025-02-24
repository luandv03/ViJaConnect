import { useState } from "react";
import PropTypes from "prop-types";
import { IconCirclePlus } from "@tabler/icons-react";
import Editor from "./Editor";

const PostCreate = ({ setPostItem }) => {
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
                <div>新しいポストを作成する</div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md relative w-1/2 max-h-full overflow-y-auto">
                        <Editor
                            setPostItem={setPostItem}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
PostCreate.propTypes = {
    setPostItem: PropTypes.func.isRequired,
};

export default PostCreate;
