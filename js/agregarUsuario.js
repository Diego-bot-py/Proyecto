
var ruta = 'http://127.0.0.1:5000';

document.getElementById('add-user').addEventListener('submit', function (event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var contra = document.getElementById('contraseña').value;
    var rol = document.getElementById('rol').value;

    console.log(nombre, apellido, email, contra,rol)
    if (!validarEmail(email)) {
        alert('Hubo un error, el correo dede llevar "@" y un "."');
        return;
    }
    if (contra.length > 5 && contra.length < 16) {
            fetch(ruta + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, contra: contra, rol: rol})
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Se ha registrado de manera exitosa');
                        location.reload();
                    } else {
                        alert('Lo sentimos, esta cuenta ya se encuentra registrada ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Hubo un error en el registro');
                });

    } else {
        alert("La contraseña debe tener entre 6 y 15 caracteres");
    }

});

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}