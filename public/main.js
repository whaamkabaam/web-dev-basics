const buttons = document.querySelectorAll('.delete-btn');

buttons.forEach((button) => {
  button.addEventListener('click', async () => {
    if (!confirm('Delete this block?')) return;
    // e.currentTarget is null after the await so use button instead
    const row = button.closest('tr');
    const res = await fetch('/tracker/' + button.dataset.id, { method: 'DELETE' });
    if (res.ok) {
      row.remove();
    } else {
      alert('Could not delete the block, try again');
    }
  });
});
