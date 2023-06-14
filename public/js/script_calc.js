lista_artes_marciais = [];

    function mostar_arte_marcial() {
        var cor_row = "";
        
        var lista = `
            <tr>
                <th></th>
                <th></th>
            </tr>
        `;

        for (var i = 0; i < lista_artes_marciais.length; i++) {

            if((i + 1) % 2 == 0){
                cor_row = "#eee";
            }else{
                cor_row = "#ffff"
            }

            lista += `
                <tr style="background-color: ${cor_row}">
                    <td>${i+1}</td>
                    <td>${lista_artes_marciais[i].nome}</td>
                </tr>
        `;
    }

    tb.innerHTML = lista;
}

    function enable_button(itens_na_lista){

        if(itens_na_lista){
            bt_proximo.removeAttribute('disabled');

        }else{
            bt_proximo.setAttribute('disabled', '');
        }
    }

    function inserir_arte_marcial() {

        let nome_arte_marcial = sl_artes_marciais.options[sl_artes_marciais.selectedIndex].text;
        let idArteMarcial = sl_artes_marciais.value;

        if(idArteMarcial == ""){
            alert("Por favor selecione uma luta");
            return;
        }
        
        const esta_na_lista = (lista_artes_marciais.find(element => element.nome == nome_arte_marcial));
        if(!esta_na_lista){

            var arte_marcial = {
                id: idArteMarcial,
                nome: nome_arte_marcial
            };

            lista_artes_marciais.push(arte_marcial);
            sl_artes_marciais.value = "";

            enable_button(true);
            mostar_arte_marcial();
            
        }else{
            alert("A arte marcial selecionada já esta na lista");
        }

    }

    function limpar_lista() {
        lista_artes_marciais = [];
        localStorage.arr_arte_marcial = JSON.stringify(lista_artes_marciais);

        tb.innerHTML = ``;

        sl_artes_marciais.value = "";

        enable_button(false);
    }

    function chamar_form(){
        div_artes_marciais.classList.toggle("form-hide");
        div_calc.classList.toggle("hide");
        div_calc.classList.toggle("form-show");
    }

    function cadastrar_arte_marcial(peso, altura){
        fetch("/arteMarcial/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                idServer: lista_artes_marciais,
                pesoServer: peso,
                alturaServer: altura,
                emailServer: sessionStorage.EMAIL_USUARIO,
                senhaServer: sessionStorage.SENHA_USUARIO
            })
        }).then(function (resposta) {
    
            console.log("resposta: ", resposta);
    
            if (resposta.ok) {
    
                console.log("ARTES MARCIAIS CADASTRADAS");
    
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            //finalizarAguardar();
        });
    
        return false;
    }


    var mensagem_na_tela = false;

    function descobrir_categoria() {
        var altura = Number(input_altura.value);
        var peso = Number(input_peso.value);
        var categoria = '';
        var id = 0;
        var abaixo = "<p>Você está abaixo da média de altura para a categoria</p>";
        var na_media = "<p>Você está na média de altura para a categoria</p>";
        var a_cima_media = "<p>Você está a cima da média de altura para a categoria</p>"
        const resultado = document.querySelector("#div_resultado");

        resultado.innerHTML = `<p id="p_categoria">Você daria um belo peso </p>`;

        if (peso >= 56.7 && peso < 61.2) {
            categoria = 'mosca';
            id = 1;
            if (altura < 1.65) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.65) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else if (peso < 65.7) {
            categoria = 'galo';
            id = 2;
            if (altura < 1.69) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.69) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else if (peso < 70.3) {
            categoria = 'pena';
            id = 3;
            if (altura < 1.73) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.73) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else if (peso < 77.1) {
            categoria = 'leve';
            id = 4;
            if (altura < 1.76) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.76) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else if (peso < 83.9) {
            categoria = 'meio-médio';
            id = 5;
            if (altura < 1.80) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.80) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else if (peso < 92.9) {
            categoria = 'médio';
            id = 6;
            if (altura < 1.83) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.83) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else if (peso < 100) {
            categoria = 'meio-pesado';
            id = 7
            if (altura < 1.85) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.85) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        } else {
            categoria = 'pesado';
            id = 8;
            if (altura < 1.88) {
                resultado.innerHTML += abaixo;
            } else if (altura == 1.88) {
                resultado.innerHTML += na_media;
            } else {
                resultado.innerHTML += a_cima_media;
            }
        }

        p_categoria.innerHTML += categoria;

        if(!mensagem_na_tela){
            resultado.classList.toggle("hide");
            mensagem_na_tela = true;
        }

        cadastrar_arte_marcial(peso, altura);

        cadastrar_categoria(id);

        setTimeout(() => {
            window.location = "login.html"
        }, 3000);

    }

    function cadastrar_categoria(categoria){
        fetch("/usuarios/cadastrarCategoria", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                categoriaServer: categoria,
                emailServer: sessionStorage.EMAIL_USUARIO,
                senhaServer: sessionStorage.SENHA_USUARIO
            })
        }).then(function (resposta) {
    
            console.log("resposta: ", resposta);
    
            if (resposta.ok) {
    
                console.log("categoria CADASTRADA");
    
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            //finalizarAguardar();
        });
    
        return false;
    }