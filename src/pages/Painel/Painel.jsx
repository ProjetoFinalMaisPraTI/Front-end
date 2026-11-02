import { useState, useEffect } from 'react';
import api from '../../services/api';
import './Painel.css';

const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Transforma o número 214.5 no texto "R$ 214,50"
function formatarValor(numero) {
  return Number(numero || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Transforma uma data no formato "YYYY-MM-DD" em "DD/MM/YYYY"
function formatarData(item) {
  if (item.data) {
    const [ano, mes, dia] = item.data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
  const dia = String(item.dia || 1).padStart(2, '0');
  const mes = String(item.mes || 1).padStart(2, '0');
  return `${dia}/${mes}/${item.ano || 2026}`;
}

// Soma o valor de todos os itens de uma lista
function somar(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + Number(lista[i].valor || 0);
  }
  return total;
}

function Painel() {
  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;

  const [nomeUsuario, setNomeUsuario] = useState('Antonio');
  const [aba, setAba] = useState('despesa'); // 'despesa' ou 'ganho'
  const [periodo, setPeriodo] = useState('anual'); // 'mensal', 'semestral' ou 'anual'
  const [ano, setAno] = useState(hoje.getFullYear());
  
  // Lista que virá do backend
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Buscar transações reais e dados do utilizador ao carregar a página
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      try {
        const usuarioObj = JSON.parse(usuarioSalvo);
        if (usuarioObj.nome) {
          setNomeUsuario(usuarioObj.nome);
        }
      } catch (e) {
        setNomeUsuario(usuarioSalvo);
      }
    }
    carregarMovimentacoes();
  }, []);

  async function carregarMovimentacoes() {
    try {
      const response = await api.get('/transacoes');
      
      const dadosFormatados = response.data.map(item => {
        if (item.data && (!item.ano || !item.mes || !item.dia)) {
          const [anoItem, mesItem, diaItem] = item.data.split('-').map(Number);
          return {
            ...item,
            tipo: item.tipo ? item.tipo.toLowerCase() : 'despesa',
            ano: anoItem,
            mes: mesItem,
            dia: diaItem
          };
        }
        return {
          ...item,
          tipo: item.tipo ? item.tipo.toLowerCase() : 'despesa'
        };
      });

      setMovimentacoes(dadosFormatados);
    } catch (error) {
      console.error('Erro ao carregar dados do painel:', error);
    }
  }

  // Filtrar os dados pelo ano e pelo período escolhido
  function estaNoPeriodo(item) {
    if (item.ano !== ano) {
      return false;
    }
    if (periodo === 'mensal') {
      return item.mes === mesAtual;
    }
    if (periodo === 'semestral') {
      if (mesAtual <= 6) {
        return item.mes <= 6;
      }
      return item.mes > 6;
    }
    return true; // anual
  }

  const doPeriodo = movimentacoes.filter(estaNoPeriodo);

  const despesas = doPeriodo.filter(item => item.tipo === 'despesa');
  const ganhos = doPeriodo.filter(item => item.tipo === 'ganho');
  
  const itensDaAba = doPeriodo.filter(item => item.tipo === aba);

  // Cards de resumo
  const totalDespesas = somar(despesas);
  const totalGanhos = somar(ganhos);
  const receita = totalGanhos - totalDespesas;

  let textoPeriodo = 'no ano';
  if (periodo === 'mensal') textoPeriodo = 'no mês';
  if (periodo === 'semestral') textoPeriodo = 'no semestre';

  const cardsResumo = [
    { rotulo: 'Despesa ' + textoPeriodo, valor: formatarValor(totalDespesas), tipo: 'despesa' },
    { rotulo: 'Ganho ' + textoPeriodo, valor: formatarValor(totalGanhos), tipo: 'ganho' },
    { rotulo: 'Receita ' + textoPeriodo, valor: formatarValor(receita), tipo: 'neutro' },
  ];

  // Montar colunas do gráfico
  const colunas = [];

  if (periodo === 'mensal') {
    for (let semana = 1; semana <= 5; semana++) {
      const daSemana = itensDaAba.filter(item => Math.ceil((item.dia || 1) / 7) === semana);
      colunas.push({ rotulo: 'Sem ' + semana, total: somar(daSemana) });
    }
  } else {
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
      const doMes = itensDaAba.filter(item => item.mes === mes);
      colunas.push({ rotulo: nomesMeses[mes - 1], total: somar(doMes) });
    }
  }

  let maior = 0;
  for (let i = 0; i < colunas.length; i++) {
    if (colunas[i].total > maior) {
      maior = colunas[i].total;
    }
  }

  function classeAba(nome) {
    if (aba === nome) {
      return 'abas__item abas__item--ativa';
    }
    return 'abas__item';
  }

  let tituloLista = aba === 'despesa' ? 'Despesas recentes' : 'Ganhos recentes';
  const itensRecentes = itensDaAba.slice(0, 5);

  let mensagemVazia = null;
  if (itensRecentes.length === 0) {
    mensagemVazia = <p className="recentes__vazio">Nenhuma movimentação neste período.</p>;
  }

  return (
    <div className="home-dashboard">
      <h1 className="home-dashboard__saudacao">Olá, {nomeUsuario}!</h1>

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
          <button className={classeAba('despesa')} onClick={() => setAba('despesa')}>
            Despesas
          </button>
          <button className={classeAba('ganho')} onClick={() => setAba('ganho')}>
            Ganhos
          </button>
        </div>

        <select
          className="filtro-periodo"
          value={periodo}
          onChange={(evento) => setPeriodo(evento.target.value)}
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
            let altura = 0;
            if (maior > 0) {
              altura = (coluna.total / maior) * 105;
            }

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

        <div className="grafico__navegacao">
          <button
            className="grafico__botao-ano"
            aria-label="Ano anterior"
            onClick={() => setAno(ano - 1)}
          >
            ‹
          </button>
          <span className="grafico__ano">{ano}</span>
          <button
            className="grafico__botao-ano"
            aria-label="Próximo ano"
            onClick={() => setAno(ano + 1)}
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