import React, { useState } from "react";
import { IconLock, IconKeyboard, IconBell, IconStar } from "@tabler/icons-react";
import PasswordModal from "./PasswordModal";

const SettingItem = ({ icon, title, description, action }) => {
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md mb-10">
      <div className="flex items-center gap-4">
        <div className="text-gray-600">{icon}</div>
        <div>
          <p className="text-base font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
};


const Setting = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">設定</h2>
      <SettingItem
        icon={<IconLock size={28} />}
        title="パスワード"
        description="セキュリティを強化するには、強力なパスワードを使用する必要があります。"
        action={
          <button className="text-blue-500 text-sm font-bold hover:underline" onClick={() => setShowPasswordModal(true)}>
            パスワードを変更
          </button>
        }
      />
      <SettingItem
        icon={<IconKeyboard size={28} />}
        title="言語"
        description="使用したい言語。"
        action={
          <select className="border border-gray-300 rounded-md text-sm px-4 py-2">
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        }
      />
      <SettingItem
        icon={<IconBell size={28} />}
        title="通知"
        description="最適なエクスペリエンスを得るには、通知をオンにすることをお勧めします。"
        action={
          <select className="border border-gray-300 rounded-md text-sm px-4 py-2">
            <option value="on">オン</option>
            <option value="off">オフ</option>
          </select>
        }
      />
      <SettingItem
        icon={<IconStar size={28} />}
        title="ダークモード"
        description="インターフェースを調整して、まぶしさを軽減し、目を休めます。"
        action={
          <select className="border border-gray-300 rounded-md text-sm px-4 py-2">
            <option value="off">オフ</option>
            <option value="on">オン</option>
          </select>
        }
      />
      {showPasswordModal && (
        <PasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
};


export default Setting;
