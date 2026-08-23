import './About.css';

function Sobre() {
  return (
    <section className="sobre">
      <h1>Sobre o FinApp</h1>
      <p className="sobre-subtitulo">
        Criamos o FinApp para tornar o controle financeiro acessível a
        qualquer pessoa, sem planilhas complicadas ou termos difíceis.
      </p>

      <div className="sobre-stats">
        <div className="stat">
          <span className="stat-numero">+10 mil</span>
          <span className="stat-label">usuários ativos</span>
        </div>
        <div className="stat">
          <span className="stat-numero">R$ 2M</span>
          <span className="stat-label">organizados na plataforma</span>
        </div>
        <div className="stat">
          <span className="stat-numero">4.8/5</span>
          <span className="stat-label">avaliação média</span>
        </div>
      </div>

      <div className="sobre-card">
        <h3>
          <span className="icone-card icone-missao">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </span>
          Nossa missão
        </h3>
        <p>Ajudar pessoas a construir uma relação mais saudável com o dinheiro, com clareza e simplicidade.</p>
      </div>

      <div className="sobre-card">
        <h3>
          <span className="icone-card icone-quemsomos">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          Quem somos
        </h3>
        <p>Um time de estudantes apaixonados por tecnologia, construindo uma solução real para um problema comum.</p>
      </div>
    </section>
  );
}

export default Sobre;