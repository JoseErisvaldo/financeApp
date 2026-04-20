import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "../mutations/use-login.hook";

export default function Login() {
  const { mutate, isPending, error } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return;
    }

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return;
    }

    mutate({ email: normalizedEmail, password: normalizedPassword });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-green-900/10 shadow-lg shadow-green-900/5">
        <CardHeader className="space-y-3">
          <Badge className="w-fit bg-green-900 text-white hover:bg-green-800">
            Área segura
          </Badge>

          <div className="space-y-1">
            <CardTitle className="text-2xl">Entrar na conta</CardTitle>
            <CardDescription>
              Acesse sua área administrativa com email e senha para continuar.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@empresa.com"
                disabled={isPending}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                disabled={isPending}
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <label className="flex items-center gap-2" htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  className="accent-green-900"
                />
                <span>Lembrar de mim</span>
              </label>

              <Link
                to="/login"
                className="font-medium text-green-900 hover:underline"
              >
                Esqueci a senha
              </Link>
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">
                Erro: favor validar seus dados.
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-green-900 text-white hover:bg-green-800"
              disabled={isPending}
            >
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link
              to="/login"
              className="font-medium text-green-900 hover:underline"
            >
              Criar acesso
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
