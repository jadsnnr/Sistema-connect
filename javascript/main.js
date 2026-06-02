const form = document.getElementById("registroForm");
const tabela = document.getElementById("tabelaRegistros");
const totalRegistros = document.getElementById("totalRegistros");
const totalDespesas = document.getElementById("despesas");
const totalReceitas = document.getElementById("receitas");
const saldo = document.getElementById("saldo");
const saudações = document.querySelector(".greetings");

let registros = JSON.parse(localStorage.getItem("registros")) || [];
let editandoIndex = null;

function obterSaudacao() {
  const horaAtual = new Date().getHours();

  if (horaAtual < 12) {
    return "Bom dia";
  } else if (horaAtual < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
saudações.innerText = obterSaudacao();

function salvarLocalStorage() {
  localStorage.setItem("registros", JSON.stringify(registros));
}

function atualizarDashboard() {
  totalRegistros.textContent = registros.length;

  const total = registros.reduce((acc, item) => acc + Number(item.valor), 0);
  totalReceitas.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const despesas = registros.reduce(
    (acc, item) => acc + Number(item.despesa),
    0,
  );
  totalDespesas.textContent = despesas.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const saldo = total - despesas;
  document.getElementById("saldo").textContent = saldo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderizarTabela() {
  tabela.innerHTML = "";

  registros.forEach((registro, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
          <td>${registro.nome}</td>
          <td>${registro.categoria}</td>
          <td>${Number(registro.despesa).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</td>
          <td>${Number(registro.valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</td>
          <td>
            <div class="actions">
              <button class="btn-edit" onclick="editarRegistro(${index})">Editar</button>
              <button class="btn-delete" onclick="deletarRegistro(${index})">Excluir</button>
            </div>
          </td>
        `;

    tabela.appendChild(tr);
  });

  atualizarDashboard();
  salvarLocalStorage();
}

function editarRegistro(index) {
  const registro = registros[index];

  document.getElementById("nome").value = registro.nome;
  document.getElementById("categoria").value = registro.categoria;
  document.getElementById("despesa").value = registro.despesa;
  document.getElementById("valor").value = registro.valor;

  editandoIndex = index;
}

function deletarRegistro(index) {
  if (confirm("Deseja realmente excluir este registro?")) {
    registros.splice(index, 1);
    renderizarTabela();
  }
}

if (form) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;

    const categoria = document.getElementById("categoria").value;

    const despesa = document.getElementById("despesa").value;

    const valor = document.getElementById("valor").value;

    const novoRegistro = {
      nome,
      categoria,
      despesa,
      valor,
    };

    if (editandoIndex !== null) {

      registros[editandoIndex] = novoRegistro;

      editandoIndex = null;

    } else {

      registros.push(novoRegistro);

    }

    form.reset();

    renderizarTabela();

  });

}

if (tabela) {

  renderizarTabela();

}