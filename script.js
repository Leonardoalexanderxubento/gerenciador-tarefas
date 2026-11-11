const campo = document.getElementById("campoTarefa");
const botao = document.getElementById("botaoAdicionar");
const lista = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarTarefa(tarefa) {
  const item = document.createElement("li");

  const texto = document.createElement("span");
  texto.textContent = tarefa.texto;
  if (tarefa.feita) item.classList.add("feita");

  texto.addEventListener("click", () => {
    tarefa.feita = !tarefa.feita;
    item.classList.toggle("feita");
    salvar();
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";
  botaoRemover.addEventListener("click", () => {
    item.remove();
    tarefas.splice(tarefas.indexOf(tarefa), 1);
    salvar();
  });

  item.appendChild(texto);
  item.appendChild(botaoRemover);
  lista.appendChild(item);
}

function adicionarTarefa() {
  const texto = campo.value.trim();
  if (texto === "") return;

  const tarefa = { texto: texto, feita: false };
  tarefas.push(tarefa);
  salvar();
  mostrarTarefa(tarefa);
  campo.value = "";
}

tarefas.forEach(mostrarTarefa);
botao.addEventListener("click", adicionarTarefa);

campo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") adicionarTarefa();
});