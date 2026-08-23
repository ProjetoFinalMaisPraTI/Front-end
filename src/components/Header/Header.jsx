import { NavLink, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">📗 FinApp</div>

      <nav className="header-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'ativo' : ''}>Início</NavLink>
        <NavLink to="/sobre" className={({ isActive }) => isActive ? 'ativo' : ''}>Sobre</NavLink>
        <NavLink to="/contato" className={({ isActive }) => isActive ? 'ativo' : ''}>Contato</NavLink>
      </nav>

      <div className="header-acoes">
        <Link to="/entrar" className="link-entrar">Entrar</Link>
        <Link to="/criar-conta" className="botao-criar-conta">Criar conta</Link>
      </div>
    </header>
  );
}

export default Header;