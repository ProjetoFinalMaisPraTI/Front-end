import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import './CreateAccount.css';

function CriarConta() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [concordoTermos, setConcordoTermos] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validarSenhaFortev = (senha) => {
    const temTamanhoMinimo = senha.length >= 8;
    const temLetraMaiuscula = /[A-Z]/.test(senha);
    const temLetraMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    return temTamanhoMinimo && temLetraMaiuscula && temLetraMinuscula && temNumero && temCaractereEspecial;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validarSenhaFortev(senha)) {
      setError('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!concordoTermos) {
      setError('Você deve concordar com os termos de uso e a política de privacidade.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/registrar', {
        nome,
        email,
        senha
      });

      console.log('Conta criada com sucesso:', response.data);
      navigate('/entrar');

    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setError(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="criar-conta-pagina">
      <div className="criar-conta-topo">
        <span className="logo-icone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </span>
        <span className="logo-texto">FinApp</span>
      </div>

      <div className="criar-conta-card">
        <Link to="/" className="voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>

        <h1>Crie sua conta</h1>
        <p className="criar-conta-subtitulo">Comece a organizar suas finanças hoje</p>

        {error && <div className="mensagem-erro" style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

        <form className="criar-conta-form" onSubmit={handleSubmit}>
          <div className="campo">
            <label>Nome completo</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>

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
                type={mostrarSenha ? 'text' : 'password'} 
                placeholder="Crie uma senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none' }}
                required
              />
              {/* Botão para alternar a visibilidade da senha */}
              <button 
                type="button" 
                onClick={() => setMostrarSenha(!mostrarSenha)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 5px' }}
              >
                {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Orientações dinâmicas / dicas de senha forte */}
            <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '4px' }}>
              A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.
            </small>
          </div>

          <div className="campo">
            <label>Confirmar senha</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={mostrarConfirmarSenha ? "text" : "password"} 
                placeholder="Repita a senha" 
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none' }}
                required
              />
              <button 
                type="button" 
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 5px' }}
              >
                {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <label className="campo-checkbox">
            <input
              type="checkbox"
              checked={concordoTermos}
              onChange={(e) => setConcordoTermos(e.target.checked)}
            />
            Concordo com os termos de uso e a política de privacidade
          </label>

          <button type="submit" className="botao-criar" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="ja-tem-conta">
          Já tem uma conta? <Link to="/entrar">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default CriarConta;