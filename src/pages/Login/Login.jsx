import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha: password });
      console.log('Resposta do login:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/painel');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-pagina">
      <div className="login-topo">
        <span className="logo-icone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </span>
        <span className="logo-texto">FinApp</span>
      </div>

      <div className="login-card">
        <Link to="/" className="voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>

        <h1>Bem-vindo de volta</h1>
        <p className="login-subtitulo">Entre para continuar organizando suas finanças</p>

        {error && <div className="mensagem-erro" style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="campo">
            <label>E-mail</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
              <input 
              type="email" 
              placeholder="seuemail@exemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
            </div>
          </div>

          <div className="campo">
            <label>Senha</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            </div>
          </div>

          <Link to="/esqueci-senha" className="esqueci-senha">Esqueci minha senha</Link>

          <button type="submit" className="botao-entrar" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="nao-tem-conta">
          Ainda não tem uma conta? <Link to="/criar-conta">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;