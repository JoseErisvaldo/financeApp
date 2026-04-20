import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogTransaction } from "../hooks/mutations/use-create-transaction-dialog";
import { useEffect, useRef } from "react";

export function DialogCreateTransaction() {
  const { handleSubmit, isPending, errors, isSuccess, reset } =
    useDialogTransaction();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    formRef.current?.reset();

    const timer = setTimeout(() => {
      reset();
    }, 4000);

    return () => clearTimeout(timer);
  }, [isSuccess, reset]);

  return (
    <Dialog>
      <DialogTrigger
        render={<Button className="bg-green-600 hover:bg-green-700" />}
      >
        Nova Transação
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Nova Transação</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova transação.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type}</p>
              )}
              <Label htmlFor="type">Tipo</Label>
              <select id="type" name="type" defaultValue="income">
                <option value="income">Entrada</option>
                <option value="expense">Saída</option>
              </select>
            </Field>

            <Field>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category}</p>
              )}
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                name="category"
                placeholder="Ex: Alimentação"
              />
            </Field>

            <Field>
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
              <Label htmlFor="title">Nome</Label>
              <Input id="title" name="title" />
            </Field>

            <Field>
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount}</p>
              )}
              <Label htmlFor="amount">Valor</Label>
              <Input id="amount" name="amount" />
            </Field>
          </FieldGroup>
          {isSuccess && (
            <p className="text-sm text-green-600">
              Transação criada com sucesso!
            </p>
          )}
          <DialogFooter className="mt-4">
            <DialogClose
              render={
                <Button variant="outline" className="bg-red-600 text-white" />
              }
            >
              Cancelar
            </DialogClose>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
