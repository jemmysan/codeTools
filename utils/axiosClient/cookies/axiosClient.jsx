import axios from "axios";
import { getCookie, deleteCookie } from "./cookieUtils"; // Importez vos fonctions de cookies

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/bsp"
});

// Intercepteur de requête
axiosClient.interceptors.request.use((config) => {
    const token = getCookie("ACCESS_TOKEN"); // Récupérer le token depuis les cookies
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur de réponse
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 401) {
                // Supprimer le token des cookies en cas d'erreur 401
                deleteCookie("ACCESS_TOKEN");
                // Rediriger vers la page de login
                window.location.href = "/login";
            } else {
                console.error(`Erreur HTTP ${response.status}: ${response.statusText}`);
                alert(`Une erreur est survenue : ${response.statusText}`);
            }
        } else {
            console.error("Erreur réseau ou serveur indisponible.");
        }
        throw error;
    }
);

export default axiosClient;