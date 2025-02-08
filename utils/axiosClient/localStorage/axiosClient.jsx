import axios from "axios";

const axiosClient = axios.create({
    baseURL : "http://127.0.0.1:8000/api/bsp"
});


axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
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


// axiosClient.interceptors.response.use((response) =>{ 
//         return response;
//     },
//     (error)=>{
//         try{
//             const {response} = error;
//             if(response && error.status === 401){
//                 localStorage.removeItem('ACCESS_TOKEN')
//                 window.location.href = "/login";
//             }
//         }catch(err){
//             console.error(err)
//         }
//         throw error;
//     }
// )
export default axiosClient;