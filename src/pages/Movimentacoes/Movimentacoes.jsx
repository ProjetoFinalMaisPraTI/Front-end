import { useState } from 'react';
import Transactions from '../Transactions/Transactions';
import ItemHandle from '../../components/Handle/ItemHandle';
import ExcluirHandle from '../../components/Handle/ExcluirHandle';
import './Movimentacoes.css';

// Dados de exemplo, só pra gente ter algo pra mostrar na tela.
// Depois isso deve vir do backend/contexto do app de verdade.
const dadosIniciais = {
  despesas: [
    { id: 1, titulo: 'Supermercado', data: '28/08/2026', valor: 214.5 },
    { id: 2, titulo: 'Uber', data: '27/08/2026', valor: 32.9 },
    { id: 3, titulo: 'Passagem aérea', data: '24/08/2026', valor: 890.0 },
  ],
  ganhos: [{ id: 1, titulo: 'Salário', data: '05/08/2026', valor: 3500.0 }],
};

function Movimentacoes() {
  // guarda qual aba está selecionada: "despesas" ou "ganhos"
  const [abaAtiva, setAbaAtiva] = useState('despesas');

  // guarda as duas listas juntas
  const [itens, setItens] = useState(dadosIniciais);

  // guarda o id do item que está "aberto" (arrastado, mostrando editar/excluir)
  const [itemAbertoId, setItemAbertoId] = useState(null);

  // guarda qual handle (modal) está aberto no momento
  // pode ser: null, "adicionar", "editar" ou "excluir"
  const [tipoDeHandle, setTipoDeHandle] = useState(null);

  // guarda o id do item que está sendo editado ou excluído (quando for o caso)
  const [idSelecionado, setIdSelecionado] = useState(null);

  // pega a lista certa de acordo com a aba selecionada
  let listaAtiva = itens.despesas;
  if (abaAtiva === 'ganhos') {
    listaAtiva = itens.ganhos;
  }

  function trocarAba(novaAba) {
    setAbaAtiva(novaAba);
    setItemAbertoId(null); // fecha qualquer item que estava arrastado
  }

  function alternarItemAberto(id) {
    if (itemAbertoId === id) {
      setItemAbertoId(null);
    } else {
      setItemAbertoId(id);
    }
  }

  function abrirHandleAdicionar() {
    setItemAbertoId(null);
    setTipoDeHandle('adicionar');
  }

  function abrirHandleEditar(id) {
    setIdSelecionado(id);
    setTipoDeHandle('editar');
  }

  function abrirHandleExcluir(id) {
    setIdSelecionado(id);
    setTipoDeHandle('excluir');
  }

  function fecharHandle() {
    setTipoDeHandle(null);
    setIdSelecionado(null);
  }

  // chamado pelo handle de adicionar/editar quando o usuário aperta "Salvar"
  function salvarItem(dadosDoFormulario) {
    // faz uma cópia da lista da aba atual
    const listaCopia = listaAtiva.slice();

    if (tipoDeHandle === 'adicionar') {
      // gera um id novo simples, usando a hora atual
      const novoItem = {
        id: Date.now(),
        titulo: dadosDoFormulario.titulo,
        data: dadosDoFormulario.data,
        valor: dadosDoFormulario.valor,
      };
      listaCopia.unshift(novoItem); // coloca o novo item no começo da lista
    }

    if (tipoDeHandle === 'editar') {
      for (let i = 0; i < listaCopia.length; i++) {
        if (listaCopia[i].id === idSelecionado) {
          listaCopia[i] = {
            id: listaCopia[i].id,
            titulo: dadosDoFormulario.titulo,
            data: dadosDoFormulario.data,
            valor: dadosDoFormulario.valor,
          };
        }
      }
    }

    // atualiza só a lista da aba atual, mantendo a outra do jeito que estava
    if (abaAtiva === 'despesas') {
      setItens({ despesas: listaCopia, ganhos: itens.ganhos });
    } else {
      setItens({ despesas: itens.despesas, ganhos: listaCopia });
    }

    fecharHandle();
  }

  // chamado pelo handle de excluir quando o usuário confirma
  function confirmarExclusao() {
    const listaNova = [];
    for (let i = 0; i < listaAtiva.length; i++) {
      if (listaAtiva[i].id !== idSelecionado) {
        listaNova.push(listaAtiva[i]);
      }
    }

    if (abaAtiva === 'despesas') {
      setItens({ despesas: listaNova, ganhos: itens.ganhos });
    } else {
      setItens({ despesas: itens.despesas, ganhos: listaNova });
    }

    setItemAbertoId(null);
    fecharHandle();
  }

  // procura o item que está sendo editado, pra preencher o formulário
  let itemEmEdicao = null;
  if (tipoDeHandle === 'editar') {
    for (let i = 0; i < listaAtiva.length; i++) {
      if (listaAtiva[i].id === idSelecionado) {
        itemEmEdicao = listaAtiva[i];
      }
    }
  }

  // texto usado na mensagem de "lista vazia" e no aria-label do botão "+"
  let rotulo = 'despesa';
  if (abaAtiva === 'ganhos') {
    rotulo = 'ganho';
  }

  return (
    <div className="movimentacoes">
      <div className="movimentacoes__topo">
        <h1>Movimentações</h1>
        <button
          type="button"
          className="movimentacoes__botao-add"
          onClick={abrirHandleAdicionar}
          aria-label={'Adicionar ' + rotulo}
        >
          +
        </button>
      </div>

      <div className="movimentacoes__abas">
        <button
          type="button"
          className={
            abaAtiva === 'despesas'
              ? 'movimentacoes__aba movimentacoes__aba--ativa'
              : 'movimentacoes__aba'
          }
          onClick={function () {
            trocarAba('despesas');
          }}
        >
          Despesas
        </button>

        <button
          type="button"
          className={
            abaAtiva === 'ganhos'
              ? 'movimentacoes__aba movimentacoes__aba--ativa'
              : 'movimentacoes__aba'
          }
          onClick={function () {
            trocarAba('ganhos');
          }}
        >
          Ganhos
        </button>
      </div>

      <div className="movimentacoes__lista">
        {listaAtiva.length === 0 && (
          <p className="movimentacoes__vazio">Nenhum(a) {rotulo} cadastrado(a) ainda.</p>
        )}

        {listaAtiva.map(function (item) {
          return (
            <Transactions
              key={item.id}
              item={item}
              tipo={abaAtiva}
              aberto={itemAbertoId === item.id}
              onAbrir={function () {
                alternarItemAberto(item.id);
              }}
              onEditar={abrirHandleEditar}
              onExcluir={abrirHandleExcluir}
            />
          );
        })}
      </div>

      {(tipoDeHandle === 'adicionar' || tipoDeHandle === 'editar') && (
        <ItemHandle
          tipo={abaAtiva}
          modo={tipoDeHandle}
          itemInicial={itemEmEdicao}
          onSalvar={salvarItem}
          onFechar={fecharHandle}
        />
      )}

      {tipoDeHandle === 'excluir' && (
        <ExcluirHandle tipo={abaAtiva} onConfirmar={confirmarExclusao} onFechar={fecharHandle} />
      )}
    </div>
  );
}

export default Movimentacoes;