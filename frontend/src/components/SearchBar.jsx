import { IconSearch } from "@tabler/icons-react";
import PropTypes from 'prop-types';
const SearchBar = ({position, placeholder}) => {
  return (
    <div className={`flex items-center w-full h-full ${position}`}>
      <div className="relative w-full max-w-md">
        <button
          type="button"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
        >
          <IconSearch stroke={2} size={20} />
        </button>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
SearchBar.propTypes = {
  position: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBar;
