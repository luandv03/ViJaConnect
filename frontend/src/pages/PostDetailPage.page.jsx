import { IconSearch } from "@tabler/icons-react";

import { PostDetail } from "../components/Post";
import { CommentCreate, CommentDetail } from "../components/Comment";

function PostDetailPage() {
    return (
        <div className="p-4 space-y-4">
            <PostDetail />

            <CommentCreate />

            <div className="flex w-80 bg-alice-blue rounded-md h-8 align-middle p-2 text-sm">
                <div>
                    <IconSearch size={20} />
                </div>
                <input
                    type="text"
                    className="flex-1 bg-alice-blue outline-none"
                    placeholder="コメントを検索"
                />
            </div>

            {[1, 2, 3, 4].map((index) => (
                <CommentDetail key={index} />
            ))}
        </div>
    );
}

export default PostDetailPage;
