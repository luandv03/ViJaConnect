import { createContext, useEffect, useState, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
    isAuthenticated: false,
    profile: {
        user_id: 0,
        email: "",
        fullname: "",
        address: "",
        phone_number: "",
        dob: "",
    },
    setProfile: () => {},
    setIsAuthenticated: () => {},
});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [profile, setProfile] = useState(
        localStorage.getItem("profile")
            ? JSON.parse(localStorage.getItem("profile"))
            : {
                  user_id: 0,
                  email: "",
                  fullname: "",
                  address: "",
                  phone_number: "",
                  dob: "",
                  avatar_link: "",
              }
    );
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated")
            ? localStorage.getItem("isAuthenticated")
            : false
    );

    const handleFetchProfile = useCallback(() => {
        setProfile(
            localStorage.getItem("profile")
                ? JSON.parse(localStorage.getItem("profile"))
                : {
                      user_id: 0,
                      email: "",
                      fullname: "",
                      address: "",
                      phone_number: "",
                      dob: "",
                      avatar_link: "",
                  }
        );
        setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    }, []);

    useEffect(() => {
        handleFetchProfile();
    }, [handleFetchProfile]);

    return (
        <AuthContext.Provider
            value={{ profile, setProfile, isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}
