function contra(pass) {
    if (pass.length < 6 || pass.length > 12) {
      alert('La contraseña debe tener entre 6 y 12 caracteres');
      return false;
    } else {
      return true;
    }
  }
var ruta = 'http://127.0.0.1:5000';
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validar email y contraseña
    if (!validarEmail(email)) {
        alert('Por favor, introduce un email válido.');
        return;
    }

    console.log(email, password);

    if(contra(password)){
      fetch(ruta + '/valiDato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email: email, contra: password})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inicio de sesión exitoso');
                console.log(data.rol)
                if(data.rol==='usuario'){
                    
                    window.location.href = '../html/pag-Usuario.html';
                }else{

                    window.location.href = '../html/pag-Admin.html';
                }
                let NombreCompleto={
                    name: data.nombre,
                    lastName: data.apellido,
                    correo: data.email,
                    tipousu: data.rol
                }
                localStorage.setItem('Nombre',JSON.stringify(NombreCompleto))
            } else {
                alert('Error en el inicio de sesión: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con el inicio de sesión.');
        });
    }
});

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarPassword(password) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}
