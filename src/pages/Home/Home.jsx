import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <h1>Organize suas finanças de um jeito simples</h1>
        <p className="home-hero-subtitulo">
          Controle gastos, defina metas e acompanhe sua evolução financeira em um só lugar.
        </p>
        <Link to="/criar-conta" className="botao-comecar">
          Comece agora <span>→</span>
        </Link>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <span className="icone-feature icone-metas">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </span>
          <h3>Metas</h3>
          <p>Defina objetivos e acompanhe seu progresso mês a mês</p>
        </div>

        <div className="feature-card">
          <span className="icone-feature icone-relatorios">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </span>
          <h3>Relatórios</h3>
          <p>Veja gráficos claros da sua evolução financeira</p>
        </div>

        <div className="feature-card">
          <span className="icone-feature icone-seguranca">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            </svg>
          </span>
          <h3>Segurança</h3>
          <p>Seus dados protegidos com criptografia de ponta a ponta</p>
        </div>
      </section>

      <section className="home-destaque">
        <div className="destaque-imagem">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M9 13h1" />
            <path d="M9 17h1" />
            <path d="M14 13h1" />
            <path d="M14 17h1" />
          </svg>
        </div>
        <div className="destaque-texto">
          <h2>Centralize e organize todos os seus gastos</h2>
          <p>Aqui você pode ter controle total das suas contas, tudo que gastou e ganhou no mês.</p>
        </div>
      </section>

      <section className="home-destaque home-destaque-inverso">
        <div className="destaque-texto">
          <h2>Controle seus investimentos</h2>
          <p>Na nossa área de investimentos você pode anotar tudo que comprou e recebeu, ficando sempre 100% atualizado.</p>
        </div>
        <div className="destaque-imagem">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5" />
            <path d="M16 3h5v5" />
            <path d="M14 10 21 3" />
          </svg>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2026 FinApp. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;