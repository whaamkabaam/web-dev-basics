const buttons = document.querySelectorAll('.delete-btn');

buttons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    if (!confirm('Delete this block?')) return;
    const id = e.currentTarget.dataset.id;
    await fetch('/tracker/' + id, { method: 'DELETE' });
  });
});
