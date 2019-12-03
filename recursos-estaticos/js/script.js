/*document.querySelector('#user')*/

var respuestas={
    user: 'user',
    email:'user@SpeechGrammarList.com',
    pass:'admin',
    passBiss:'admin'
}

function validar(evento) {
    var input = evento.target
    var valor = input.value
    var respuesta = respuestas[input.id]
    if(valor === respuesta){
       var indicador = document.querySelector('label[for="' + input.id + '"].indicador')
        indicador.style.background = 'url(../img/radio - check.png)',
        indicador.style.background = backgroundSize = 'cover'// se suman asi los estilos??
       }
    }



///////////////////////////////////////////// 

document.body.addEventListener("click", function (elemento) {
    alert(elemento.target)
});

/////////////////////////////////////////////




