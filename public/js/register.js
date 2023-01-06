let form = document.getElementById('form');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const sendForm = new FormData(form);
    const result = await axios.post('sendregister', sendForm);
    if (result.data === 'ok') {
        window.location.href = '/';
        return;
    }
})