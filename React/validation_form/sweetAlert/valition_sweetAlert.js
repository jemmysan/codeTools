import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";




function Login() {

    const { setUser, setToken } = useStateContext();

    const [formData, setFormData] = useState({email: '', password: ''});

    const [errors, setErrors] = useState({});
    
    const MySwal = withReactContent(Swal)

    const validateField = (name, value) => {
        let errorMessage = '';

        if (name === 'email') {
            if (!value.trim()) {
                errorMessage = 'Email est requis';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errorMessage = "L'email n'est pas valide";
            }
        }

        if (name === 'password') {
            if (!value.trim()) {
                errorMessage = 'Mot de passe est requis';
            } else if (value.length < 8) {
                errorMessage = 'Le mot de passe doit contenir au moins 8 caractères';
            }
        }

        return errorMessage;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: errorMessage });
    };


  

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifiez si des erreurs existent encore
        const validationErrors = {};

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) validationErrors[key] = error;
        });

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            MySwal.fire({
                title: 'Connexion en cours...',
                allowOutsideClick: false,
                customClass : {
                    title : 'text-primary'
                },
                didOpen: () => {
                    MySwal.showLoading();
                },
            });
            axiosClient.post('/login', formData).then(({ data }) => {
                setUser(data.user);
                setToken(data.token);

                MySwal.fire({
                    icon: 'success',
                    title: 'Connexion réussie',
                    showConfirmButton: false, 
                    customClass : {
                        title : 'text-primary text-xl'
                    },
                    timer: 2000
                });

            }).catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                   setErrors(response.data);
                }
                MySwal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Informations d\'authentification incorrectes ',
                    customClass: {
                        icon : 'text-red-first',
                        title: 'text-red-first font-bold text-lg', // Style du titre
                        htmlContainer: 'text-red-first text-md', // Style du texte
                        confirmButton: 'bg-primary hover:bg-blue-first text-white font-medium py-2 px-4 rounded-lg', // Style du bouton
                    },
                    buttonsStyling: false,
                    showConfirmButton: false, 
                    timer : 3000
                });
            });
        }
    };
}
    


    