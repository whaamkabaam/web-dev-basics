const buttons = document.querySelectorAll('.delete-btn');

buttons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    const id = e.currentTarget.dataset.id;
    await fetch('/tracker/' + id, { method: 'DELETE' });
  });
});
