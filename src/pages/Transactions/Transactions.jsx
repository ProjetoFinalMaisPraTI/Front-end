import './Transactions.css';

// Este componente representa UMA linha da lista (uma despesa ou um ganho).
// Ele recebe os dados do item e algumas funções prontas vindas do componente pai.
function Transactions(props) {
  const item = props.item;
  const tipo = props.tipo; // "despesas" ou "ganhos"

  // transforma o número (ex: 214.5) em texto de dinheiro (ex: R$ 214,50)
  const valorFormatado = item.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Se o tipo for ganhos coloca "+" na frente do valor
  let sinal = '';
  if (tipo === 'ganhos') {
    sinal = '+ ';
  }

  // classe muda quando o item está aberto (arrastado pra esquerda)
  let classeConteudo = 'transacao__conteudo';
  if (props.aberto) {
    classeConteudo = 'transacao__conteudo transacao__conteudo--aberto';
  }

  let classeAcoes = 'transacao__acoes';
  if (props.aberto) {
    classeAcoes = 'transacao__acoes transacao__acoes--visivel';
  }

  // Classe cor do valor (vermelho é despesa, verde é ganho)
  const classeValor = 'transacao__valor transacao__valor--' + tipo;

  return (
    <div className="transacao">
      {/* Clicando em qualquer parte daqui, o item "arrasta" pra esquerda */}
      <button type="button" className={classeConteudo} onClick={props.onAbrir}>
        <div className="transacao__info">
          <span className="transacao__titulo">{item.titulo}</span>
          <span className="transacao__data">{item.data}</span>
        </div>

        <span className={classeValor}>
          {sinal}
          {valorFormatado}
        </span>

        {/* A seta só aparece quando o item está fechado.
            Quando abre, ela dá lugar aos botões de editar/excluir. */}
        {!props.aberto && <span className="transacao__seta">›</span>}
      </button>

      {/* Botões de editar e excluir, ficam escondidos atrás do conteúdo */}
      <div className={classeAcoes}>
        <button
          type="button"
          className="transacao__botao transacao__botao--editar"
          onClick={function (evento) {
            // stopPropagation evita que o clique também "feche" o item
            evento.stopPropagation();
            props.onEditar(item.id);
          }}
        >
          ✎
        </button>

        <button
          type="button"
          className="transacao__botao transacao__botao--excluir"
          onClick={function (evento) {
            evento.stopPropagation();
            props.onExcluir(item.id);
          }}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default Transactions;