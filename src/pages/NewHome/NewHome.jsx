import './NewHome.css';

// Dados fixos só para acertar o visual.
// Depois trocar pelos dados reais do projeto.
const cardsResumo = [
  { rotulo: 'Despesa no mês', valor: 'R$ 1.780,00', tipo: 'despesa' },
  { rotulo: 'Ganho no mês', valor: 'R$ 6.100,00', tipo: 'ganho' },
  { rotulo: 'Receita mensal', valor: 'R$ 4.320,00', tipo: 'neutro' },
];

// altura é em pixels; destaque true deixa a barra verde escura
const barrasGrafico = [
  { mes: 'Jan', altura: 55, destaque: false },
  { mes: 'Fev', altura: 70, destaque: false },
  { mes: 'Mar', altura: 60, destaque: false },
  { mes: 'Abr', altura: 85, destaque: false },
  { mes: 'Mai', altura: 65, destaque: false },
  { mes: 'Jun', altura: 78, destaque: false },
  { mes: 'Jul', altura: 90, destaque: false },
  { mes: 'Ago', altura: 88, destaque: false },
  { mes: 'Set', altura: 105, destaque: true },
  { mes: 'Out', altura: 80, destaque: false },
  { mes: 'Nov', altura: 68, destaque: false },
  { mes: 'Dez', altura: 62, destaque: false },
];

const despesasRecentes = [
  { titulo: 'Supermercado', data: '28/08/2026', valor: 'R$ 214,50' },
  { titulo: 'Uber', data: '27/08/2026', valor: 'R$ 32,90' },
];

function NewHome() {
  return (
    <div className="home-dashboard">
      <h1 className="home-dashboard__saudacao">Olá, Marina!</h1>

      {/* Cards de resumo */}
      <div className="home-dashboard__resumo">
        {cardsResumo.map(function (card) {
          // o tipo (despesa, ganho ou neutro) escolhe a cor do valor
          const classeValor = 'resumo-card__valor resumo-card__valor--' + card.tipo;

          return (
            <div key={card.rotulo} className="resumo-card">
              <span className="resumo-card__rotulo">{card.rotulo}</span>
              <strong className={classeValor}>{card.valor}</strong>
            </div>
          );
        })}
      </div>

      {/* Abas e filtro (só visual por enquanto) */}
      <div className="home-dashboard__filtros">
        <div className="abas">
          <button className="abas__item abas__item--ativa">Despesas</button>
          <button className="abas__item">Ganhos</button>
        </div>
        <span className="filtro-periodo">Mensal</span>
      </div>

      {/* Gráfico de barras */}
      <div className="grafico">
        <div className="grafico__barras">
          {barrasGrafico.map(function (barra) {
            // se for o mês destaque, junta a classe extra
            let classeBarra = 'grafico__barra';
            if (barra.destaque) {
              classeBarra = 'grafico__barra grafico__barra--ativa';
            }

            return (
              <div key={barra.mes} className="grafico__coluna">
                <div className={classeBarra} style={{ height: barra.altura }}></div>
                <span className="grafico__mes">{barra.mes}</span>
              </div>
            );
          })}
        </div>

        <p className="grafico__ano">2026</p>
      </div>

      {/* Despesas recentes */}
      <div className="recentes">
        <div className="recentes__cabecalho">
          <h2 className="recentes__titulo">Despesas recentes</h2>
          <span className="filtro-periodo">Recentes</span>
        </div>

        {despesasRecentes.map(function (despesa) {
          return (
            <div key={despesa.titulo} className="despesa-item">
              <div className="despesa-item__info">
                <strong className="despesa-item__titulo">{despesa.titulo}</strong>
                <span className="despesa-item__data">{despesa.data}</span>
              </div>
              <strong className="despesa-item__valor">{despesa.valor}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewHome;