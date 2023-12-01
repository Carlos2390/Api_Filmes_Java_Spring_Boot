create table filmes(
    id bigint not null auto_increment,
    imdb varchar(50) not null,
    titulo varchar(255) not null,
    descricao varchar(255),
    imagem varchar(500),
    ano int,
    duracao varchar(10),

    primary key(id)
);