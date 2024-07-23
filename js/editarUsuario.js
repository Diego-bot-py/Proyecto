document.getElementById('edit-user').addEventListener('submit', function (event) {
    event.preventDefault(); 
    var ruta = 'http://127.0.0.1:5000';
    var user_id = document.getElementById('edit-user-id').value; 
    var nombre = document.getElementById('edit-nombre').value;
    var apellido = document.getElementById('edit-apellido').value;
    var email = document.getElementById('edit-email').value;
    var contraseña = document.getElementById('edit-contraseña').value;
    var rol = document.getElementById('edit-rol').value;

    var data = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contraseña: contraseña,
        rol: rol
    };

    var mos = new XMLHttpRequest();
    mos.open('PUT', ruta + '/editUser/' + user_id);
    mos.setRequestHeader('Content-Type', 'application/json');
    mos.onload = function () {
        if (mos.status === 200) {
            var response = JSON.parse(mos.responseText);
            if (response.success) {
                alert(response.message);
                
                document.getElementById('editarUsuario').classList.remove('show');
                document.body.classList.remove('modal-open');
                document.getElementsByClassName('modal-backdrop')[0].remove();
                location.reload();
            } else {
                alert('Error: ' + response.message);
            }
        } else {
            alert('Error al conectar con el servidor');
            console.error(mos.statusText);
        }
    };
    mos.onerror = function () {
        alert('Error al conectar con el servidor');
        console.error(mos.statusText);
    };
    mos.send(JSON.stringify(data));
});
