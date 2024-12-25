import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import ActionMenu from "./Sidebar/ActionMenu";

const Header = () => {
    return (
        <>
            <header>
                <div className="flex items-center justify-center h-16 w-full fixed bg-white">
                    <Link
                        to="/"
                        className="h-full min-w-96 flex justify-center items-center font-bold text-3xl border-b border-r border-gray-200"
                    >
                        ViJaConnect
                    </Link>
                    <div className="w-1/2 h-full border-b border-gray-200">
                        <SearchBar
                            position="justify-center"
                            placeholder="検索"
                        />
                    </div>
                    <div className="flex-1 h-full border-b border-gray-200 flex items-center justify-end pr-12">
                        <ActionMenu />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
