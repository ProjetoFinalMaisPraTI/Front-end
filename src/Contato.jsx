import './styles/Contato.css';

function Contato() {
  return (
    <section className="contato">
      <h1>Fale com a gente</h1>
      <p className="contato-subtitulo">
        Dúvidas, sugestões ou parcerias — estamos por aqui.
      </p>

      <div className="contato-grid">
        <form className="contato-form">
          <input type="text" name="nome" placeholder="Nome" />
          <input type="email" name="email" placeholder="E-mail" />
          <textarea name="mensagem" placeholder="Mensagem" rows="5" />
          <button type="submit" className="botao-enviar">Enviar mensagem</button>
        </form>

        <div className="contato-info">
          <div className="info-card">
            <span className="icone-card icone-email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
            </span>
            <div>
              <span className="info-label">E-mail</span>
              <span className="info-valor">contato@finapp.com</span>
            </div>
          </div>

          <div className="info-card">
            <span className="icone-card icone-telefone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div>
              <span className="info-label">Telefone</span>
              <span className="info-valor">(51) 99999-0000</span>
            </div>
          </div>

          <div className="info-card">
            <span className="icone-card icone-local">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <span className="info-label">Localização</span>
              <span className="info-valor">Porto Alegre, RS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contato;