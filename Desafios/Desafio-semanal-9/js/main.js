const button = document.getElementById("button");

function ocultarPersonajes() {
    document.querySelectorAll("#cajas>div").forEach((div) => {
        div.title = "";
    });
}

function presentarPersonaje() {

    const nombre = prompt("¿Quién se presenta hoy? (Mario, Luigi, Bowser, Peach, Yoshi, Toad, Toadette, Daisy)");
    console.log(nombre);

    const personajes = {
        Mario: "Mario",
        Luigi: "Luigi",
        Bowser: "Bowser Morton Koopa",
        Peach: "Princesa Peach Toadstool",
        Yoshi: "T. Yoshisaur Munchakoopas",
        Toad: "Toad",
        Toadette: "Toadette",
        Daisy: "Princesa Daisy",
    };

    let nombreSpan = document.querySelector("h1 span");

    if (personajes.hasOwnProperty(nombre)) {
        nombreSpan.innerHTML = personajes[nombre];
        let personaje = document.getElementById(nombre.toLowerCase());
        if (personaje) {
            ocultarPersonajes();
            personaje.title = "Presentado";
        }
    } else {
        nombreSpan.innerHTML = "(desconocido)";
    }

    //button.style.display = "none";
}
button.addEventListener("click", presentarPersonaje);
document.querySelectorAll("#cajas>div").forEach((div) => {
    div.onclick = function(){
        ocultarPersonajes();
        this.title = "Presentado";
    };
});