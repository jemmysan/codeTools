import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";

const Dashboard = () => {

    const { session, logout} = UserAuth();
    const navigate = useNavigate();
    
    console.log(session)

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate('/login')
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-slate-700">EcoTrack</div>
        <nav className="mt-6">
          <a href="#" className="block py-3 px-6 bg-slate-700 text-white">Tableau de bord</a>
          <a href="#" className="block py-3 px-6 text-slate-300 hover:bg-slate-700">Mon Profil</a>
          <a href="#" className="block py-3 px-6 text-slate-300 hover:bg-slate-700">Paramètres</a>
          <button onClick={ handleLogout } className="w-full text-left py-3 px-6 text-red-400 hover:bg-slate-700">Déconnexion</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Bienvenue, Utilisateur 👋{ session?.user?.email} </h1>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm">Projets Actifs</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm">Émissions CO2</h3>
              <p className="text-3xl font-bold text-green-600">-15%</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm">Alertes</h3>
              <p className="text-3xl font-bold text-red-500">2</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;