import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { authService } from "../services/auth.service";
import { AuthContext } from "../providers/AuthProvider";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const { setIsAuthenticated, setProfile } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        const validationErrors = {};
        if (!formData.email)
            validationErrors.email = "メールアドレスを入力してください";
        if (!formData.password)
            validationErrors.password = "パスワードを入力してください";

        console.log("loginn");

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const res = await authService.signin(formData);

        if (res.status === 200) {
            localStorage.setItem("profile", JSON.stringify(res.data.user));
            localStorage.setItem("isAuthenticated", true);
            setIsAuthenticated(true);
            setProfile(res.data.user);
            toast.success("ログインしました");
        } else {
            if (res.status === 404) {
                setErrors({ password: "アカウントが存在しません" });
                toast.error("アカウントが存在しません");
            }
            if (res.status === 401) {
                setErrors({ password: "パスワードが正しくありません" });
                toast.error("パスワードが正しくありません");
            }
        }
    };

    return (
        <section className="w-2/4 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            ログイン
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 md:space-y-6"
                            action="#"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    メールアドレス
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required=""
                                />
                                {errors.email && (
                                    <span className="text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    パスワード
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required=""
                                />
                                {errors.password && (
                                    <span className="text-red-500">
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full btn btn-lg bg-black text-white hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                ログイン
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
