import { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthForm({ mode, onSubmit, loading, error }) {
  const isLogin = mode === 'login';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (isLogin) {
      onSubmit({ email, password });
    } else {
      onSubmit({ name, email, password });
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{isLogin ? 'Entrar' : 'Criar conta'}</h1>
        <p className="auth-subtitle">
          {isLogin
            ? 'Acesse seu painel de gastos pessoais.'
            : 'Cadastre-se para começar a controlar seus gastos.'}
        </p>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>
          )}
          <div className="auth-field">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div className="auth-field">
            <label>Senha</label>
            <div className="auth-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? (
            <>
              Não tem conta? <Link to="/register">Crie uma agora</Link>
            </>
          ) : (
            <>
              Já tem conta? <Link to="/login">Entre aqui</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
