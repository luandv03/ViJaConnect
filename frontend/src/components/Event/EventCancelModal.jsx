import { IconX } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
function EventCancelModal({ closeEventCancelModal }) {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-over-layer mt-0">
            <div className="min-w-96 bg-white p-2 rounded-xl space-y-4">
                <div
                    className="flex justify-end cursor-pointer"
                    onClick={() => closeEventCancelModal()}
                >
                    <IconX />
                </div>
                <div className="bg-alice-blue rounded-3xl">
                    <div className="p-2">
                        <input
                            className="w-full bg-alice-blue rounded-3xl p-x-8 outline-none resize-none"
                            placeholder="理由を入力してください"
                        ></input>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <button
                        className="min-h-8 bg-gray-400 hover:opacity-70 p-2 rounded-3xl"
                        onClick={() => closeEventCancelModal()}
                    >
                        <span>キャンセルを確認</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventCancelModal;
