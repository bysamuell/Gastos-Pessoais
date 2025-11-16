import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import AuthForm from '../components/AuthForm';

function RegisterPage() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleRegister({ name, email, password }) {
    setErro('');
    setCarregando(true);
    try {
      await registerUser({ name, email, password });
      navigate('/login');
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthForm mode="register" onSubmit={handleRegister} loading={carregando} error={erro} />
  );
}

export default RegisterPage;
