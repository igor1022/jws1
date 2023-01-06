let form = document.getElementById('form');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const sendForm = new FormData(form);
    const result = await axios.post('getLogin', sendForm);
    if (result.data === 'ok') {
        window.location.href = '/';
        return;
    }
    document.getElementById('error').innerHTML = '<h3>Неправильный логин или пароль</h3>';
})