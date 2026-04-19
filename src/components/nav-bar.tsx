import { Link } from "react-router";
import navItems from "../constantes/nav-items";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div>
          {navItems.map((item) => (
            <Link key={item.name} to={item.to}>
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
