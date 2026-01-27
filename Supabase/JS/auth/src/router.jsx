import { createBrowserRouter } from 'react-router-dom'
import { Login } from './components/login'
import { Register } from './components/register'
import App from './App';
import { Dashboard } from './components/dashboard';

export const router = createBrowserRouter([
    { path : '/', element : <App/>},
    { path : '/register', element : <Register/>},
    { path : '/login', element : <Login/>},
    { path : '/dashboard', element : <Dashboard/>},
])