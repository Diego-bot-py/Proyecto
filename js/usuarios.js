document.addEventListener('DOMContentLoaded', function() {
    let usuario = document.getElementById("NombreUsuario");
    var nombreCompleto = JSON.parse(localStorage.getItem('Nombre'));
    usuario.innerHTML = nombreCompleto.name + " " + nombreCompleto.lastName
   
});


document.getElementById("cerrarSesion").addEventListener('click', (e) => {

    e.preventDefault();
    if(confirm("¿Desea cerrar sesion?")){

        console.log("cuenta cerrada");
        localStorage.removeItem("Nombre");  
        window.location.href = "../index.html";
    }
});

