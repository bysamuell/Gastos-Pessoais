import { useEffect, useState } from 'react';

function ExpenseForm({ onSubmit, loading, initialValues, submitLabel }) {
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialValues) {
      setCategory(initialValues.category || '');
      setValue(
        initialValues.value !== undefined && initialValues.value !== null
          ? String(initialValues.value)
          : '',
      );
      setDate(initialValues.date || '');
      setDescription(initialValues.description || '');
    } else {
      setCategory('');
      setValue('');
      setDate('');
      setDescription('');
    }
  }, [initialValues]);

  function handleSubmit(e) {
    e.preventDefault();
    const parsedValue = parseFloat(value);
    onSubmit({ category, value: parsedValue, date, description });
  }

  return (
    <form onSubmit={handleSubmit} className="dashboard-card dashboard-form">
      <div className="dashboard-form-grid">
        <div className="dashboard-field">
          <label>Categoria</label>
          <input
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="dashboard-field">
          <label>Valor</label>
          <input
            type="number"
            step="0.01"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="dashboard-field">
          <label>Data</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="dashboard-field">
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="dashboard-form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : submitLabel || 'Salvar'}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
