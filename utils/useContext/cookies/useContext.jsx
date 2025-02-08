import { useState, useEffect, useContext, createContext } from "react";
import { setCookie, getCookie, deleteCookie } from "./cookieUtils"; // Importez vos fonctions de cookies

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    // Récupérer l'utilisateur et le token depuis les cookies
    const [user, setUser] = useState(getCookie("USER_DATA") || null);
    const [token, _setToken] = useState(getCookie("ACCESS_TOKEN") || null);

    // Effet pour récupérer l'utilisateur au montage du composant
    useEffect(() => {
        const savedUser = getCookie("USER_DATA");
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    // Fonction pour mettre à jour le token
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            setCookie("ACCESS_TOKEN", token); // Stocker le token dans un cookie
        } else {
            deleteCookie("ACCESS_TOKEN"); // Supprimer le cookie si le token est null
        }
    };

    // Fonction pour mettre à jour l'utilisateur
    const handleSetUser = (userData) => {
        setUser(userData);
        if (userData) {
            setCookie("USER_DATA", userData); // Stocker l'utilisateur dans un cookie
        } else {
            deleteCookie("USER_DATA"); // Supprimer le cookie si l'utilisateur est null
        }
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser: handleSetUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);