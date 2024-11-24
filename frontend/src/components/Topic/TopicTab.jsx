import { IconPlus } from '@tabler/icons-react';
import PropTypes from 'prop-types';

const TopicTab = ({ title, id }) => {
  const addPost = (id) => () => {
    console.log(id);
  }
  return (
    <>
      <div className="flex items-center bg-white p-2 rounded-lg">
        <h3>{title}</h3>
        <IconPlus stroke={2} size={20} onClick={addPost(id)} />
      </div>
    </>
  );
}

TopicTab.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default TopicTab;
