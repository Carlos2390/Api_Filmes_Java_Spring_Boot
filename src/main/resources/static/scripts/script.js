// Função para listar filmes
function listarFilmes() {
    fetch('/api/filmes')
        .then(response => response.json())
        .then(filmes => {
            const listaFilmes = document.getElementById('listaFilmes');
            listaFilmes.innerHTML = '';

            filmes.forEach(filme => {
                const card = criarCardFilme(filme);
                    listaFilmes.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao obter a lista de filmes:', error));
}

// Inicializar a página listando os filmes
listarFilmes();


// Função para criar um card de filme
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('col-md-4'); // Adicione classes para estilização

    // Link para o detalhe do filme
    const linkDetalhe = document.createElement('a');
    linkDetalhe.href = 'filmeDetalhe.html?id=' + filme.id;
    linkDetalhe.classList.add('card');

    // Conteúdo do card
    const imagem = document.createElement('div');
    imagem.innerHTML = `<img src="${filme.imagem}" alt="${filme.titulo}">`;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const titulo = document.createElement('h2');
    titulo.textContent = filme.titulo;

    const descricao = document.createElement('p');
    descricao.textContent = filme.descricao;

    // Adiciona os elementos ao card
    card.appendChild(linkDetalhe);
    linkDetalhe.appendChild(imagem);
    linkDetalhe.appendChild(cardContent);
    cardContent.appendChild(titulo);
    cardContent.appendChild(descricao);

    // Adiciona o evento de clique ao card
    card.addEventListener('click', () => {
        // Lógica a ser executada quando o card for clicado
        console.log(`Filme clicado: ${filme.titulo}`);
    });

    return card;
}
