import { useState } from "react";
import { IconSearch, IconTrash, IconPencil } from "@tabler/icons-react";

// Danh sách roles và users như cũ...
const insertedRoles = [{ _id: "Staff" }, { _id: "Manager" }, { _id: "Admin" }];
const usersData = [
    {
        _id: "676c5ca80137d9539987bc30",
        name: "グエン・ザ・トゥン・ゾオン",
        email: "duong.gt@vijaconnect.com",
        phone_number: "0912345678",
        password: "luandeptrai",
        display_name: "グエン・ザ・トゥン・ゾオン",
        department: "IT",
        address: "123 Main St",
        company_role: "Developer",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "jap",
        },
        contacts: [],
        point: 50,
    },
    {
        _id: "676c5ca80137d9539987bc31",
        name: "ホアン・ドゥック・ザ・フン",
        email: "hunghdg@vijaconnect.com",
        phone_number: "0867888888",
        password: "luandeptrai",
        display_name: "ホアン・ドゥック・ザ・フン",
        department: "IT",
        address: "123 Main St",
        company_role: "Developer",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f9bac0669c9.",
        role_id: insertedRoles[1]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "jap",
        },
        contacts: [],
        point: 50,
    },
    {
        _id: "676c5ca80137d9539987bc32",
        name: "管理者",
        email: "admin@vijaconnect.com",
        phone_number: "0867888888",
        password: "luandeptrai",
        display_name: "管理者",
        department: "IT",
        address: "123 Main St",
        company_role: "Developer",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd.",
        role_id: insertedRoles[2]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "jap",
        },
        contacts: [],
        point: 100,
    },
    {
        _id: "676c5ca80137d9539987bc33",
        name: "チュー・ディン・ヒエン",
        email: "hien.cv@vijaconnect.com",
        phone_number: "0867888888",
        password: "luandeptrai",
        display_name: "チュー・ディン・ヒエン",
        department: "IT",
        address: "123 Main St",
        company_role: "Developer",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "jap",
        },
        contacts: [],
        point: 50,
    },
    {
        _id: "676c5ca80137d9539987bc34",
        name: "グエン・ドゥック・フ",
        email: "phu.nd@vijaconnect.com",
        phone_number: "0867888888",
        password: "luandeptrai",
        display_name: "グエン・ドゥック・フ",
        department: "IT",
        address: "123 Main St",
        company_role: "Developer",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "jap",
        },
        contacts: [],
        point: 50,
    },
    {
        _id: "676c5ca80137d9539987bc35",
        name: "レ・バー・チョン",
        email: "trong.lb@vijaconnect.com",
        phone_number: "0845123456",
        password: "luandeptrai",
        display_name: "レ・バー・チョン",
        department: "IT",
        address: "456 Elm St",
        company_role: "Tester",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/630e08f3c6416.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: true,
            language: "jap",
        },
        contacts: [],
        point: 70,
    },
    {
        _id: "676c5ca80137d9539987bc36",
        name: "ド・ヴァン・フォン",
        email: "phong.dv@vijaconnect.com",
        phone_number: "0934765432",
        password: "luandeptrai",
        display_name: "ド・ヴァン・フォン",
        department: "HR",
        address: "789 Oak St",
        company_role: "HR Manager",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/64a7e2cfcab63.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: false,
            dark_mode: false,
            language: "eng",
        },
        contacts: [],
        point: 85,
    },
    {
        _id: "676c5ca80137d9539987bc37",
        name: "グエン・ディン・ヒエウ",
        email: "hieu.nd@vijaconnect.com",
        phone_number: "0923456789",
        password: "luandeptrai",
        display_name: "グエン・ディン・ヒエウ",
        department: "Finance",
        address: "101 Pine St",
        company_role: "Accountant",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/6162e78d13086.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "jap",
        },
        contacts: [],
        point: 90,
    },
    {
        _id: "676c5ca80137d9539987bc38",
        name: "ゾオン・チュン・キエン",
        email: "kien.dt@vijaconnect.com",
        phone_number: "0987654321",
        password: "luandeptrai",
        display_name: "ゾオン・チュン・キエン",
        department: "IT",
        address: "123 Cherry St",
        company_role: "Designer",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6.",
        role_id: insertedRoles[0]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: true,
            language: "eng",
        },
        contacts: [],
        point: 60,
    },
    {
        _id: "676c5ca80137d9539987bc39",
        name: "ディン・ヴァン・ルアン",
        email: "luan.dv@vijaconnect.com",
        phone_number: "0951234567",
        password: "luandeptrai",
        display_name: "ディン・ヴァン・ルアン",
        department: "Marketing",
        address: "456 Maple St",
        company_role: "SEO Specialist",
        avatar_link:
            "https://schooler.sun-asterisk.com/storage/images/avatar/student/63083b4681ab9.",
        role_id: insertedRoles[1]._id,
        shared_posts: [],
        liked_posts: [],
        settings: {
            notification: true,
            dark_mode: false,
            language: "eng",
        },
        contacts: [],
        point: 75,
    },
];

export default function UserManagement() {
    const [users, setUsers] = useState(usersData); // Trạng thái danh sách người dùng
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
    const [editingUser, setEditingUser] = useState(null); // Trạng thái người dùng đang chỉnh sửa

    // Xử lý tìm kiếm
    const filteredUsers = users.filter(
        (user) =>
            user.name.includes(searchQuery) || user.email.includes(searchQuery)
    );

    // Xử lý xóa
    const handleDelete = (id) => {
        if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            setUsers(users.filter((user) => user._id !== id));
        }
    };

    // Xử lý chỉnh sửa
    const handleEdit = (user) => {
        setEditingUser(user); // Lưu thông tin người dùng vào trạng thái
    };

    // Lưu chỉnh sửa
    const saveEdit = (updatedUser) => {
        setUsers(
            users.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
            )
        );
        setEditingUser(null); // Thoát chế độ chỉnh sửa
    };

    return (
        <div>
            <div className="px-8 py-4 space-y-4">
                {/* Tìm kiếm */}
                <div className="relative w-full max-w-md">
                    <button
                        type="submit"
                        className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500"
                    >
                        <IconSearch stroke={2} size={20} />
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ユーザーを見つける"
                        className="w-60 pl-10 py-1 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Bảng danh sách */}
                <div className="bg-alice-blue p-5 rounded-lg mb-5">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300 text-left">
                                    ユーザー名
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-left">
                                    電子メール
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-left">
                                    ルール
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-left">
                                    アクション
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 border border-gray-300">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {user.role_id}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 space-x-1">
                                            <button
                                                onClick={() =>
                                                    handleDelete(user._id)
                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                <IconTrash />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                            >
                                                <IconPencil />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        ユーザーがありません。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Form chỉnh sửa */}
                {editingUser && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-bold">
                            ユーザーをエディット
                        </h3>
                        <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    name: e.target.value,
                                })
                            }
                            className="block w-full mt-2 mb-4 px-2 py-1 border rounded"
                        />
                        <input
                            type="text"
                            value={editingUser.email}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    email: e.target.value,
                                })
                            }
                            className="block w-full mb-4 px-2 py-1 border rounded"
                        />
                        <button
                            onClick={() => saveEdit(editingUser)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            登録
                        </button>
                        <button
                            onClick={() => setEditingUser(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
                        >
                            キャンセル
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
