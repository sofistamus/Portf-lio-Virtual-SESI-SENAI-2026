async function fazerLogin() {

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    const mensagem = document.getElementById("mensagem");

    if (usuario === "" || senha === "") {

        mensagem.innerText = "Preencha todos os campos.";

        return;
    }

    try {

        const resposta = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuario: usuario,
                senha: senha
            })

        });

        const dados = await resposta.json();

        if (dados.sucesso) {

            mensagem.innerText = "Login realizado!";

            window.location.href = "folio.html";

        } else {

            mensagem.innerText = dados.mensagem;

        }

    } catch (erro) {

        console.log(erro);

        mensagem.innerText = "Erro ao conectar com o servidor.";

    }

}