import {
    IconBell,
    IconBrandMessenger,
    IconPlus,
    IconSettings,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const ActionMenu = () => {
    return (
        <div className="flex justify-between items-center space-x-6">
            <IconBrandMessenger stroke={2} />
            <IconPlus stroke={2} />
            <IconBell stroke={2} />
            <IconSettings stroke={2} />
            <Link
                to="/profile"
                className="rounded-full bg-slate-400 h-10 w-10"
            ></Link>
        </div>
    );
};

export default ActionMenu;
