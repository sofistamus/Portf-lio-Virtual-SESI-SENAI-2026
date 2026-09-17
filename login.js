function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (
        (usuario === "admin" && senha === "1234") ||
        (usuario === "prof" && senha === "321") ||
        (usuario === "sofia" && senha === "375")
    ) {
        window.location.href = "folio.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}