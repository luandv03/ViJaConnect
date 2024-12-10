import { useLocation } from "react-router-dom";
import { EventItem, EventCreate } from "../components/Event";

const Event = () => {
    const location = useLocation();
    const isAdmin = location.pathname.includes("admin");

    const eventItem = [
        {
            id: 1,
            name: "ベトナム文化交流フェスティバル",
            date: "2024-05-02",
            banner: "https://meetsvietnam.vietnamairlines.com/wp-content/uploads/2024/07/448504984_870598721767452_1562326102109704185_n.jpg",
        },
        {
            id: 2,
            name: "日本語学習ワークショップ",
            date: "2024-06-15",
            banner: "https://d19ri4mdy82u9u.cloudfront.net/images/64abca6c03c3da4c3afee054/UJSXbBSAK1ZFltyiaC2M.jpg",
        },
        {
            id: 3,
            name: "日越料理試食会",
            date: "2024-07-10",
            banner: "https://www.tsttourist.com/vnt_upload/news/09_2023/thumbs/(600x400)_TSTtourist_van_hoa_am_thuc_Nhat_Ban.jpg",
        },
        {
            id: 4,
            name: "ベトナム伝統音楽コンサート",
            date: "2024-08-05",
            banner: "https://wkvetter.com/wp-content/uploads/41th-Hanoi-Ongakutai-Naoko-1024x1024.jpg",
        },
        {
            id: 5,
            name: "日本映画上映＆ディスカッション",
            date: "2024-09-20",
            banner: "https://www.oaff.jp/2018/img/report/15_c12_1.jpg",
        },
    ];
    return (
        <>
            <div>
                <div className="px-8 py-4">
                    {<EventCreate />}
                    <div>
                        {eventItem.map((item) => (
                            <EventItem key={item.id} event={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
