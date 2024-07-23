document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('new-post-form');
    const postList = document.getElementById('post-list');
    const postContentTextarea = document.getElementById('post-content');

    postContentTextarea.addEventListener('input', () => {
        postContentTextarea.style.height = 'auto';
        postContentTextarea.style.height = postContentTextarea.scrollHeight + 'px';
    });

    // Función para crear una publicación
    const createPost = async (title, content) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/publicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                throw new Error('Error al crear la publicación');
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Error al crear la publicación: ' + error.message);
        }
    };

    // Función para obtener todas las publicaciones
    const getPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/ver_publicaciones');
            if (!response.ok) {
                throw new Error('Error al obtener publicaciones');
            }

            const data = await response.json();
            return data.posts;
        } catch (error) {
            console.error(error);
            alert('Error al obtener publicaciones: ' + error.message);
        }
    };

    // Manejar el envío del formulario de nueva publicación
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = postContentTextarea.value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Título y contenido no pueden estar vacíos.');
            return;
        }

        await createPost(title, content);

        const postElement = document.createElement('div');
        postElement.className = 'card mb-3';
        postElement.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">${title}</h5>
                <button type="button" class="btn btn-danger btn-sm delete-post">Eliminar</button>
                <button type="button" class="btn btn-warning btn-sm ms-2 edit-post">Editar</button>
                <button type="button" class="btn btn-success btn-sm ms-2 mark-important">Destacar</button>
            </div>
            <div class="card-body">
                <p class="card-text">${content}</p>
                <div class="reply-form">
                    <form class="new-reply-form">
                        <div class="mb-3">
                            <label for="reply-content" class="form-label">Responder:</label>
                            <textarea class="form-control" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-secondary">Responder</button>
                    </form>
                </div>
                <div class="replies mt-3">
                    <!-- Aquí se agregarán las respuestas -->
                </div>
            </div>
        `;
        postList.appendChild(postElement);

        postForm.reset();
        postContentTextarea.style.height = 'auto';
        alert('Publicación creada con éxito!');
    });

    // Manejar el envío del formulario de respuestas
    postList.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (event.target.classList.contains('new-reply-form')) {
            const replyContent = event.target.querySelector('textarea').value;
            const repliesContainer = event.target.closest('.card-body').querySelector('.replies');

            if (replyContent.trim() === '') {
                alert('El contenido de la respuesta no puede estar vacío.');
                return;
            }

            const replyElement = document.createElement('div');
            replyElement.className = 'card mb-2';
            replyElement.innerHTML = `
                <div class="card-body">
                    <p class="card-text">${replyContent}</p>
                    <button type="button" class="btn btn-danger btn-sm delete-reply">Eliminar</button>
                    <button type="button" class="btn btn-warning btn-sm ms-2 edit-reply">Editar</button>
                </div>
            `;
            repliesContainer.appendChild(replyElement);
            event.target.reset();
            alert('Respuesta añadida con éxito!');
        }
    });

    // Manejar clics en los botones de eliminar, editar y destacar
    postList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-post')) {
            const postElement = event.target.closest('.card');
            postElement.remove();
        } else if (event.target.classList.contains('delete-reply')) {
            const replyElement = event.target.closest('.card');
            replyElement.remove();
        } else if (event.target.classList.contains('edit-post')) {
            const postElement = event.target.closest('.card');
            const title = postElement.querySelector('.card-title').textContent;
            const content = postElement.querySelector('.card-text').textContent;

            const newTitle = prompt('Edita el título:', title);
            const newContent = prompt('Edita el contenido:', content);

            if (newTitle && newContent) {
                postElement.querySelector('.card-title').textContent = newTitle;
                postElement.querySelector('.card-text').textContent = newContent;
            }
        } else if (event.target.classList.contains('edit-reply')) {
            const replyElement = event.target.closest('.card');
            const content = replyElement.querySelector('.card-text').textContent;

            const newContent = prompt('Edita el contenido de la respuesta:', content);

            if (newContent) {
                replyElement.querySelector('.card-text').textContent = newContent;
            }
        } else if (event.target.classList.contains('mark-important')) {
            const postElement = event.target.closest('.card');
            postElement.classList.toggle('border border-warning');
        }
    });

    // Cargar las publicaciones al iniciar
    (async () => {
        const posts = await getPosts();
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'card mb-3';
            postElement.innerHTML = `
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">${post.title}</h5>
                    <button type="button" class="btn btn-danger btn-sm delete-post">Eliminar</button>
                    <button type="button" class="btn btn-warning btn-sm ms-2 edit-post">Editar</button>
                    <button type="button" class="btn btn-success btn-sm ms-2 mark-important">Destacar</button>
                </div>
                <div class="card-body">
                    <p class="card-text">${post.content}</p>
                    <div class="reply-form">
                        <form class="new-reply-form">
                            <div class="mb-3">
                                <label for="reply-content" class="form-label">Responder:</label>
                                <textarea class="form-control" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-secondary">Responder</button>
                        </form>
                    </div>
                    <div class="replies mt-3">
                        <!-- Aquí se agregarán las respuestas -->
                    </div>
                </div>
            `;
            postList.appendChild(postElement);
        });
    })();
});
