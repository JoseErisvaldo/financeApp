import { usePostTransaction } from "../mutations/use-create-transaction-dialog";

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
