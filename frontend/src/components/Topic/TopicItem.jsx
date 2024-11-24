import { IconEdit } from "@tabler/icons-react";
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

const editTopic = (id) => {
  console.log(`Edit topic with id: ${id}`);
};

const TopicItem = ({ title, id }) => {
  const location = useLocation();
  const isActive = location.pathname === `/topic/${id}`;

  return (
    <Link to={`topic/${id}`}>
      <div
        className={`flex flex-shrink-0 items-center p-3 mb-5 justify-between rounded-xl ${isActive ? "bg-alice-blue" : ""
          }`}
      >
        <h2>{title}</h2>
        <IconEdit stroke={2} size={20} onClick={() => editTopic(id)} />
      </div>
    </Link>
  );
};

TopicItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default TopicItem;
