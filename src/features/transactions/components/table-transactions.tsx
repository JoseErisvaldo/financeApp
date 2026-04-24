import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { StateMessage } from "@/components/ui/state-message";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import useTransactionsHooks from "../queries/use-transactions-hooks";
import { FeatureBoundary } from "@/components/layout/feature-boundary/feature-boundary";
import { TransactionsSkeleton } from "./transactions-skeleton";
import { ErrorPages } from "@/components/layout/error-pages/error-pages";

function Transactions() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useTransactionsHooks({
    page,
    limit,
  });
  const transactions = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="secondary">
          {pagination?.totalItems ?? transactions.length} itens
        </Badge>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  <StateMessage
                    variant="empty"
                    title="Nenhuma transação encontrada"
                    description="Adicione uma nova movimentação para começar a visualizar seus dados aqui."
                  />
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    #{transaction.id}
                  </TableCell>
                  <TableCell>
                    {transaction.type === "income" ? "Entrada" : "Saida"}
                  </TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell className="font-semibold text-green-900">
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            Pagina {pagination.page} de {pagination.totalPages}.
          </div>

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            disabled={isFetching}
          />
        </div>
      )}
    </div>
  );
}

export function TableTransactions() {
  return (
    <FeatureBoundary
      fallback={<TransactionsSkeleton />}
      errorFallback={ErrorPages}
    >
      <Transactions />
    </FeatureBoundary>
  );
}
