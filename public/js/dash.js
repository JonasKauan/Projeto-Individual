var menu_dados_ativo = true;
var menu_ranking_ativo = false;

function animacao_tela() {
    div_dados.classList.toggle('dados_hide');
    div_dados.classList.toggle('dados_show');
}

// eventos para troca de tela
bt_ranking.addEventListener('click', () => {
    if (!menu_ranking_ativo) {
        menu_dados_ativo = false;
        menu_ranking_ativo = true;
        setTimeout(() => {
            animacao_tela();
            setTimeout(() => {
                div_dados.innerHTML = `
                        <div id="div_ranking">
                        <div id="div_grafico">
                            <h4 class="h4_titulo">Comparação dos seus resultados</h4>
                            <div class="div_canvas">
                                <canvas id="grafico_comparacao"></canvas>
                            </div>
                            <h4 class="h4_titulo">Média de pontuação por categoria</h4>
                            <div class="div_canvas">
                                <canvas id="grafico_pts_categoria"></canvas>
                            </div>
                        </div>
                        <div class="ranking">
                            <h4 class="h4_titulo">Ranking</h4>
                            <table id="table_ranking"></table>
                        </div>
                    </div>
                `;
                construir_graficos();
                animacao_tela();
            }, 1000)
        }, 500);
    }
})

bt_dados.addEventListener('click', () => {
    if (!menu_dados_ativo) {
        menu_dados_ativo = true;
        menu_ranking_ativo = false;
        setTimeout(() => {
            animacao_tela();
            setTimeout(() => {
                div_dados.innerHTML = `
                    <div id="section_dados_gerais">
                    <div class="div_dados_gerais" id="div_qtd_usuarios">
                        <h4 id="txt_qtd_usuarios">Usuários cadastrados</h4>
                        <h4 id="qtd_usuarios"></h4>
                    </div>
        
                    <div class="div_dados_gerais" id="div_altura">
                        <h4 id="txt_qtd_usuarios">Média de altura dos usuários</h4>
                        <h4 id="h4_media_altura"></h4>
                    </div>
        
                    <div class="div_dados_gerais" id="div_altura">
                        <h4 id="txt_qtd_usuarios">Média de peso dos usuários</h4>
                        <h4 id="h4_media_peso"></h4>
                    </div>
                </div>

                <div id="section_dados_especificos">

                    <div class="div_tabelas">
                        <h4 class="h4_titulo">Usuários mais pesados</h4>
                        <h4 class="h4_titulo">Usuários mais altos</h4>
                    </div>

                    <div class="div_tabelas">
                        <div class="div_section" id="section_peso">
                            <table id="table_usuario_peso"></table>
                        </div>
            
                        <div class="div_section" id="section_altura">
                            <table id="table_usuario_altura"></table>
                        </div>
                    </div>

                    <h4 class="h4_titulo">Altura média de cada Arte marcial</h4>
                    <div class="div_canvas">
                        <canvas id="grafico_altura_medio_arte"></canvas>
                    </div>

                    <h4 class="h4_titulo">Peso médio de cada Arte marcial</h4>
                    <div class="div_canvas">
                        <canvas id="grafico_peso_medio_arte"></canvas>
                    </div>

                    <h4 class="h4_titulo">Quantidade de praticantes de cada arte marcial</h4>
                    <div class="div_canvas">
                        <canvas id="grafico_qtd_arte"></canvas>
                    </div>
                    
                    <h4 class="h4_titulo">Quantidade de usuários em cada categoria</h4>
                    <div class="div_canvas">
                        <canvas id="grafico_categoria"></canvas>
                    </div>
                `;
                construir_tabelas();
                animacao_tela();
            }, 1000)
        }, 500)
    }
});

function construir_grafico_pontuacao(resposta) {
    var cor_grafico_usuario = '8, 65, 92';
    var cor_grafico_media = '216, 39, 39';

    if(Number(sessionStorage.PONTUACAO_USUARIO) > resposta[0].mediaPts){
        cor_grafico_media = '8, 65, 92';
        cor_grafico_usuario = '216, 39, 39';
    }

    var data = {
        labels: ['Pontuação no quiz'],
        datasets: [{
            label: ['Sua pontuação'],
            data: [sessionStorage.PONTUACAO_USUARIO],
            backgroundColor: [`rgba(${cor_grafico_usuario}, 0.2)`],
            borderColor: [`rgb(${cor_grafico_usuario})`],
            borderWidth: 1
        },{
            label: ['Pontuação média do site'],
            data: [resposta[0].mediaPts],
            backgroundColor: [`rgba(${cor_grafico_media}, 0.2)`],
            borderColor: [`rgb(${cor_grafico_media})`],
            borderWidth: 1
        }]
    }

    var ctx = document.getElementById('grafico_comparacao');

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function contruir_grafico_pontuacao_categoria(resposta){
    var label_arr = [];
    var data_arr = [];

    for(var i = 0; i < resposta.length; i++){
        label_arr.push(resposta[i].categoriaNome);
        data_arr.push(resposta[i].mediaPts);
    }

    var data = {
        labels: label_arr,
        datasets: [{
            label: 'Média de pontos por categoria',
            data: data_arr,
            backgroundColor: 'rgba(212, 81, 19, 0.2)',
            borderColor: 'rgb(212, 81, 19)',
            borderWidth: 1
        }]
    };

    var ctx = document.getElementById('grafico_pts_categoria');

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function contruir_tabela_ranking(resposta){
    const tb = document.querySelector("#table_ranking");

    tb.innerHTML = `
        <tr>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    `

    for(var i = 0; i < resposta.length; i++){
        var pontuacao = 0;

        if(resposta[i].pts != null){
            pontuacao = resposta[i].pts;
        }

        tb.innerHTML += `
            <tr>
                <td>${i + 1}°</td>
                <td>${resposta[i].nome}</td>
                <td>${pontuacao}</td>
            </tr>
        `;
    }
}

function construir_graficos(){
    pegar_pontuacao_media();
    pegar_pontuacao_categoria();
    pegar_ranking();
}

//contruindo os gráficos da tela de dados

function construir_grafico_altura_artes(resposta){
    var label_arr = [];
    var data_arr = [];
    var altura_usuario = [];

    
    for(var i = 0; i < resposta.length; i++){
        altura_usuario.push(resposta[i].altura);
        label_arr.push(resposta[i].nome);
        data_arr.push(resposta[i].mediaAltura);
    }
    
    //COnstruindo o grafico
    var data = {
        labels: label_arr,
        datasets: [
        {
            label: 'Sua altura',
            data: altura_usuario,
            backgroundColor: 'rgba(216, 39, 39, 0.2)',
            borderColor: 'rgb(216, 39, 39)',
            borderWidth: 1
        },{
            label: 'Média de altura dos praticantes',
            data: data_arr,
            backgroundColor: 'rgba(8, 65, 92, 0.2)',
            borderColor: 'rgb(8, 65, 92)',
            borderWidth: 1
        }]
    }

    var ctx = document.getElementById('grafico_altura_medio_arte');
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function construir_grafico_peso_artes(resposta){
    var peso_usuario = [];
    var data_arr = [];
    var label_arr = [];

    for(var i = 0; i < resposta.length; i++){
        peso_usuario.push(resposta[i].peso);
        data_arr.push(resposta[i].mediaPeso);
        label_arr.push(resposta[i].nome);
    }

    //contrucao do gráfico
    var data = {
        labels: label_arr,
        datasets: [{
            label: 'Seu peso',
            data: peso_usuario,
            backgroundColor: 'rgba(216, 39, 39, 0.2)',
            borderColor: 'rgb(216, 39, 39)',
            borderWidth: 1

        },{
            label: 'Média de peso dos praticantes',
            data: data_arr,
            backgroundColor: 'rgba(84, 140, 47, 0.2)',
            borderColor: 'rgb(84, 140, 47)',
            borderWidth: 1
        }]
    }

    ctx = document.getElementById("grafico_peso_medio_arte");

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function construir_grafico_praticantes(resposta){
    var label_arr = [];
    var data_arr = [];

    for(var i = 0; i < resposta.length; i++){
        label_arr.push(resposta[i].nome);
        data_arr.push(resposta[i].praticantes);
    }

    // construindo grafico
    var data = {
        labels: label_arr,
        datasets: [{
            label: 'Quantidade de praticantes',
            data: data_arr,
            backgroundColor: 'rgba(212, 81, 19, 0.2)',
            borderColor: 'rgb(212, 81, 19)',
            borderWidth: 1
        }]
    };

    ctx = document.getElementById("grafico_qtd_arte");

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function construir_grafico_qtd_categoria(resposta){
    var data_arr = [];
    var label_arr = [];

    for(var i = 0; i < resposta.length; i++){
        data_arr.push(resposta[i].contagem);
        label_arr.push(resposta[i].nomeCategoria);
    }

    //construindo grafico
    data = {
        labels: label_arr,
        datasets: [{
            label: 'Quantidade de usuários',
            data: data_arr,
            backgroundColor: 'rgba(107, 5, 4, 0.2)',
            borderColor: 'rgb(107, 5, 4)',
            borderWidth: 1
        }]
    };

    var ctx = document.getElementById("grafico_categoria");

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function construir_tabelas(){
    contar_usuarios_cadastrados();
    fazer_medias();
    listar_usuarios_peso();
    listar_usuarios_altura();
    listar_altura_artes();
    listar_peso_artes();
    contar_praticantes();
    contar_usuarios_categoria();
}