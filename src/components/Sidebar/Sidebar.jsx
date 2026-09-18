import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

// Lista das páginas que aparecem no menu.
// só temos Home e Movimentações, mas dá pra ir acrescentando mais itens depois
// ícones desenhados em SVG (em vez de emoji) porque o SVG usa "currentColor" 
// quando o item fica cinza (inativo) ou verde (ativo), o ícone
// acompanha a mesma cor, emoji não consegue fazer isso
const itensDoMenu = [
  {
    // vai pra uma página placeholder ("/nova-home") até a nova
    // home de verdade ser criada, depois trocar essa rota
    rota: '/nova-home',
    rotulo: 'Home',
    icone: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    rota: '/movimentacoes',
    rotulo: 'Movimentações',
    icone: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

function Sidebar() {
  // guarda se a barra está "fechada" (só ícones) ou aberta (ícones + texto)
  const [fechada, setFechada] = useState(false);

  // hook do react-router diz qual a URL atual,
  // saber qual item do menu deve ficar destacado
  const localizacao = useLocation();

  // hook do react-router deixa navegar pelo código,
  // vamos usar no botão de sair
  const navegar = useNavigate();

  function alternarMenu() {
    setFechada(!fechada);
  }

  function sairDaArea() {
    // volta pra home do site, saindo da área de finanças
    navegar('/');
  }

  let classeSidebar = 'sidebar';
  if (fechada) {
    classeSidebar = 'sidebar sidebar--fechada';
  }

  return (
    <aside className={classeSidebar}>
      <div className="sidebar__topo">
        {!fechada && (
          <div className="sidebar__marca">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="sidebar__marca-icone"
            >
              <rect x="3" y="6" width="18" height="13" rx="2" strokeLinejoin="round" />
              <path d="M3 10h18" />
              <circle cx="16" cy="14" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <span className="sidebar__logo">FinApp</span>
          </div>
        )}

        <button
          type="button"
          className="sidebar__botao-fechar"
          onClick={alternarMenu}
          aria-label={fechada ? 'Expandir menu' : 'Encolher menu'}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: fechada ? 'rotate(180deg)' : 'none' }}
          >
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <nav className="sidebar__lista">
        {itensDoMenu.map(function (item) {
          // item é "ativo" quando a rota dele é igual à URL que está aberta agora
          const ativo = localizacao.pathname === item.rota;

          let classeItem = 'sidebar__item';
          if (ativo) {
            classeItem = 'sidebar__item sidebar__item--ativo';
          }

          return (
            <Link key={item.rota} to={item.rota} className={classeItem}>
              <span className="sidebar__icone">{item.icone}</span>
              {!fechada && <span className="sidebar__rotulo">{item.rotulo}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="sidebar__sair"
        onClick={sairDaArea}
        aria-label="Sair da área de finanças"
      >
        <span className="sidebar__icone">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </aside>
  );
}

export default Sidebar;