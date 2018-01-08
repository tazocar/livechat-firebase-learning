$(document).ready(function(){
  Materialize.updateTextFields();
  showMessages();
});
var config = {
    apiKey: "AIzaSyAEAYydBJrzOfIKRInDZrARU_Vy5A93JFI",
    authDomain: "live-chat-acc32.firebaseapp.com",
    databaseURL: "https://live-chat-acc32.firebaseio.com",
    projectId: "live-chat-acc32",
    storageBucket: "live-chat-acc32.appspot.com",
    messagingSenderId: "332577052053"
  };
firebase.initializeApp(config);
//Variables
//referencia a firebase > database > live-chatDB > hijo 'messages' de live-chat
var refMes = firebase.database().ref().child("messages");
var showHere = $("#showHere");

var showMessages = function(){
  //por cada cambio, ejecuta la funcion con el contenido de la BD
  refMes.on("value", function(snap){
    var everyMessage = "";
    datos = snap.val();
    for(var key in datos){
      everyMessage += "<div id='" + [key] + "'><h5>" + datos[key].nombre + ": </h5><p>" 
      + datos[key].mensaje + "<i class='material-icons right delete'>delete</i></p></div>" ;
    };
    showHere.html(everyMessage);
    $(".delete").click(function(){
      //llamo el ID a eliminar según el ID asignado al div
      var messageId = $(this).parent().parent().attr("id");
      //remuevo child con ese ID
      refMes.child(messageId).remove();
    });
  })
}

$("#formulario").submit(function(event){
  //prevenir que la pagina vuelva a cargarse cada vez que envías el formulario
  event.preventDefault();
  if ($("#message").val().length > 0 && $("#name").val().length > 0) {
    refMes.push({
      mensaje: $("#message").val(),
      nombre: $("#name").val(),
    })
    $("#message").val("");
  } else if ($("#message").val().length > 0 && $("#name").val().length < 1) {
    refMes.push({
      mensaje: $("#message").val(),
      nombre: "Anónimo",
    })
  } else {
    alert("Por favor ingrese un mensaje válido");
  }
});

