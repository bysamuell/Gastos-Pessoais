import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveToken } from '../api';
import AuthForm from '../components/AuthForm';

function LoginPage() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin({ email, password }) {
    setErro('');
    setCarregando(true);
    try {
      const data = await loginUser({ email, password });
      saveToken(data.token);
      navigate('/dashboard');
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthForm mode="login" onSubmit={handleLogin} loading={carregando} error={erro} />
  );
}

export default LoginPage;
