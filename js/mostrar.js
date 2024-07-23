function getUserById(usuarioid) {
    var ruta = 'http://127.0.0.1:5000';
    fetch(ruta + '/getAll/' + usuarioid, {
        method: 'GET',
        credentials: 'include' 
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            var usu_id = document.getElementById('edit-user-id');
            var nombre = document.getElementById('edit-nombre');
            var apellido = document.getElementById('edit-apellido');
            var email = document.getElementById('edit-email');
            var contraseña = document.getElementById('edit-contraseña');
            var rol = document.getElementById('edit-rol');

            usu_id.value = data[0].id;
            nombre.value = data[0].nombre;
            apellido.value = data[0].apellido;
            email.value = data[0].email;
            contraseña.value = data[0].contraseña;
            rol.value = data[0].rol;
        } else {
            console.error('Error al obtener usuarios desde el servidor');
        }
    })
    .catch(error => {
        console.error('Error', error);
    });
}