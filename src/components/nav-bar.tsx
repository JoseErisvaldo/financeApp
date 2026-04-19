import { Link } from "react-router";
import navItems from "../constantes/nav-items";
import { useAuthStore } from "../features/auth/store/auth.store";

export default function NavBar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="bg-green-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">Finanças App</div>
        <div>
          {navItems.map((item) => (
            <Link key={item.name} to={item.to}>
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </span>
            </Link>
          ))}
          <button
            onClick={logout}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
