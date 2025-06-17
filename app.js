// Seleciona os elementos do HTML com os quais vamos interagir
const formularioTarefa = document.querySelector('#formularioTarefa');
const campoTarefa = document.querySelector('#campoTarefa');
const listaDeTarefas = document.querySelector('#listaDeTarefas');

// Função para ADICIONAR uma nova tarefa
function adicionarTarefa(textoDaTarefa) {
    // 1. Cria o elemento <li> que representará a tarefa
    const itemTarefa = document.createElement('li');
    itemTarefa.className = 'item-tarefa'; // Adiciona uma classe para estilização

    // 2. Cria o <span> que conterá o texto da tarefa
    const textoItem = document.createElement('span');
    textoItem.textContent = textoDaTarefa;

    // 3. Cria a div para os botões de ação
    const divBotoes = document.createElement('div');
    divBotoes.className = 'botoes-acao';

    // 4. Cria o botão "Concluir"
    const btnConcluir = document.createElement('button');
    btnConcluir.innerHTML = '✔️'; // Pode usar texto ou ícones (como emojis)
    btnConcluir.className = 'btn-concluir';
    btnConcluir.title = 'Marcar como concluída'; // Dica ao passar o mouse
    btnConcluir.addEventListener('click', () => {
        itemTarefa.classList.toggle('concluida'); // Adiciona ou remove a classe 'concluida'
        // Se estiver editando, desabilita a edição ao concluir
        if (textoItem.isContentEditable) {
            textoItem.contentEditable = false;
            btnEditar.innerHTML = '✏️';
            btnEditar.title = 'Editar tarefa';
        }
    });

    // 5. Cria o botão "Editar"
    const btnEditar = document.createElement('button');
    btnEditar.innerHTML = '✏️';
    btnEditar.className = 'btn-editar';
    btnEditar.title = 'Editar tarefa';
    btnEditar.addEventListener('click', () => {
        if (textoItem.isContentEditable) {
            // Se já está editável, salva a alteração
            textoItem.contentEditable = false;
            btnEditar.innerHTML = '✏️'; // Volta para o ícone de editar
            btnEditar.title = 'Editar tarefa';
            // Poderia adicionar uma lógica para não salvar se o texto estiver vazio
            if (!textoItem.textContent.trim()) {
                alert("A tarefa não pode ficar vazia!");
                textoItem.textContent = textoDaTarefa; // Restaura o texto original (ou o último salvo)
            } else {
                // Atualiza o 'textoDaTarefa' original caso precise ser usado novamente (ex: se cancelar edição)
                // Aqui, como o texto já foi alterado no span, não precisamos fazer muito mais.
            }
        } else {
            // Se não está editável, torna editável
            // Não permite editar se a tarefa estiver concluída
            if (itemTarefa.classList.contains('concluida')) {
                alert('Desmarque a tarefa como concluída para poder editar.');
                return;
            }
            textoItem.contentEditable = true;
            textoItem.focus(); // Coloca o foco no texto para edição
            btnEditar.innerHTML = '💾'; // Muda para ícone de salvar
            btnEditar.title = 'Salvar alteração';
        }
    });
    // Adiciona um listener para salvar com "Enter" enquanto edita
    textoItem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && textoItem.isContentEditable) {
            event.preventDefault(); // Previne a quebra de linha no span
            textoItem.contentEditable = false;
            btnEditar.innerHTML = '✏️';
            btnEditar.title = 'Editar tarefa';
            if (!textoItem.textContent.trim()) {
                alert("A tarefa não pode ficar vazia! Alteração não salva.");
                textoItem.textContent = textoDaTarefa; // Restaura (precisaria de uma var com valor anterior)
                                                      // Para simplificar, vamos manter o valor que estava antes do Enter
            }
        }
    });


    // 6. Cria o botão "Excluir"
    const btnExcluir = document.createElement('button');
    btnExcluir.innerHTML = '🗑️';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.title = 'Excluir tarefa';
    btnExcluir.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) { // Pede confirmação
            listaDeTarefas.removeChild(itemTarefa);
        }
    });

    // 7. Adiciona os botões à div de botões
    divBotoes.appendChild(btnConcluir);
    divBotoes.appendChild(btnEditar);
    divBotoes.appendChild(btnExcluir);

    // 8. Adiciona o texto e a div de botões ao item da lista (<li>)
    itemTarefa.appendChild(textoItem);
    itemTarefa.appendChild(divBotoes);

    // 9. Adiciona o novo item da lista (<li>) à lista de tarefas (<ul>)
    listaDeTarefas.appendChild(itemTarefa);
}

// Event listener para o envio do formulário (quando o usuário clica em "Adicionar")
formularioTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    const textoDaNovaTarefa = campoTarefa.value.trim(); // Pega o valor do campo e remove espaços extras

    if (!textoDaNovaTarefa) {
        alert('Por favor, digite uma tarefa!'); // Alerta se o campo estiver vazio
        return; // Não faz mais nada se o campo estiver vazio
    }

    adicionarTarefa(textoDaNovaTarefa); // Chama a função para criar e adicionar a tarefa na lista

    campoTarefa.value = ''; // Limpa o campo de input
    campoTarefa.focus();    // Coloca o foco de volta no campo de input para facilitar a adição de novas tarefas
});

// Exemplo: Adicionar algumas tarefas iniciais para teste (opcional)
// adicionarTarefa("Estudar HTML");
// adicionarTarefa("Praticar CSS");
// adicionarTarefa("Dominar JavaScript DOM");