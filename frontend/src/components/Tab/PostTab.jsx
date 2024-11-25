import { IconTrash } from "@tabler/icons-react";

function PostTab() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((key) => (
                <div className="p-4 flex items-center space-x-4" key={key}>
                    <div className="flex-1 bg-alice-blue rounded-xl p-4">
                        <div>
                            <span>2024-11-25</span>
                        </div>

                        <div>
                            <span>
                                エキサイトブログはおかげさまで、今年20周年を迎えました！
                                これまで支えてくださったエキサイトブロガーの皆様、ありがとうございます！！
                                今後も皆様のブログライフを、より一層楽しく盛り上げていきたいと思います。これからもエキサイトブログをよろしくお願いいたします。
                            </span>
                        </div>
                    </div>

                    <div>
                        <button className="w-9 h-9 bg-alice-blue flex justify-center items-center rounded-full hover:bg-gray-400">
                            <IconTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostTab;
