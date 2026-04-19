import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StateMessage } from "@/components/ui/state-message";
import useProfile from "./hooks/use-profile";

export default function Profile() {
  const { data, isLoading, isError } = useProfile();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Card className="border-green-900/10 shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge className="w-fit bg-green-900 text-white hover:bg-green-800">
              Perfil
            </Badge>
            <div>
              <CardTitle className="text-2xl">Meu Perfil</CardTitle>
              <CardDescription>
                Visualize e gerencie suas informações pessoais.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <StateMessage
              variant="loading"
              title="Carregando perfil"
              description="Estamos buscando seus dados pessoais."
            />
          )}

          {isError && (
            <StateMessage
              variant="error"
              title="Erro ao carregar perfil"
              description=""
            />
          )}

          {!isLoading && !isError && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Nome:</strong> {data?.name ?? "-"}
              </p>
              <p>
                <strong>Email:</strong> {data?.email ?? "-"}
              </p>
              <p>
                <strong>ID:</strong> {data?.id ?? "-"}
              </p>
              <p>
                <strong>Criado em:</strong>{" "}
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
