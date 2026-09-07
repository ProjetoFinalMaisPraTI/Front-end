import { useState } from 'react';
import './Handle.css';

// Handle - usado pra ADICIONAR ou EDITAR item.
// texto do título muda com modo adicionar/editar e tipo despesas/ganhos.
//
// Props:
// - tipo: "despesas" ou "ganhos"
// - modo: "adicionar" ou "editar"
// - itemInicial: o item que está sendo editado (ou null, se for adicionar)
// - onSalvar: function(dadosDoFormulario)
// - onFechar: function()
function ItemHandle(props) {
  const [titulo, setTitulo] = useState(props.itemInicial ? props.itemInicial.titulo : '');
  const [data, setData] = useState(props.itemInicial ? props.itemInicial.data : '');
  const [valor, setValor] = useState(props.itemInicial ? props.itemInicial.valor : '');

  // mensagem de erro, avisa se algum campo obrigatório não foi preenchido
  const [erro, setErro] = useState('');

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

    // validação: nenhum campo pode estar vazio
    if (titulo.trim() === '' || data.trim() === '' || valor === '') {
      setErro('Preencha todos os campos antes de salvar.');
      return;
    }

    const valorEmNumero = Number(valor);
    if (isNaN(valorEmNumero) || valorEmNumero <= 0) {
      setErro('Digite um valor numérico maior que zero.');
      return;
    }

    setErro('');
    props.onSalvar({
      titulo: titulo.trim(),
      data: data,
      valor: valorEmNumero,
    });
  }

  return (
    // clicar no fundo escuro fecha o modal, clicar dentro do formulário não
    // pelo stopPropagation
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
            placeholder={props.tipo === 'ganhos' ? 'Ex: Salário' : 'Ex: Supermercado'}
          />
        </label>

        <label className="handle__campo">
          Data
          {/* mantemos texto simples aqui (não type="date") pra bater com o formato
              dd/mm/aaaa que já é usado nos dados existentes do Movimentacoes.jsx */}
          <input
            type="text"
            value={data}
            onChange={function (evento) {
              setData(evento.target.value);
            }}
            placeholder="dd/mm/aaaa"
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

        {erro !== '' && <p className="handle__erro">{erro}</p>}

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