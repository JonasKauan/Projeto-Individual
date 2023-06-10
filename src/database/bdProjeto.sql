CREATE DATABASE bancoProjeto;
USE bancoProjeto;

CREATE TABLE arteMarcial(
	idArteMarcial int primary key auto_increment,
    nome varchar(45)
);

INSERT INTO arteMarcial VALUES
	(null, 'Judô'),
	(null, 'Sambo'),
	(null, 'Muay Thai'),
	(null, 'Jiu-Jitsu'),
	(null, 'Kickboxing'),
	(null, 'Boxe'),
	(null, 'Wrestling');
    
SELECT * FROM arteMarcial;
    
CREATE TABLE categoria(
	idCategoria int primary key auto_increment,
    nome VARCHAR(45)
);

INSERT INTO categoria VALUES
	 (null,'Mosca'),
	 (null,'Galo'),
	 (null,'Pena'),
	 (null,'Leve'),
     (null,'Meio-médio'),
	 (null,'Médio'),
     (null,'Meio-pesado'),
	 (null,'Pesado');
     
SELECT * FROM categoria;

CREATE TABLE usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(45),
    pts decimal(4,1),
    fkCategoria int,
    constraint fkCategoriaUsuario foreign key(fkCategoria)
		references categoria (idCategoria)
); 

DROP TABLE usuario;
            
SELECT * FROM dadosUsuario;

DROP TABLE dadosUsuario;

CREATE TABLE dadosUsuario(
	fkUsuario int,
    fkArteMarcial int,
    peso decimal(4,1),
    altura decimal(3,2),
    constraint pkCompostaDados primary key(fkUsuario, fkArteMarcial)
);

SELECT * FROM usuario;
SELECT * FROM dadosUsuario;
TRUNCATE dadosUsuario;
TRUNCATE usuario;

-- QUERYS PARA A DASH

-- medias gerais de peso e altura
SELECT truncate(AVG(altura),2) AS mediaAltura, truncate(AVG(peso),2) AS mediaPeso FROM dadosUsuario;


-- Usuarios mais altos
SELECT distinct nome, truncate(altura,2) as altura FROM dadosUsuario JOIN usuario
	ON fkUsuario = idUsuario
	ORDER BY altura desc limit 5;
    
-- usuarios mais pesados
SELECT distinct nome, truncate(peso,2) AS peso FROM dadosUsuario JOIN usuario
	ON fkUsuario = idUsuario
		ORDER BY peso desc limit 5;

-- media de peso por arte marcial
SELECT nome, truncate(AVG(peso),2) AS mediaPeso, (SELECT peso FROM dadosUsuario WHERE fkUsuario = 1 limit 1) FROM dadosUsuario RIGHT JOIN arteMarcial
	ON fkArteMarcial = idArteMarcial
		GROUP BY nome;
            
-- media de ALTURA por arte marcial
SELECT nome, truncate(AVG(altura),2) AS mediaAltura, (SELECT altura FROM dadosUsuario WHERE fkUsuario = 1 limit 1) AS altura FROM dadosUsuario RIGHT JOIN arteMarcial
	ON fkArteMarcial = idArteMarcial
		GROUP BY nome, fkUsuario;

-- praticantes de cada arte marcial
SELECT nome, COUNT(fKArteMarcial) AS praticantes FROM dadosUsuario RIGHT JOIN arteMarcial
	ON fkArteMarcial = idArteMarcial
		GROUP BY nome
			ORDER BY praticantes DESC;
            
            
-- qtd Usuarios em cada categoria (PRIMEIRO CADASTRAR AS CATEGORIAS DE PESO PARA PODER REALIZAR A CONTAGEM)
SELECT c.nome AS nomeCategoria, COUNT(idUsuario) AS contagem FROM usuario RIGHT JOIN categoria AS c
	ON fkCategoria = idCategoria
		GROUP BY nomeCategoria
			ORDER BY contagem desc;
        
-- media da pontuacao de todos os usuarios
SELECT truncate(avg(pts),2) AS mediaPts FROM usuario;

-- media de pontuacao em cada categoria
SELECT categoria.nome AS categoriaNome, truncate(avg(pts),2) AS mediaPts FROM usuario RIGHT JOIN categoria
	ON fkCategoria = idCategoria
		GROUP BY categoriaNome;
            
-- ranking
SELECT nome, pts FROM usuario
	ORDER BY pts desc;
    
SELECT * FROM categoria;