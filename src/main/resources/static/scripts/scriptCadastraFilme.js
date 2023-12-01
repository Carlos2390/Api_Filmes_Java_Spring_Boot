// Função para cadastrar um filme
function salvarFilme(event) {
    event.preventDefault();

    const form = document.getElementById('formFilme');
    const filme = {
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        imdb: form.imdb.value,
        imagem: form.url_image.value,
        ano: form.ano.value,
        duracao: form.duracao.value,
        // Adicione outros campos conforme necessário
    };

    const method = form.getAttribute('data-id') ? 'PUT' : 'POST';
    const url = form.getAttribute('data-id') ? `/api/filmes/${form.getAttribute('data-id')}` : '/api/filmes';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filme),
    })
        .then(response => response.json())
        .then(filmeCadastrado => {
            console.log('Filme cadastrado/atualizado:', filmeCadastrado);
            window.location.href = `filmeDetalhe.html?id=${filmeCadastrado.id}`;
        })
        .catch(error => console.error('Erro ao cadastrar o filme:', error));
}

// Adicionar um listener para o formulário
document.getElementById('formFilme').addEventListener('submit', salvarFilme);