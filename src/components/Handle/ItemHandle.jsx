import { useState } from 'react';
import './Handle.css';

// Handle modal, usado pra ADICIONAR ou EDITAR um item.
// O texto do título muda de acordo com modo (adicionar/editar) e tipo (despesas/ganhos).
//
// Props esperadas:
// - tipo: "despesas" ou "ganhos"
// - modo: "adicionar" ou "editar"
// - itemInicial: o item que está sendo editado (ou null, se for adicionar)
// - onSalvar: function(dadosDoFormulario)
// - onFechar: function()
function ItemHandle(props) {
  const [titulo, setTitulo] = useState(props.itemInicial ? props.itemInicial.titulo : '');
  const [data, setData] = useState(props.itemInicial ? props.itemInicial.data : '');
  const [valor, setValor] = useState(props.itemInicial ? props.itemInicial.valor : '');

  let rotulo = 'despesa';
  if (props.tipo === 'ganhos') {
    rotulo = 'ganho';
  }

  let tituloDoHandle = 'Adicionar ' + rotulo;
  if (props.modo === 'editar') {
    tituloDoHandle = 'Editar ' + rotulo;
  }

  function aoEnviarFormulario(evento) {
    evento.preventDefault();

    // validação bem simples, só pra não salvar campo vazio
    if (titulo.trim() === '' || data === '' || valor === '') {
      return;
    }

    props.onSalvar({
      titulo: titulo,
      data: data,
      valor: Number(valor),
    });
  }

  return (
    <div className="handle-overlay" onClick={props.onFechar}>
      <form
        className="handle"
        onClick={function (evento) {
          evento.stopPropagation();
        }}
        onSubmit={aoEnviarFormulario}
      >
        <h2>{tituloDoHandle}</h2>

        <label className="handle__campo">
          Título
          <input
            type="text"
            value={titulo}
            onChange={function (evento) {
              setTitulo(evento.target.value);
            }}
            placeholder="Ex: Supermercado"
          />
        </label>

        <label className="handle__campo">
          Data
          <input
            type="date"
            value={data}
            onChange={function (evento) {
              setData(evento.target.value);
            }}
          />
        </label>

        <label className="handle__campo">
          Valor (R$)
          <input
            type="number"
            step="0.01"
            min="0"
            value={valor}
            onChange={function (evento) {
              setValor(evento.target.value);
            }}
            placeholder="0,00"
          />
        </label>

        <div className="handle__acoes">
          <button
            type="button"
            className="handle__botao handle__botao--secundario"
            onClick={props.onFechar}
          >
            Cancelar
          </button>
          <button type="submit" className="handle__botao handle__botao--primario">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemHandle;