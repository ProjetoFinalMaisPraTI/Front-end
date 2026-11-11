import { useState, useEffect } from 'react';
import Transactions from '../Transactions/Transactions';
import ItemHandle from '../../components/Handle/ItemHandle';
import ExcluirHandle from '../../components/Handle/ExcluirHandle';
import api from '../../services/api';
import './Movimentacoes.css';

function Movimentacoes() {
  // Guarda qual aba está selecionada: "despesas" ou "ganhos"
  const [abaAtiva, setAbaAtiva] = useState('despesas');

  // Guardam as listas separadas vindas do backend
  const [despesas, setDespesas] = useState([]);
  const [ganhos, setGanhos] = useState([]);

  // Guarda o id do item que está "aberto" (mostrando editar/excluir)
  const [itemAbertoId, setItemAbertoId] = useState(null);

  // Guarda qual handle (modal) está aberto no momento: null, "adicionar", "editar" ou "excluir"
  const [tipoDeHandle, setTipoDeHandle] = useState(null);

  // Guarda o id do item que está sendo editado ou excluído
  const [idSelecionado, setIdSelecionado] = useState(null);

  // Pega a lista certa de acordo com a aba selecionada
  const listaAtiva = abaAtiva === 'despesas' ? despesas : ganhos;

  // Carregar transações do backend ao abrir a página
  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    try {
      const response = await api.get('/transacoes');
      const dados = response.data;

      // Filtra os dados com base no tipo retornado pelo backend
      setDespesas(dados.filter(item => item.tipo === 'despesa' || item.tipo === 'DESPESA'));
      setGanhos(dados.filter(item => item.tipo === 'ganho' || item.tipo === 'GANHO'));
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }

  function trocarAba(novaAba) {
    setAbaAtiva(novaAba);
    setItemAbertoId(null);
  }

  function alternarItemAberto(id) {
    setItemAbertoId(itemAbertoId === id ? null : id);
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

  // Chamado pelo handle de adicionar/editar quando o usuário aperta "Salvar"
  async function salvarItem(dadosDoFormulario) {
    const dadosDoItem = {
      titulo: dadosDoFormulario.titulo,
      valor: Number(dadosDoFormulario.valor),
      data: dadosDoFormulario.data, // Formato "YYYY-MM-DD" esperado pelo backend/input date
      tipo: abaAtiva === 'despesas' ? 'despesa' : 'ganho',
      parcelado: dadosDoFormulario.parcelado || false,
      qtdParcelas: dadosDoFormulario.qtdParcelas || "",
      descricao: dadosDoFormulario.descricao || "",
      recorrente: dadosDoFormulario.recorrente || "nao",
      repetirDias: dadosDoFormulario.repetirDias || "",
    };

    try {
      if (tipoDeHandle === 'adicionar') {
        const response = await api.post('/transacoes', dadosDoItem);
        if (abaAtiva === 'despesas') {
          setDespesas([response.data, ...despesas]);
        } else {
          setGanhos([response.data, ...ganhos]);
        }
      }

      if (tipoDeHandle === 'editar') {
        const response = await api.put(`/transacoes/${idSelecionado}`, dadosDoItem);
        const atualizarLista = (lista) =>
          lista.map((item) => (item.id === idSelecionado ? response.data : item));

        if (abaAtiva === 'despesas') {
          setDespesas(atualizarLista(despesas));
        } else {
          setGanhos(atualizarLista(ganhos));
        }
      }

      fecharHandle();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      alert("Ocorreu um erro ao salvar a transação.");
    }
  }

  // Chamado pelo handle de excluir quando o usuário confirma
  async function confirmarExclusao() {
    try {
      await api.delete(`/transacoes/${idSelecionado}`);

      if (abaAtiva === 'despesas') {
        setDespesas(despesas.filter((item) => item.id !== idSelecionado));
      } else {
        setGanhos(ganhos.filter((item) => item.id !== idSelecionado));
      }

      setItemAbertoId(null);
      fecharHandle();
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      alert("Ocorreu um erro ao excluir a transação.");
    }
  }

  // Procura o item que está sendo editado, para preencher o formulário
  let itemEmEdicao = null;
  if (tipoDeHandle === 'editar') {
    itemEmEdicao = listaAtiva.find((item) => item.id === idSelecionado) || null;
  }

  let rotulo = abaAtiva === 'despesas' ? 'despesa' : 'ganho';

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
          onClick={() => trocarAba('despesas')}
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
          onClick={() => trocarAba('ganhos')}
        >
          Ganhos
        </button>
      </div>

      <div className="movimentacoes__lista">
        {listaAtiva.length === 0 && (
          <p className="movimentacoes__vazio">Nenhum(a) {rotulo} cadastrado(a) ainda.</p>
        )}

        {listaAtiva.map((item) => {
          return (
            <Transactions
              key={item.id}
              item={item}
              tipo={abaAtiva}
              aberto={itemAbertoId === item.id}
              onAbrir={() => alternarItemAberto(item.id)}
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