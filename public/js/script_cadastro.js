function cadastrar(nome, email, senha) {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            alert("Cadastro realizado com sucesso! Redirecionando para tela de login...");
                sessionStorage.EMAIL_USUARIO = email;
                sessionStorage.SENHA_USUARIO = senha;
            setTimeout(() => {
              window.location.href = "calculadora_categoria.html";
            }, "2000")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        //finalizarAguardar();
    });

    return false;
}