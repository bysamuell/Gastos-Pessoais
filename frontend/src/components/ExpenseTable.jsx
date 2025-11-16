function ExpenseTable({ expenses, onDelete, onEdit }) {
  if (!expenses || expenses.length === 0) {
    return <p className="dashboard-empty">Nenhuma despesa cadastrada.</p>;
  }

  return (
    <div className="dashboard-card dashboard-table-wrapper">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td className="dashboard-table-actions">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(expense)}
                    className="dashboard-table-button secondary"
                  >
                    Editar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(expense.id)}
                  className="dashboard-table-button danger"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
