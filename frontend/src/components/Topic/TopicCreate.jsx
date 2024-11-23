import { IconPhotoFilled } from "@tabler/icons-react";

function TopicCreate() {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-over-layer mt-0">
            <div className="min-w-96 bg-white p-2 rounded-md space-y-2">
                <div className="bg-alice-blue rounded-md">
                    <div className="p-2">
                        <textarea
                            className="w-full bg-alice-blue min-h-24 rounded-md p-x-8 outline-none resize-none"
                            name=""
                            id=""
                            placeholder="新しいトピックを作成する"
                        ></textarea>
                    </div>

                    <div className="w-full p-2">
                        <button className="flex w-full justify-center min-h-8 bg-gray-400 rounded-md items-center hover:opacity-70 space-x-2">
                            <div>
                                <span>写真/ビデオを追加する</span>
                            </div>
                            <div>
                                <IconPhotoFilled />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between space-x-4">
                    <button className="w-1/2 rounded-md min-h-8 bg-alice-blue hover:opacity-70">
                        <span>キャンセル</span>
                    </button>
                    <button className="w-1/2 rounded-md min-h-8 bg-gray-400 hover:opacity-70">
                        <span>ポスト</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopicCreate;
