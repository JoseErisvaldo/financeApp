import { z } from "zod";
import {
  createTransactionSchema,
  transactionSchema,
  postTransactionResponseSchema,
} from "../schema/transaction.schema";

export type TransactionDTO = z.infer<typeof createTransactionSchema>;

export type Transaction = z.infer<typeof transactionSchema>;

export type PostTransactionResponse = z.infer<
  typeof postTransactionResponseSchema
>;
