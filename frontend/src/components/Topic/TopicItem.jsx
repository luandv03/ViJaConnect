import { IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


// eslint-disable-next-line react/prop-types
const TopicItem = ({ topic }) => {
  const location = useLocation();
  const { profile } = useContext(AuthContext);
  // eslint-disable-next-line react/prop-types
  const { _id, title, author_id } = topic;
  const isActive = location.pathname === `/topic/${_id}`;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditClick = () => {
    if (isEditing) {

      console.log(`Saving topic with _id: ${_id}, new title: ${editedTitle}`);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  console.log(profile._id + " " + author_id);

  return (
    <div
      className={`flex flex-shrink-0 items-center p-3 mb-5 justify-between rounded-xl ${isActive ? "bg-alice-blue" : ""
        }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mr-2 p-2 border rounded-md focus:outline-none"
        />
      ) : (
        // eslint-disable-next-line react/prop-types
        <Link to={`topic/${topic._id}`} className="w-full mr-2">
          <h2 className="truncate">{editedTitle}</h2>
        </Link>

      )}

      {profile._id === author_id && (
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <IconCheck
                stroke={2}
                size={20}
                className="cursor-pointer hover:text-green-600"
                onClick={handleEditClick}
              />
              <IconX
                stroke={2}
                size={20}
                className="cursor-pointer hover:text-red-600"
                onClick={handleCancel}
              />
            </>
          ) : (
            <IconEdit
              stroke={2}
              size={20}
              className="cursor-pointer hover:text-blue-600"
              onClick={handleEditClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TopicItem;
