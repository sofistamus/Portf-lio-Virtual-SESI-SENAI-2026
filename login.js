function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "sofia" && senha === "123456") {
        window.location.href = "folio.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}