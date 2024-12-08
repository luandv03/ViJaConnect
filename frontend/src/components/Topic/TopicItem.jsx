import { IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TopicItem = ({ title, id }) => {
  const location = useLocation();
  const isActive = location.pathname === `/topic/${id}`;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditClick = () => {
    if (isEditing) {
      console.log(`Saving topic with id: ${id}, new title: ${editedTitle}`);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex flex-shrink-0 items-center p-3 mb-5 justify-between rounded-xl ${
        isActive ? "bg-alice-blue" : ""
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
        <Link to={`topic/${id}`} className="w-full mr-2">
          <h2>{editedTitle}</h2>
        </Link>
      )}

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
    </div>
  );
};

TopicItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default TopicItem;
