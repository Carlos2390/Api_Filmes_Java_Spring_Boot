document.addEventListener('DOMContentLoaded', function() {
    // Lógica para obter o ID do filme da URL
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get('id');

    // Lógica para preencher o formulário com os dados atuais do filme
    fetch(`/api/filmes/${filmeId}`)
        .then(response => response.json())
        .then(filme => {
            document.getElementById('titulo').value = filme.titulo;
            document.getElementById('descricao').value = filme.descricao;
            document.getElementById('imdb').value = filme.imdb;
            document.getElementById('url_image').value = filme.imagem;
            document.getElementById('ano').value = filme.ano;
            document.getElementById('duracao').value = filme.duracao;
        })
        .catch(error => console.error('Erro ao obter detalhes do filme:', error));

    const formEdicaoFilme = document.getElementById('formEdicaoFilme');
    formEdicaoFilme.addEventListener('submit', function(event) {
        event.preventDefault();

        // Lógica para obter os dados do formulário
        const dadosAtualizados = {
            titulo: formEdicaoFilme.titulo.value,
            descricao: formEdicaoFilme.descricao.value,
            imdb: formEdicaoFilme.imdb.value,
            imagem: formEdicaoFilme.url_image.value,
            ano: formEdicaoFilme.ano.value,
            duracao: formEdicaoFilme.duracao.value,
        };

        // Lógica para fazer uma requisição fetch à API para atualizar os dados no banco de dados
        fetch(`/api/filmes/${filmeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        })
        .then(response => response.json())
        .then(filmeAtualizado => {
            // Redirecione para a página filmeDetalhe após a atualização
            window.location.href = `filmeDetalhe.html?id=${filmeAtualizado.id}`;
        })
        .catch(error => console.error('Erro ao atualizar o filme:', error));
    });
});
