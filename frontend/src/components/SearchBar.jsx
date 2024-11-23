import { IoMdSearch } from "react-icons/io";
const SearchBar = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-full max-w-md">
        <button
          type="button"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
        >
          <IoMdSearch />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

export default SearchBar;
