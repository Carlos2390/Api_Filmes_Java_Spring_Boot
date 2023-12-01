document.addEventListener('DOMContentLoaded', function() {
    // Extrai o ID do filme da URL
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get('id');

    // Simula uma chamada à API para obter os detalhes do filme
    // Substitua esta lógica pela chamada real à sua API
    const urlApiFilme = `/api/filmes/${filmeId}`;
   
    // Faça uma requisição fetch à API
    fetch(urlApiFilme)
        .then(response => response.json())
        .then(filmeDetalhe => {
            // Preenche os detalhes do filme na página
            document.getElementById('detalhesFilme').innerHTML = `
                <h2>${filmeDetalhe.titulo}</h2>
                <p>${filmeDetalhe.descricao}</p>
                <p>IMDB: ${filmeDetalhe.imdb}</p>
                <img src="${filmeDetalhe.imagem}" class="img-fluid" alt="Capa do Filme" style="max-width: 1000px; height: 500px; width: auto; display: block; margin: auto;">
                <p>Ano de Lançamento: ${filmeDetalhe.ano}</p>
                <p>Duração: ${filmeDetalhe.duracao}</p>
                <!-- Adicione outros campos conforme necessário -->

                <!-- Botão para Editar Filme -->
                <a id="btnEditarFilme" class="btn btn-primary">Editar Filme</a>
                <!-- Botão para Excluir Filme -->
                <button id="btnExcluirFilme" class="btn btn-danger">Excluir Filme</button>
            `;

            // Adiciona evento de clique ao botão se o ID do filme estiver presente
            if (filmeId) {
                const btnEditarFilme = document.getElementById('btnEditarFilme');
                btnEditarFilme.href = `edicaoFilme.html?id=${filmeId}`;
            }

            // Adiciona evento de clique ao botão de exclusão
            const btnExcluirFilme = document.getElementById('btnExcluirFilme');
            btnExcluirFilme.addEventListener('click', function() {
                // Exibe um alerta de confirmação
                const confirmacao = confirm("Tem certeza que deseja excluir este filme?");
                if (confirmacao) {
                    // Se confirmado, faz a requisição fetch à API para excluir o filme
                    fetch(`/api/filmes/${filmeId}`, {
                        method: 'DELETE',
                    })
                    .then(() => {
                        // Após a exclusão, redireciona para a página inicial ou realiza outra ação necessária
                        window.location.href = 'index.html'; // Redireciona para a página inicial
                    })
                    .catch(error => console.error('Erro ao excluir o filme:', error));
                }
            });
        })
        .catch(error => console.error('Erro ao obter detalhes do filme:', error));
});
