var title = document.querySelector("title");

console.log("Contenido del título:", title);

let coincidencias = '';

let texto = "-----\n";
let dls = document.querySelectorAll('dl');
let historial = [];
coincidencias = '';
for (let i = 0; i < dls.length; i++) {
    texto = texto + 'Integrante ' + (i + 1) + ': "'
    let dds = dls[i].querySelectorAll('dd');
    let nombres = [];
    for (let nombre of dds) {
        if (nombre.textContent.trim() != '') {
            texto = texto + nombre.textContent + ' ';
            if (historial.includes(nombre.textContent)) {
                coincidencias = nombre.textContent;
            }
            historial.push(nombre.textContent);
        }
    }
    texto = texto.trim() + '"\n';
}
texto = texto + "-----";
console.log(texto);

if (coincidencias != '') {
    console.log('Se encontraron coincidencias');
    let col = prompt('Se encontraron coincidencias, ingrese un color');
    let dls = document.querySelectorAll('dl');
    for (let i = 0; i < dls.length; i++) {
        let dds = dls[i].querySelectorAll('dd');
        for (let nombre of dds) {
            if (nombre.textContent.trim() == coincidencias) {
                nombre.style.color = col;
            }
        }
    }
}