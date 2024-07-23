document.addEventListener('DOMContentLoaded', function() {
    const profileImageUpload = document.getElementById('profileImageUpload');
    const profileImage = document.getElementById('profileImage');
    const editProfileForm = document.getElementById('editProfileForm');

    profileImageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const bio = document.getElementById('bio').value;

        console.log('Nombre de Usuario:', username);
        console.log('Correo Electrónico:', email);
        console.log('Número de Teléfono:', phone);
        console.log('Biografía:', bio);

        alert('Cambios guardados correctamente.');
    });
});
