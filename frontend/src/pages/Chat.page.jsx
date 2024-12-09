import { IconUserPlus } from "@tabler/icons-react";

function ChatPage() {
    return (
        <div className="px-8 py-4">
            {/* header chat */}
            <div className="p-4 flex items-center justify-between space-x-10 bg-alice-blue rounded-lg mb-4 ">
                <div className="flex items-center space-x-2">
                    <div>
                        <img
                            src="https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd."
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                        />
                    </div>
                    <div className="font-medium text-lg">
                        <span>Luan Dinh ne</span>
                    </div>
                </div>

                <div className="hover:text-gray-400 cursor-pointer">
                    <IconUserPlus />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
