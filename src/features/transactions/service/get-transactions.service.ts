import type { Transaction } from "../types/transaction.types";
import { api } from "../../../shared/api/api";

type TransactionsApiResponse =
  | Transaction[]
  | { data?: Transaction[]; transactions?: Transaction[] };

export default async function getTransactionsService(): Promise<Transaction[]> {
  const response = await api.get<TransactionsApiResponse>("/transactions");
  const payload = response.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.data ?? payload.transactions ?? [];
}
