import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableTransactions from "./components/table-transactions";

export default function Transactions() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Card className="border-green-900/10 shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge className="w-fit bg-green-900 text-white hover:bg-green-800">
              Financeiro
            </Badge>
            <div>
              <CardTitle className="text-2xl">Minhas Transações</CardTitle>
              <CardDescription>
                Visualize e acompanhe seu histórico financeiro recente.
              </CardDescription>
            </div>
          </div>

          <Button className="bg-green-900 text-white hover:bg-green-800">
            Adicionar nova transação
          </Button>
        </CardHeader>

        <CardContent>
          <TableTransactions />
        </CardContent>
      </Card>
    </section>
  );
}
