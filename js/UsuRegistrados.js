document.addEventListener('DOMContentLoaded', (event) => {

    var ruta = 'http://127.0.0.1:5000';
    const userTableBody = document.getElementById('user-table-body');
    
    function mostrar() {
        fetch(ruta + '/getAll')
            .then(response => response.json())
            .then(data => {
                if (data && data.Usuarios) {
                    userTableBody.innerHTML = '';
                    data.Usuarios.forEach(usuario => {

                        const fila = `
                            <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.apellido}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.contraseña}</td>
                                <td>${usuario.rol}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm btn-editar" data-bs-toggle="modal" data-bs-target="#editarUsuario" onclick="getUserById(${usuario.id})">Editar</button>
                                </td>
                            </tr>
                        `;
                        
                        userTableBody.innerHTML += fila;
                    });
                } else {
                    console.error('Error al obtener usuarios desde el servidor');
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    }
    mostrar();
});
