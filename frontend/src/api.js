const API_URL = 'https://gastos-pessoais-backend.onrender.com';

async function handleResponse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const mensagem = data && (data.mensagem || data.message);
    throw new Error(mensagem || 'Erro ao comunicar com o servidor.');
  }
  return data;
}

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(response);
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export function saveToken(token) {
  localStorage.setItem('authToken', token);
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function clearToken() {
  localStorage.removeItem('authToken');
}

function getAuthHeaders() {
  const token = getToken();
  if (!token) {
    throw new Error('Usuário não autenticado.');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchExpenses({ month } = {}) {
  const query = month ? `?mes=${month}` : '';
  const response = await fetch(`${API_URL}/expenses${query}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function createExpense(expense) {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(expense),
  });
  return handleResponse(response);
}

export async function updateExpense(id, expense) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(expense),
  });
  return handleResponse(response);
}

export async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    await handleResponse(response);
  }
}
