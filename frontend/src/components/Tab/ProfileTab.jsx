function ProfileTab() {
    return (
        <>
            <div className="flex space-x-12">
                <div className="space-y-8">
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">メール</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            value="gundam@gmail.com"
                        />
                    </div>
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">部門</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            value="IT"
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">表示名</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            value="Gundam"
                        />
                    </div>
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">電話番号</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            value="0123456789"
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">ロケーション</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            value="Ha Noi"
                        />
                    </div>
                    <div className="w-60 flex flex-col space-y-2">
                        <label htmlFor="">ロール</label>
                        <input
                            className="w-full h-8 outline-none rounded-xl bg-alice-blue px-2"
                            type="text"
                            value="DEV"
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
