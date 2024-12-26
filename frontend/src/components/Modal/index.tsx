import { IconDiamondsFilled } from "@tabler/icons-react";
import React from "react";

const BadgeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Nếu không mở modal, không render gì cả

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-2xl w-[860px] relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
          ポイント計算ルール
        </h2>

        <div className="mb-6 text-gray-700 space-y-2">
          <p>1. 記事投稿: <span className="font-medium text-green-600">+10 ポイント</span></p>
          <p>2. ポストディスカッションまたはイベントに参加: <span className="font-medium text-green-600">+15 ポイント</span></p>
        </div>

        {/* Bảng */}
        <h3 className="text-lg font-medium mb-4 text-indigo-500">
          ポイントに基づくバッジランク
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="table-fixed w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50">
                <th className="px-4 py-3 text-sm font-semibold text-gray-600 w-1/5">
                  バッジ
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600 w-1/5">
                  必要ポイント
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  説明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-indigo-100">
                <td className="px-4 py-3 text-gray-800 align-middle">
                  <div className="flex items-center">
                    <IconDiamondsFilled className="text-[#8B4513]" />
                    ブロンズ
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 align-middle">0 - 99</td>
                <td className="px-4 py-3 text-gray-600 align-middle break-words">
                  新しく参加したユーザーで、バッジのレベルアップを目指してポイントを貯めている
                </td>
              </tr>
              <tr className="hover:bg-indigo-100">
                <td className="px-4 py-3 text-gray-800 align-middle">
                  <div className="flex items-center">
                    <IconDiamondsFilled className="text-[#C0C0C0]" />
                    シルバー
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 align-middle">100 - 299</td>
                <td className="px-4 py-3 text-gray-600 align-middle break-words">
                  定期的に活動し、積極的に貢献しているユーザー
                </td>
              </tr>
              <tr className="hover:bg-indigo-100">
                <td className="px-4 py-3 text-gray-800 align-middle">
                  <div className="flex items-center">
                    <IconDiamondsFilled className="text-[#FFD700]" />
                    ゴールド
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 align-middle">300 - 599</td>
                <td className="px-4 py-3 text-gray-600 align-middle break-words">
                  目立つ活動をしているユーザーで、コミュニティに大きな貢献をしている
                </td>
              </tr>
              <tr className="hover:bg-indigo-100">
                <td className="px-4 py-3 text-gray-800 align-middle">
                  <div className="flex items-center">
                    <IconDiamondsFilled className="text-[#00FFFF]" />
                    ダイヤモンド
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 align-middle">600+</td>
                <td className="px-4 py-3 text-gray-600 align-middle break-words">
                  優秀なメンバーで、コミュニティの発展に大きな貢献をしている
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default BadgeModal;
