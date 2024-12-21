import { useState } from "react";
import { IconCirclePlus, IconCloudUpload } from "@tabler/icons-react";
import { Button } from "../ui/Button";

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

            {/* {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md relative w-1/2"></div>
                </div>
            )} */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-over-layer mt-0">
                    <div className="min-w-96 bg-white p-2 rounded-xl space-y-4">
                        <div>
                            <h3>新しいイベントを追加</h3>
                        </div>
                        <div>
                            <div className="bg-none">
                                <div className="p-0">
                                    <input
                                        className="w-full bg-none  p-x-8 outline-none"
                                        placeholder="イベント名を入力"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="border-b-2 border-gray-400"></div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-none">
                                <div className="p-0">
                                    <input
                                        className="w-full bg-none  p-x-8 outline-none"
                                        placeholder="イベントの時間を入力"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="border-b-2 border-gray-400"></div>
                            </div>
                        </div>

                        <div className="flex h-24 w-full bg-alice-blue rounded-md items-center justify-center relative">
                            <div className="flex w-full justify-center">
                                <span className="text-center">
                                    イベントバナー
                                </span>
                            </div>

                            <label className="items-end absolute right-2 bottom-2 cursor-pointer">
                                <IconCloudUpload />
                                <input type="file" className="hidden" />
                            </label>
                        </div>

                        <div>
                            <div className="bg-none">
                                <div className="p-0">
                                    <input
                                        className="w-full bg-none  p-x-8 outline-none"
                                        placeholder="イベントの説明を入力"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="border-b-2 border-gray-400"></div>
                            </div>
                        </div>

                        <div className="flex w-full space-x-2 mt-10">
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
                                onClick={closeModal}
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
