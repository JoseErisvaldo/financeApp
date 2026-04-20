import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../../service/post-transactions.service";
import { useState } from "react";
import { ZodError } from "zod";

export function usePostTransaction() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postTransaction,

    onSuccess: () => {
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },

    onError: (error) => {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.issues.forEach((err) => {
          const field = err.path[0];
          if (field && typeof field === "string")
            fieldErrors[field] = err.message;
        });

        setErrors(fieldErrors);
      }
    },
  });
  return { ...mutation, errors, setErrors };
}

export function useDialogTransaction() {
  const { mutate, isPending, errors, setErrors, isSuccess, reset } =
    usePostTransaction();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});

    const formData = new FormData(event.currentTarget);

    const data = {
      title: formData.get("title") as string,
      amount: Number(formData.get("amount")),
      category: formData.get("category") as string,
      type: formData.get("type") as "income" | "expense",
    };

    mutate(data);
  };

  return { handleSubmit, isPending, errors, isSuccess, reset };
}
