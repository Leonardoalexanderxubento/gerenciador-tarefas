const campo = document.getElementById("campoTarefa");
const botao = document.getElementById("botaoAdicionar");
const lista = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarTarefa(texto) {
  const item = document.createElement("li");
  item.textContent = texto;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";
  botaoRemover.addEventListener("click", () => {
    item.remove();
    tarefas.splice(tarefas.indexOf(texto), 1);
    salvar();
  });

  item.appendChild(botaoRemover);
  lista.appendChild(item);
}

function adicionarTarefa() {
  const texto = campo.value.trim();
  if (texto === "") return;

  tarefas.push(texto);
  salvar();
  mostrarTarefa(texto);
  campo.value = "";
}

tarefas.forEach(mostrarTarefa);
botao.addEventListener("click", adicionarTarefa);