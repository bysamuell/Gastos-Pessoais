import { useEffect, useState } from 'react';
import {
  clearToken,
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../api';
import Layout from '../components/Layout';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseChart from '../components/ExpenseChart';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [month, setMonth] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  function handleLogout() {
    clearToken();
    navigate('/login');
  }

  async function carregarDespesas(selectedMonth) {
    setLoading(true);
    setError('');
    try {
      const data = await fetchExpenses({ month: selectedMonth });
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDespesas(month);
  }, [month]);

  async function handleSubmitExpense(expense) {
    setError('');
    setLoading(true);
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, expense);
      } else {
        await createExpense(expense);
      }
      setEditingExpense(null);
      await carregarDespesas(month);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteExpense(id) {
    setError('');
    setLoading(true);
    try {
      await deleteExpense(id);
      await carregarDespesas(month);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEditExpense(expense) {
    setEditingExpense(expense);
  }

  const totalMensal = expenses.reduce(
    (total, expense) => total + Number(expense.value || 0),
    0,
  );

  return (
    <Layout onLogout={handleLogout}>
      <div className="dashboard-header-row">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-header-subtitle">
            Acompanhe seus gastos e resumo por mês.
          </p>
        </div>
        <div className="dashboard-filter">
          <label>Filtrar por mês</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="dashboard-total-card">
          <span>Total mensal</span>
          <strong>R$ {totalMensal.toFixed(2)}</strong>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ExpenseForm
        onSubmit={handleSubmitExpense}
        loading={loading}
        initialValues={editingExpense}
        submitLabel={editingExpense ? 'Salvar alterações' : 'Adicionar despesa'}
      />
      <hr />
      {loading && <p>Carregando...</p>}
      <ExpenseTable
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
      />
      <hr />
      <ExpenseChart expenses={expenses} />
    </Layout>
  );
}

export default DashboardPage;
