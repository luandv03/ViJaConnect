import { Link, useLocation } from "react-router-dom";
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
            details:
                "このフェスティバルでは、ベトナムの伝統文化、衣装、料理、音楽を楽しむことができます。地元のアーティストが参加し、文化交流を促進します。",
            location: "ハノイ文化センター (Hanoi Cultural Center)",
        },
        {
            id: 2,
            name: "日本語学習ワークショップ",
            date: "2024-06-15",
            banner: "https://d19ri4mdy82u9u.cloudfront.net/images/64abca6c03c3da4c3afee054/UJSXbBSAK1ZFltyiaC2M.jpg",
            details:
                "このワークショップでは、日本語の基本フレーズや会話を学びます。初心者から中級者まで参加可能です。講師は経験豊富な日本語教師です。",
            location: "東京国際交流館 (Tokyo International Exchange Center)",
        },
        {
            id: 3,
            name: "日越料理試食会",
            date: "2024-07-10",
            banner: "https://www.tsttourist.com/vnt_upload/news/09_2023/thumbs/(600x400)_TSTtourist_van_hoa_am_thuc_Nhat_Ban.jpg",
            details:
                "このイベントでは、ベトナム料理と日本料理の試食が楽しめます。それぞれの料理の作り方も学べるクラスがあります。",
            location: "ハノイ料理アカデミー (Hanoi Culinary Academy)",
        },
        {
            id: 4,
            name: "ベトナム伝統音楽コンサート",
            date: "2024-08-05",
            banner: "https://wkvetter.com/wp-content/uploads/41th-Hanoi-Ongakutai-Naoko-1024x1024.jpg",
            details:
                "ベトナム伝統音楽を楽しむコンサートです。有名なアーティストや地元のグループが出演し、心温まる音楽をお届けします。",
            location: "ホーチミン市音楽ホール (Ho Chi Minh City Music Hall)",
        },
        {
            id: 5,
            name: "日本映画上映＆ディスカッション",
            date: "2024-09-20",
            banner: "https://www.oaff.jp/2018/img/report/15_c12_1.jpg",
            details:
                "日本の映画を上映した後、参加者同士でその内容についてディスカッションを行います。映画好きの方におすすめです。",
            location: "大阪映画センター (Osaka Film Center)",
        },
        {
            id: 6,
            name: "ベトナムの伝統舞踊ワークショップ",
            date: "2024-10-10",
            banner: "https://i.imgur.com/Q9BQZ8h.jpg",
            details:
                "ベトナムの伝統舞踊を体験できるワークショップです。初心者でも楽しく踊れるように、プロのインストラクターが指導します。",
            location: "ハノイ舞踊スタジオ (Hanoi Dance Studio)",
        },
        {
            id: 7,
            name: "日本の茶道体験",
            date: "2024-11-15",
            banner: "https://i.imgur.com/9WEPzOA.jpg",
            details:
                "日本の伝統的な茶道を体験できます。お茶の入れ方や作法を学びながら、日本文化に触れることができます。",
            location: "京都茶道会館 (Kyoto Tea Ceremony Center)",
        },
    ];

    return (
        <>
            <div>
                <div className="px-8 py-4">
                    {isAdmin && <EventCreate />}
                    <div>
                        {eventItem.map((item) => (
                            <Link key={item.id} to={`/event/${item.id}`}>
                                <EventItem event={item} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
