import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import navItems from "../constantes/nav-items";
import { useAuthStore } from "../features/auth/store/auth.store";

export default function NavBar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-semibold text-green-900">Finanças App</p>
            <p className="text-xs text-muted-foreground">Painel seguro</p>
          </div>
          <Badge className="bg-green-900 text-white hover:bg-green-800">
            Online
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    size: "sm",
                  }),
                  "text-sm",
                )
              }
            >
              {item.name}
            </NavLink>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="border-green-900 text-green-900 hover:bg-green-50"
            onClick={logout}
          >
            Sair
          </Button>
        </div>
      </div>
    </nav>
  );
}
