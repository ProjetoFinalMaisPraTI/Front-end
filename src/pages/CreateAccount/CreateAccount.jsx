import { Link } from 'react-router-dom';
import './CreateAccount.css';

function CriarConta() {
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

        <form className="criar-conta-form">
          <div className="campo">
            <label>Nome completo</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input type="text" placeholder="Seu nome" />
            </div>
          </div>

          <div className="campo">
            <label>E-mail</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
              <input type="email" placeholder="seuemail@exemplo.com" />
            </div>
          </div>

          <div className="campo">
            <label>Senha</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input type="password" placeholder="Crie uma senha" />
            </div>
          </div>

          <div className="campo">
            <label>Confirmar senha</label>
            <div className="campo-input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input type="password" placeholder="Repita a senha" />
            </div>
          </div>

          <label className="campo-checkbox">
            <input type="checkbox" />
            Concordo com os termos de uso e a política de privacidade
          </label>

          <button type="submit" className="botao-criar">Criar conta</button>
        </form>

        <p className="ja-tem-conta">
          Já tem uma conta? <Link to="/entrar">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default CriarConta;