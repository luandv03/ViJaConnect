import { IconPhotoFilled } from "@tabler/icons-react";
import { Button } from "../ui/Button";

// eslint-disable-next-line react/prop-types
function TopicCreate({ closeTopicCreatedModal }) {
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
                        <label className="flex w-full justify-center min-h-8 items-center space-x-2 cursor-pointer">
                            <Button className="w-full" variant="outline">
                                <span>写真/ビデオを追加する</span>
                                <IconPhotoFilled />
                                <input
                                    type="file"
                                    className="hidden"
                                    // onChange={(e) => handleFileUpload(e)}
                                />
                            </Button>
                        </label>
                    </div>
                </div>

                <div className="flex justify-between space-x-4">
                <Button
                        className="w-1/2"
                        variant="destructive"
                        onClick={() => closeTopicCreatedModal()}
                    >
                        キャンセル
                    </Button>
                    <Button
                        className="w-1/2"
                        onClick={() => closeTopicCreatedModal()}
                    >
                        ポスト
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TopicCreate;
