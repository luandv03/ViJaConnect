import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { Button } from "../ui/Button";
import { topicService } from "../../services/topic.service";
import { AuthContext } from "../../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
function TopicCreate({ closeTopicCreatedModal }) {
    const [topic, setTopic] = useState({ title: "", desc: "", author_id: "" });
    const { profile } = useContext(AuthContext);

    const handleChangeTopic = (e) => {
        setTopic({
            title: e.target.value,
            desc: e.target.value,
            author_id: profile._id,
        });
    };

    const handleCreateTopic = async () => {
        try {
            if (topic.title === "" || topic.desc === "") return;

            const res = await topicService.createTopic(topic);
            if (res.status === 201) {
                closeTopicCreatedModal();
                toast("トピックが作成されました");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                            value={topic.title}
                            onChange={(e) => handleChangeTopic(e)}
                        ></textarea>
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
                        onClick={() => handleCreateTopic()}
                    >
                        ポスト
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TopicCreate;
