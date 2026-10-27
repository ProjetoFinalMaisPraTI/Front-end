import { useState } from 'react';
import './Painel.css';

// Dados fixos só para testar. Depois trocar pelos dados do back-end.
// dia, mes (1 a 12) e ano são números,fica fácil de filtrar.
const movimentacoes = [
  { id: 1, titulo: 'Supermercado', tipo: 'despesa', valor: 214.5, dia: 28, mes: 10, ano: 2026 },
  { id: 2, titulo: 'Uber', tipo: 'despesa', valor: 32.9, dia: 27, mes: 10, ano: 2026 },
  { id: 3, titulo: 'Freelance', tipo: 'ganho', valor: 800, dia: 19, mes: 10, ano: 2026 },
  { id: 4, titulo: 'Conta de luz', tipo: 'despesa', valor: 180, dia: 12, mes: 10, ano: 2026 },
  { id: 5, titulo: 'Aluguel', tipo: 'despesa', valor: 900, dia: 5, mes: 10, ano: 2026 },
  { id: 6, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 10, ano: 2026 },
  { id: 7, titulo: 'Supermercado', tipo: 'despesa', valor: 260, dia: 21, mes: 9, ano: 2026 },
  { id: 8, titulo: 'Internet', tipo: 'despesa', valor: 120, dia: 10, mes: 9, ano: 2026 },
  { id: 9, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 9, ano: 2026 },
  { id: 10, titulo: 'Farmácia', tipo: 'despesa', valor: 95.4, dia: 14, mes: 8, ano: 2026 },
  { id: 11, titulo: 'Aluguel', tipo: 'despesa', valor: 900, dia: 5, mes: 8, ano: 2026 },
  { id: 12, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 8, ano: 2026 },
  { id: 13, titulo: 'Cinema', tipo: 'despesa', valor: 60, dia: 16, mes: 7, ano: 2026 },
  { id: 14, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 7, ano: 2026 },
  { id: 15, titulo: 'Supermercado', tipo: 'despesa', valor: 310, dia: 22, mes: 5, ano: 2026 },
  { id: 16, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 5, ano: 2026 },
  { id: 17, titulo: 'Aluguel', tipo: 'despesa', valor: 900, dia: 5, mes: 3, ano: 2026 },
  { id: 18, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 3, ano: 2026 },
  { id: 19, titulo: 'Curso', tipo: 'despesa', valor: 450, dia: 15, mes: 2, ano: 2026 },
  { id: 20, titulo: 'Salário', tipo: 'ganho', valor: 3500, dia: 5, mes: 2, ano: 2026 },
  { id: 21, titulo: 'Presente', tipo: 'despesa', valor: 380, dia: 20, mes: 12, ano: 2025 },
  { id: 22, titulo: 'Salário', tipo: 'ganho', valor: 3400, dia: 5, mes: 12, ano: 2025 },
  { id: 23, titulo: 'Aluguel', tipo: 'despesa', valor: 850, dia: 5, mes: 11, ano: 2025 },
];

const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Transforma o número 214.5 no texto "R$ 214,50"
function formatarValor(numero) {
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Transforma o item em um texto de data, ex: "05/10/2026"
function formatarData(item) {
  const dia = String(item.dia).padStart(2, '0');
  const mes = String(item.mes).padStart(2, '0');
  return dia + '/' + mes + '/' + item.ano;
}

// Soma o valor de todos os itens de uma lista
function somar(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i].valor;
  }
  return total;
}

