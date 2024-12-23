import React from "react";

const PasswordModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white w-96 p-6 rounded-lg relative">
        {/* Nút đóng */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Tiêu đề */}
        <h2 className="text-lg font-bold mb-4">パスワードを変更</h2>

        {/* Form */}
        <form>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="現在パスワード"
              className="w-full px-4 py-2 rounded-full bg-gray-200 text-black focus:outline-none"
            />
            <input
              type="password"
              placeholder="新しいパスワード"
              className="w-full px-4 py-2 rounded-full bg-gray-200 text-black focus:outline-none"
            />
            <input
              type="password"
              placeholder="新しいパスワードを確認"
              className="w-full px-4 py-2 rounded-full bg-gray-200 text-black focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-black text-white py-2 rounded-full hover:bg-gray-700"
          >
            パスワードを変更
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
