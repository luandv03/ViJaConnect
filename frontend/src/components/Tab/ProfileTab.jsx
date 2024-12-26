import { useState, useContext } from "react";

import { AuthContext } from "../../providers/AuthProvider";

function ProfileTab() {
    const { profile } = useContext(AuthContext);
    const [newProfile, setNewProfile] = useState(profile);

    const handleChangeProfile = (e) => {
        setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="flex space-x-12">
                <div className="space-y-8">
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">メール</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            name="email"
                            value={newProfile?.email}
                            onChange={handleChangeProfile}
                        />
                    </div>
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">部門</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            name="department"
                            value={newProfile?.department}
                            onChange={handleChangeProfile}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">表示名</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            name="display_name"
                            value={newProfile?.display_name}
                            onChange={handleChangeProfile}
                        />
                    </div>
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">電話番号</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            name="phone_number"
                            value={newProfile?.phone_number}
                            onChange={handleChangeProfile}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">ロケーション</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            name="address"
                            value={newProfile?.address}
                            onChange={handleChangeProfile}
                        />
                    </div>
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">ロール</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            name="company_role"
                            value={newProfile?.company_role}
                            onChange={handleChangeProfile}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-alice-blue p-2 rounded-xl hover:bg-gray-400">
                    プロファイルを編集
                </button>
            </div>
        </>
    );
}

export default ProfileTab;
