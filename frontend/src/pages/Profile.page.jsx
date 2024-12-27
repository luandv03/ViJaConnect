import { IconCloudUpload } from "@tabler/icons-react";
import { useState, useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { ProfileTab, PostTab, EventTab } from "../components/Tab";
import { EventCancelModal } from "../components/Event";

function Profile() {
    const [tab, setTab] = useState(1);
    const [isEventCancelModal, setIsEventCancelModal] = useState(false);

    const { profile } = useContext(AuthContext);

    console.log("Profile", profile);

    const showEventCancelModal = () => {
        setIsEventCancelModal(true);
    };

    const closeEventCancelModal = () => {
        setIsEventCancelModal(false);
    };

    const tabs = [
        {
            key: 1,
            element: <ProfileTab profile={profile} />,
        },
        {
            key: 2,
            element: <PostTab profile={profile} />,
        },
        {
            key: 3,
            element: <EventTab showEventCancelModal={showEventCancelModal} />,
        },
    ];

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
                <label className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-alice-blue">
                    <div>
                        <span>Avatar</span>
                    </div>
                    <div>
                        <IconCloudUpload />
                    </div>
                    <input
                        type="file"
                        className="w-full hidden"
                        // onChange={(e) => handleFileUpload(e)}
                    />
                </label>

                <div className="font-semibold">
                    <span>{profile?.name}</span>
                </div>
            </div>
            {/* tabs button*/}
            <div>
                <div className="flex space-x-4">
                    <button
                        className={`p-2 rounded-2xl  ${
                            tab === 1 ? "bg-gray-400" : "bg-alice-blue"
                        }`}
                        onClick={() => setTab(1)}
                    >
                        プロファイル
                    </button>
                    <button
                        className={`p-2 rounded-2xl  ${
                            tab === 2 ? "bg-gray-400" : "bg-alice-blue"
                        }`}
                        onClick={() => setTab(2)}
                    >
                        ポスト
                    </button>
                    <button
                        className={`p-2 rounded-2xl  ${
                            tab === 3 ? "bg-gray-400" : "bg-alice-blue"
                        }`}
                        onClick={() => setTab(3)}
                    >
                        イベント
                    </button>
                </div>
            </div>

            {/* divider */}
            <div>
                <div className="border-b-2 border-alice-blue"></div>
            </div>

            {/* tab */}
            {tabs.map((itemTab) => itemTab.key === tab && itemTab.element)}

            {/* cancel event popup */}
            {isEventCancelModal ? (
                <EventCancelModal
                    closeEventCancelModal={closeEventCancelModal}
                />
            ) : (
                ""
            )}
        </div>
    );
}

export default Profile;