function Painel() {
  // ---------- PASSO 1: os "estados" (o que a tela precisa lembrar) ----------
  // useState guarda um valor. Quando chamamos a função "set...", a tela é redesenhada.
  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1; // getMonth começa em 0, por isso somamos 1

  const [aba, setAba] = useState('despesa'); // 'despesa' ou 'ganho'
  const [periodo, setPeriodo] = useState('anual'); // 'mensal', 'semestral' ou 'anual'
  const [ano, setAno] = useState(hoje.getFullYear());

  // ---------- PASSO 2: filtrar os dados pelo ano e pelo período ----------
  // Devolve true se o item deve aparecer no período escolhido
  function estaNoPeriodo(item) {
    if (item.ano !== ano) {
      return false;
    }
    if (periodo === 'mensal') {
      return item.mes === mesAtual;
    }
    if (periodo === 'semestral') {
      // se estamos no 1º semestre (Jan a Jun), mostra Jan a Jun; senão, Jul a Dez
      if (mesAtual <= 6) {
        return item.mes <= 6;
      }
      return item.mes > 6;
    }
    return true; // anual: o ano todo
  }

  // filter fica só com os itens em que a função devolve true
  const doPeriodo = movimentacoes.filter(estaNoPeriodo);

  const despesas = doPeriodo.filter(function (item) {
    return item.tipo === 'despesa';
  });
  const ganhos = doPeriodo.filter(function (item) {
    return item.tipo === 'ganho';
  });
  // itens da aba que está selecionada (Despesas ou Ganhos)
  const itensDaAba = doPeriodo.filter(function (item) {
    return item.tipo === aba;
  });

  // ---------- PASSO 3: cards de resumo ----------
  const totalDespesas = somar(despesas);
  const totalGanhos = somar(ganhos);
  const receita = totalGanhos - totalDespesas;

  let textoPeriodo = 'no ano';
  if (periodo === 'mensal') {
    textoPeriodo = 'no mês';
  }
  if (periodo === 'semestral') {
    textoPeriodo = 'no semestre';
  }

  const cardsResumo = [
    { rotulo: 'Despesa ' + textoPeriodo, valor: formatarValor(totalDespesas), tipo: 'despesa' },
    { rotulo: 'Ganho ' + textoPeriodo, valor: formatarValor(totalGanhos), tipo: 'ganho' },
    { rotulo: 'Receita ' + textoPeriodo, valor: formatarValor(receita), tipo: 'neutro' },
  ];

  // ---------- PASSO 4: montar as colunas do gráfico ----------
  // Cada coluna tem um rótulo (Jan, Fev... ou Sem 1...) e o total daquela coluna
  const colunas = [];

  if (periodo === 'mensal') {
    // Mensal: uma coluna por semana do mês (dias 1-7 = semana 1, 8-14 = semana 2...)
    for (let semana = 1; semana <= 5; semana++) {
      const daSemana = itensDaAba.filter(function (item) {
        return Math.ceil(item.dia / 7) === semana;
      });
      colunas.push({ rotulo: 'Sem ' + semana, total: somar(daSemana) });
    }
  } else {
    // Semestral ou anual: uma coluna por mês
    let primeiroMes = 1;
    let ultimoMes = 12;
    if (periodo === 'semestral') {
      if (mesAtual <= 6) {
        ultimoMes = 6;
      } else {
        primeiroMes = 7;
      }
    }
    for (let mes = primeiroMes; mes <= ultimoMes; mes++) {
      const doMes = itensDaAba.filter(function (item) {
        return item.mes === mes;
      });
      colunas.push({ rotulo: nomesMeses[mes - 1], total: somar(doMes) });
    }
  }

  // Descobre o maior total, para calcular a altura das barras
  let maior = 0;
  for (let i = 0; i < colunas.length; i++) {
    if (colunas[i].total > maior) {
      maior = colunas[i].total;
    }
  }

  // ---------- PASSO 5: pequenos ajustes para o visual ----------
  // Escolhe a classe da aba: a selecionada fica verde
  function classeAba(nome) {
    if (aba === nome) {
      return 'abas__item abas__item--ativa';
    }
    return 'abas__item';
  }

  let tituloLista = 'Despesas recentes';
  if (aba === 'ganho') {
    tituloLista = 'Ganhos recentes';
  }

  // Mostra os 5 primeiros itens da lista
  const itensRecentes = itensDaAba.slice(0, 5);

  // Mensagem para quando não há nenhum item no período
  let mensagemVazia = null;
  if (itensRecentes.length === 0) {
    mensagemVazia = <p className="recentes__vazio">Nenhuma movimentação neste período.</p>;
  }

  return (
    <div className="home-dashboard">
      <h1 className="home-dashboard__saudacao">Olá, Marina!</h1>

      {/* Cards de resumo */}
      <div className="home-dashboard__resumo">
        {cardsResumo.map(function (card) {
          const classeValor = 'resumo-card__valor resumo-card__valor--' + card.tipo;

          return (
            <div key={card.rotulo} className="resumo-card">
              <span className="resumo-card__rotulo">{card.rotulo}</span>
              <strong className={classeValor}>{card.valor}</strong>
            </div>
          );
        })}
      </div>

      {/* Abas e filtro de período */}
      <div className="home-dashboard__filtros">
        <div className="abas">
          {/* onClick: quando clicar, guarda a aba escolhida */}
          <button
            className={classeAba('despesa')}
            onClick={function () {
              setAba('despesa');
            }}
          >
            Despesas
          </button>
          <button
            className={classeAba('ganho')}
            onClick={function () {
              setAba('ganho');
            }}
          >
            Ganhos
          </button>
        </div>

        {/* onChange: quando trocar a opção, guarda o período escolhido */}
        <select
          className="filtro-periodo"
          value={periodo}
          onChange={function (evento) {
            setPeriodo(evento.target.value);
          }}
        >
          <option value="mensal">Mensal</option>
          <option value="semestral">Semestral</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      {/* Gráfico de barras */}
      <div className="grafico">
        <div className="grafico__barras">
          {colunas.map(function (coluna) {
            // altura da barra: proporcional ao maior total (máximo 105 pixels)
            let altura = 0;
            if (maior > 0) {
              altura = (coluna.total / maior) * 105;
            }

            // a barra mais alta fica em destaque
            let classeBarra = 'grafico__barra';
            if (maior > 0 && coluna.total === maior) {
              classeBarra = 'grafico__barra grafico__barra--ativa';
            }

            return (
              <div key={coluna.rotulo} className="grafico__coluna">
                <div className={classeBarra} style={{ height: altura }}></div>
                <span className="grafico__mes">{coluna.rotulo}</span>
              </div>
            );
          })}
        </div>

        {/* Botões para voltar e avançar o ano */}
        <div className="grafico__navegacao">
          <button
            className="grafico__botao-ano"
            aria-label="Ano anterior"
            onClick={function () {
              setAno(ano - 1);
            }}
          >
            ‹
          </button>
          <span className="grafico__ano">{ano}</span>
          <button
            className="grafico__botao-ano"
            aria-label="Próximo ano"
            onClick={function () {
              setAno(ano + 1);
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Lista recente */}
      <div className="recentes">
        <div className="recentes__cabecalho">
          <h2 className="recentes__titulo">{tituloLista}</h2>
          <span className="filtro-periodo">Recentes</span>
        </div>

        {mensagemVazia}

        {itensRecentes.map(function (item) {
          const classeValor = 'despesa-item__valor despesa-item__valor--' + item.tipo;

          return (
            <div key={item.id} className="despesa-item">
              <div className="despesa-item__info">
                <strong className="despesa-item__titulo">{item.titulo}</strong>
                <span className="despesa-item__data">{formatarData(item)}</span>
              </div>
              <strong className={classeValor}>{formatarValor(item.valor)}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Painel;