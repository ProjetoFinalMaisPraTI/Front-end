import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Transactions.css";

// valores iniciais "vazios" do formulário, quando abre o modal de adicionar
const formularioVazio = {
  titulo: "",
  valor: "",
  data: "",
  parcelado: false,
  qtdParcelas: "",
  descricao: "",
  recorrente: "nao",
  repetirDias: "",
};

export default function Transactions() {
  // aba selecionada: "despesas" ou "ganhos"
  const [abaAtiva, setAbaAtiva] = useState("despesas");

  // lista vindas do backend
  const [despesas, setDespesas] = useState([]);
  const [ganhos, setGanhos] = useState([]);

  // id do item que está "aberto" (mostra os botões de editar/excluir no lugar da seta, sem deslizar o resto do conteúdo)
  const [itemAbertoId, setItemAbertoId] = useState(null);

  // qual modal está aberto: null,  "adicionar", "editar",  "excluir"
  const [modalAberto, setModalAberto] = useState(null);

  // item editando ou excluindo no momento
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // todos os campos do formulário de adicionar/editar ficam num objeto só
  const [formulario, setFormulario] = useState(formularioVazio);

  // pega a lista certa dependendo da aba
  const itens = abaAtiva === "despesas" ? despesas : ganhos;
  
  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    try {
      const response = await api.get("/transacoes");
      const dados = response.data;

      setDespesas(dados.filter(item => item.tipo === "despesa"));
      setGanhos(dados.filter(item => item.tipo === "ganho"));

    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }

  function trocarAba(aba) {
    setAbaAtiva(aba);
    setItemAbertoId(null);
  }

  function alternarItem(id) {
    setItemAbertoId(itemAbertoId === id ? null : id);
  }

  // atualiza só um campo do formulário, mantendo o resto como estava
  function atualizarCampo(campo, valor) {
    setFormulario((formularioAtual) => ({ ...formularioAtual, [campo]: valor }));
  }

  function abrirModalAdicionar() {
    setFormulario(formularioVazio);
    setItemSelecionado(null);
    setModalAberto("adicionar");
  }

  function abrirModalEditar(item) {
    setFormulario({
      titulo: item.titulo,
      valor: String(item.valor),
      data: item.data,
      parcelado: item.parcelado,
      qtdParcelas: item.qtdParcelas || "",
      descricao: item.descricao || "",
      recorrente: item.recorrente || "nao",
      repetirDias: item.repetirDias || "",
    });
    setItemSelecionado(item);
    setModalAberto("editar");
  }

  function abrirModalExcluir(item) {
    setItemSelecionado(item);
    setModalAberto("excluir");
  }

  function fecharModal() {
    setModalAberto(null);
    setItemSelecionado(null);
  }

  async function salvarItem(evento) {
    evento.preventDefault();
    if (!formulario.titulo || !formulario.valor || !formulario.data) {
      alert("Preencha pelo menos título, valor e data!");
      return;
    }

    const dadosDoItem = {
      titulo: formulario.titulo,
      valor: Number(formulario.valor),
      data: formulario.data,
      parcelado: formulario.parcelado,
      qtdParcelas: formulario.parcelado ? formulario.qtdParcelas : "",
      descricao: formulario.descricao,
      recorrente: formulario.recorrente,
      repetirDias: formulario.recorrente === "personalizado" ? formulario.repetirDias : "",
      tipo: abaAtiva === "despesas" ? "despesa" : "ganho",
    };

    try {
      if (modalAberto === "adicionar") {
        const response = await api.post("/transacoes", dadosDoItem);
        if (abaAtiva === "despesas") {
          setDespesas([response.data, ...despesas]);
        } else {
          setGanhos([response.data, ...ganhos]);
        }
      }

      if (modalAberto === "editar") {
        const response = await api.put(`/transacoes/${itemSelecionado.id}`, dadosDoItem);
        const atualizados = itens.map((item) => 
          item.id === itemSelecionado.id ? response.data : item);
        if (abaAtiva === "despesas") {
          setDespesas(atualizados);
        } else {
          setGanhos(atualizados);
        }
      }

      fecharModal();

    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      alert("Ocorreu um erro ao salvar a transação. Por favor, tente novamente.");
    }
  }

 

  async function confirmarExclusao() {
    try {
      await api.delete(`/transacoes/${itemSelecionado.id}`);
      const filtrados = itens.filter((item) => item.id !== itemSelecionado.id);
      if (abaAtiva === "despesas") {
        setDespesas(filtrados);
      } else {
        setGanhos(filtrados);
      }
      fecharModal();
    } catch (erro) {
      console.error("Erro ao excluir transação:", erro);
      alert("Erro ao excluir o item.");
    }
  }

  // texto usado em vários lugares: "despesa" ou "ganho"
  const nomeDoTipo = abaAtiva === "despesas" ? "despesa" : "ganho";

  return (
    <div className="movimentacoes-pagina">
      <div className="cabecalho">
        <h1>Movimentações</h1>
      </div>

      <div className="linha-abas">
        <div className="abas">
          <button
            className={abaAtiva === "despesas" ? "aba aba-ativa" : "aba"}
            onClick={() => trocarAba("despesas")}
          >
            Despesas
          </button>
          <button
            className={abaAtiva === "ganhos" ? "aba aba-ativa" : "aba"}
            onClick={() => trocarAba("ganhos")}
          >
            Ganhos
          </button>
        </div>

        <button className="botao-adicionar" onClick={abrirModalAdicionar}>
          +
        </button>
      </div>

      <ul className="lista-itens">
        {itens.map((item) => {
          const aberto = itemAbertoId === item.id;

          return (
            <li key={item.id} className="item-linha">
              <div className="item-conteudo" onClick={() => alternarItem(item.id)}>
                <div className="item-info">
                  <span className="item-descricao">{item.titulo}</span>
                  <span className="item-data">{formatarDataParaExibir(item.data)}</span>
                </div>

                {/* valor + seta/botões ficam juntos do lado direito */}
                <div className="item-lado-direito">
                  <span className={abaAtiva === "despesas" ? "item-valor item-valor-despesa" : "item-valor item-valor-ganho"}>
                    R$ {item.valor.toFixed(2).replace(".", ",")}
                  </span>

                  <div className="item-acao">
                    {aberto ? (
                      <>
                        <button
                          className="botao-editar"
                          onClick={(evento) => {
                            evento.stopPropagation();
                            abrirModalEditar(item);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="botao-excluir"
                          onClick={(evento) => {
                            evento.stopPropagation();
                            abrirModalExcluir(item);
                          }}
                        >
                          🗑️
                        </button>
                      </>
                    ) : (
                      <span className="seta">›</span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* modal de adicionar ou editar (o mesmo formulário serve pros dois) */}
      {(modalAberto === "adicionar" || modalAberto === "editar") && (
        <div className="fundo-modal" onClick={fecharModal}>
          <form className="caixa-modal" onClick={(evento) => evento.stopPropagation()} onSubmit={salvarItem}>
            <div className="modal-cabecalho">
              <h2>
                {modalAberto === "adicionar" ? "Nova" : "Editar"} {nomeDoTipo}
              </h2>
              <button type="button" className="botao-fechar" onClick={fecharModal}>
                ×
              </button>
            </div>

            <label className="campo">
              Título
              <input
                type="text"
                placeholder="Ex: Supermercado"
                value={formulario.titulo}
                onChange={(evento) => atualizarCampo("titulo", evento.target.value)}
              />
            </label>

            <div className="linha-dois-campos">
              <label className="campo">
                Valor
                <input
                  type="number"
                  step="0.01"
                  placeholder="R$ 0,00"
                  value={formulario.valor}
                  onChange={(evento) => atualizarCampo("valor", evento.target.value)}
                />
              </label>

              <label className="campo">
                Data
                <input
                  type="date"
                  value={formulario.data}
                  onChange={(evento) => atualizarCampo("data", evento.target.value)}
                />
              </label>
            </div>

            <div className="linha-dois-campos">
              {/* "À vista" e "Parcelado" funcionam como um par: só um dos dois fica marcado */}
              <div className="campo-opcoes-pagamento">
                <label className="opcao-checkbox">
                  <input
                    type="checkbox"
                    checked={!formulario.parcelado}
                    onChange={() => atualizarCampo("parcelado", false)}
                  />
                  À vista
                </label>
                <label className="opcao-checkbox">
                  <input
                    type="checkbox"
                    checked={formulario.parcelado}
                    onChange={() => atualizarCampo("parcelado", true)}
                  />
                  Parcelado
                </label>
              </div>

              <label className="campo">
                Qtd. de parcelas
                <input
                  type="number"
                  min="2"
                  placeholder="—"
                  disabled={!formulario.parcelado}
                  value={formulario.qtdParcelas}
                  onChange={(evento) => atualizarCampo("qtdParcelas", evento.target.value)}
                />
              </label>
            </div>

            <label className="campo">
              Descrição (opcional)
              <textarea
                placeholder={`Adicione detalhes sobre essa ${nomeDoTipo}...`}
                value={formulario.descricao}
                onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
              />
            </label>

            <div className="linha-dois-campos">
              <label className="campo">
                Recorrente?
                <select
                  value={formulario.recorrente}
                  onChange={(evento) => atualizarCampo("recorrente", evento.target.value)}
                >
                  <option value="nao">Não</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </label>

              <label className="campo">
                Repetir a cada (dias)
                <input
                  type="number"
                  min="1"
                  placeholder="Ex: 15"
                  disabled={formulario.recorrente !== "personalizado"}
                  value={formulario.repetirDias}
                  onChange={(evento) => atualizarCampo("repetirDias", evento.target.value)}
                />
              </label>
            </div>

            <div className="modal-botoes">
              <button type="button" className="botao-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
              <button type="submit" className="botao-salvar">
                {modalAberto === "adicionar" ? "Salvar" : "Alterar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* modal de confirmar exclusão */}
      {modalAberto === "excluir" && itemSelecionado && (
        <div className="fundo-modal" onClick={fecharModal}>
          <div className="caixa-modal caixa-modal-excluir" onClick={(evento) => evento.stopPropagation()}>
            <div className="icone-lixeira">🗑️</div>
            <h2>Excluir {nomeDoTipo}?</h2>
            <p className="texto-confirmacao">
              Tem certeza que deseja excluir esta {nomeDoTipo}? Essa ação não pode ser desfeita.
            </p>

            <div className="resumo-item-excluir">
              <div className="item-info">
                <span className="item-descricao">{itemSelecionado.titulo}</span>
                <span className="item-data">{formatarDataParaExibir(itemSelecionado.data)}</span>
              </div>
              <span className={abaAtiva === "despesas" ? "item-valor item-valor-despesa" : "item-valor item-valor-ganho"}>
                R$ {itemSelecionado.valor.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <div className="modal-botoes">
              <button className="botao-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="botao-excluir-confirmar" onClick={confirmarExclusao}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// transforma "2026-08-27" (input type="date") em "27/08/2026"
function formatarDataParaExibir(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}