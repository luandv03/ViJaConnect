import { IconCirclePlus } from "@tabler/icons-react";
import PostItem from "../components/Post/PostItem";

function Home() {
    return (
        <>
            <div>
                <div className="px-8 py-4">
                    <div className='p-4 flex items-center space-x-10 bg-alice-blue rounded-lg mb-4'>
                        <IconCirclePlus stroke={2} />
                        <div>新しいポストを作成する</div>
                    </div>
                    <div>
                        {Array.from({ length: 5 }, (_, i) => (
                            <PostItem key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
