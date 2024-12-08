import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function BackPage() {
    const navigate = useNavigate();

    return (
        <button className="hover:bg-alice-blue" onClick={() => navigate(-1)}>
            <IconArrowNarrowLeft />
        </button>
    );
}

export default BackPage;
