import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import SearchBar from "./SearchBar";
import ActionMenu from "./Sidebar/ActionMenu";

const Header = ({ profile }) => {
    return (
        <>
            <header>
                <div className="flex items-center justify-center h-16 w-full fixed bg-white z-20">
                    <Link
                        to={profile?.role_id?.name === "Admin" ? "/admin" : "/"}
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
Header.propTypes = {
    profile: PropTypes.shape({
        role_id: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};

export default Header;
