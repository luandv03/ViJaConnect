import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faBell, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';

const ActionMenu = () => {
  return (
    <div className="flex justify-between items-center space-x-6">
      <FontAwesomeIcon icon={faFacebookMessenger} size='lg'/>
      <FontAwesomeIcon icon={faPlus} size='lg' />
      <FontAwesomeIcon icon={faBell} size='lg' />
      <FontAwesomeIcon icon={faGear} size='lg' />
      <div className="rounded-full bg-slate-400 h-10 w-10"></div>
    </div>
  );
};

export default ActionMenu;
