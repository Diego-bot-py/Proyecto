
var ruta = 'http://127.0.0.1:5000';

document.getElementById('registro').addEventListener('submit', function (event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var contra1 = document.getElementById('password').value;
    var contra2 = document.getElementById('password1').value;


    console.log(nombre, apellido, email, contra1)
    if (!validarEmail(email)) {
        alert('Hubo un error, el correo dede llevar "@" y un "."');
        return;
    }
    if (contra1.length > 5 && contra1.length < 16) {
        console.log(contra1.length)
        if (contra1 == contra2) {
            fetch(ruta + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, contra: contra1, rol:"usuario"})
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Se ha registrado de manera exitosa');
                    } else {
                        alert('Lo sentimos, esta cuenta ya se encuentra registrada ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Hubo un error en el registro');
                });
        }

    } else {
        alert("La contraseña debe tener entre 6 y 15 caracteres");
    }

});

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}