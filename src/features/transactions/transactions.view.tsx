import TableTransactions from "./components/table-transactions";

export default function Transactions() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Transações</h1>
      <div>
        <p className="text-gray-600 mb-2">
          Aqui estão todas as suas transações financeiras recentes. Você pode
          visualizar detalhes, editar ou excluir cada transação conforme
          necessário.
        </p>
      </div>
      <div className="mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer">
          Adicionar Nova Transação
        </button>
      </div>
      <div className="mt-8">
        <TableTransactions />
      </div>
    </div>
  );
}
