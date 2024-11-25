import { IconCalendarMonth, IconMapPinFilled } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
function EventTab({ showEventCancelModal }) {
    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <div>
                    <button className="p-2 bg-alice-blue flex justify-center items-center rounded-full ">
                        今後の
                    </button>
                </div>
                <div className="flex space-x-4 items-center">
                    <div className="flex flex-1 flex-col p-2 bg-alice-blue rounded-xl space-y-2">
                        <div className="flex space-x-2">
                            <div className="w-6 text-center">
                                <span>AI</span>
                            </div>
                            <div>
                                <span>セミナー</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div>
                                <IconCalendarMonth />
                            </div>
                            <div>
                                <span>月曜日、2024-11-25 15:00</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div>
                                <IconMapPinFilled />
                            </div>
                            <div>
                                <span>Ha Noi</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button className="p-2 bg-alice-blue flex justify-center items-center rounded-full hover:bg-gray-400">
                            参加をやめる
                        </button>

                        {/* <button
                            className="p-2 bg-alice-blue flex justify-center items-center rounded-full hover:bg-gray-400"
                            onClick={() => showEventCancelModal()}
                        >
                            キャンセル
                        </button> */}
                    </div>
                </div>
            </div>

            {/* divider */}
            <div>
                <div className="border-b-2 border-alice-blue"></div>
            </div>

            <div className="space-y-4">
                <div>
                    <button className="p-2 bg-alice-blue flex justify-center items-center rounded-full ">
                        作成した
                    </button>
                </div>
                <div className="flex space-x-4 items-center ">
                    <div className="flex flex-1 flex-col p-2 bg-alice-blue rounded-xl space-y-2">
                        <div className="flex space-x-2">
                            <div className="text-center">
                                <span>Machine Learning</span>
                            </div>
                            <div>
                                <span>セミナー</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div>
                                <IconCalendarMonth />
                            </div>
                            <div>
                                <span>水曜日、2021-11-26 12:00</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div>
                                <IconMapPinFilled />
                            </div>
                            <div>
                                <span>Ha Noi</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 items-center">
                    <div className="flex flex-1 flex-col p-2 bg-alice-blue rounded-xl space-y-2">
                        <div className="flex space-x-2">
                            <div className="text-center">
                                <span>Go Japan</span>
                            </div>
                            <div>
                                <span>ワークショップ</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div>
                                <IconCalendarMonth />
                            </div>
                            <div>
                                <span>金曜日、2021-11-29 12:00</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div>
                                <IconMapPinFilled />
                            </div>
                            <div>
                                <span>Ha Noi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventTab;
