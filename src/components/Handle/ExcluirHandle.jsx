import './Handle.css';

// Handle modal - confirmar exclusão.
//
// Props esperadas:
// - tipo: "despesas" ou "ganhos"
// - onConfirmar: function()
// - onFechar: function()
function ExcluirHandle(props) {
  let rotulo = 'esta despesa';
  if (props.tipo === 'ganhos') {
    rotulo = 'este ganho';
  }

  return (
    <div className="handle-overlay" onClick={props.onFechar}>
      <div
        className="handle"
        onClick={function (evento) {
          evento.stopPropagation();
        }}
      >
        <h2>Excluir {rotulo}?</h2>
        <p>Essa ação não pode ser desfeita.</p>

        <div className="handle__acoes">
          <button
            type="button"
            className="handle__botao handle__botao--secundario"
            onClick={props.onFechar}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="handle__botao handle__botao--perigo"
            onClick={props.onConfirmar}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExcluirHandle;