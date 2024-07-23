
document.addEventListener('DOMContentLoaded', function () {
    const datosUsuario = JSON.parse(localStorage.getItem('Nombre'));
    console.log(datosUsuario);

    if (datosUsuario.tipousu === 'administrador') {
        const botonUsuario = document.getElementById('tipoUsuarios');
        botonUsuario.style.display = 'block';
    }

    if(datosUsuario.tipousu === 'usuario'){
        const botonPerfil = document.getElementById('perfil');
        botonPerfil.style.display = 'block';
    }
});


const redirigir = () =>{
    const datosUsuario = JSON.parse(localStorage.getItem('Nombre'));
    console.log(datosUsuario);

    if (datosUsuario.tipousu === 'administrador'){
        window.location.href = 'pag-Admin.html'
    }else{
        window.location.href = 'pag-Usuario.html'
    }
}
function login(){
    const Nombre=JSON.parse(localStorage.getItem('Nombre'));
    if(!Nombre){
        setTimeout(function(){
            window.location.href='../index.html';
        },1000);
    }else{
        return true
    }
}