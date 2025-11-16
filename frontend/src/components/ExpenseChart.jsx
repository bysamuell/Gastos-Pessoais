import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function ExpenseChart({ expenses }) {
  const totalsByCategory = expenses.reduce((acc, expense) => {
    const key = expense.category || 'Outros';
    const current = acc[key] || 0;
    return { ...acc, [key]: current + Number(expense.value || 0) };
  }, {});

  const data = Object.entries(totalsByCategory).map(([category, total]) => ({
    category,
    total,
  }));

  if (data.length === 0) {
    return <p>Sem dados para o gráfico.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Resumo por categoria</h2>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
