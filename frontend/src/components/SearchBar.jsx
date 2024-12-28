import { IconSearch } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({ position, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State lưu giá trị tìm kiếm
  const navigate = useNavigate(); // Điều hướng
  const location = useLocation(); // Lấy URL hiện tại

  // Xử lý khi người dùng nhập
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Xử lý khi nhấn Enter hoặc nút tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    const params = new URLSearchParams(location.search); // Lấy các query params hiện tại

    if (searchQuery.trim()) {
      // Nếu có giá trị tìm kiếm, thêm hoặc cập nhật param `query`
      params.set("query", searchQuery);
    } else {
      // Nếu không có giá trị tìm kiếm, xóa param `query` khỏi URL
      params.delete("query");
    }

    // Điều hướng với query param mới
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <form
      className={`flex items-center w-full h-full ${position}`}
      onSubmit={handleSearch} // Xử lý gửi form
    >
      <div className="relative w-full max-w-md">
        <button
          type="submit"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
        >
          <IconSearch stroke={2} size={20} />
        </button>
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery} // Liên kết với state
          onChange={handleInputChange} // Gọi hàm khi nhập
          className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  position: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBar;
