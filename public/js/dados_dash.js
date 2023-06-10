function contar_usuarios_cadastrados(){
    fetch("/usuarios/contar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                qtd_usuarios.innerHTML = resposta[0].contagem;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function fazer_medias(){
    fetch("/usuarios/media").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var media_altura = Number(resposta[0].mediaAltura);
                var media_peso = Number(resposta[0].mediaPeso);
                h4_media_altura.innerHTML = media_altura+"m";
                h4_media_peso.innerHTML = media_peso+"kg";
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function listar_usuarios_peso(){
    fetch("/usuarios/peso").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                const tb = document.querySelector("#table_usuario_peso");
                tb.innerHTML = `
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                `;
                for (let i = 0; i < resposta.length; i++) {
                    tb.innerHTML += `
                        <tr>
                            <td>${resposta[i].nome}</td>
                            <td>${resposta[i].peso}kg</td>
                        </tr>
                    `;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}


function listar_usuarios_altura(){
    fetch("/usuarios/altura").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                const tb = document.querySelector("#table_usuario_altura");
                tb.innerHTML = `
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                `;
                for (let i = 0; i < resposta.length; i++) {
                    tb.innerHTML += `
                        <tr>
                            <td>${resposta[i].nome}</td>
                            <td>${resposta[i].altura}m</td>
                        </tr>
                    `;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function listar_altura_artes(){
    fetch(`/medidas/altura/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                construir_grafico_altura_artes(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function listar_peso_artes(){
    fetch(`/medidas/peso/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                construir_grafico_peso_artes(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function contar_praticantes(){
    fetch(`/medidas/praticantes`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                construir_grafico_praticantes(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function contar_usuarios_categoria(){
    fetch(`/usuarios/categoria`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                construir_grafico_qtd_categoria(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function pegar_pontuacao_media(){
    fetch(`/usuarios/pontuacaoMedia`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                construir_grafico_pontuacao(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function pegar_pontuacao_categoria(){
    fetch(`/usuarios/pontuacaoCategoria`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                contruir_grafico_pontuacao_categoria(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function pegar_ranking(){
    fetch(`/usuarios/ranking`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                contruir_tabela_ranking(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}