const form = document.querySelector('form');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const tbody = document.querySelector('tbody');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = searchInput.value.toLowerCase();
  const rows = Array.from(tbody.querySelectorAll('tr'));

  //hide rows that don't match the search query
  rows.forEach(function (row) {
    const name = row.cells[1].textContent.toLowerCase();
    row.hidden = !name.includes(query);
  });

  //sort visible rows by athlete name
  const visible = rows.filter(function (r) { return !r.hidden; });
  visible.sort(function (a, b) {
    const nameA = a.cells[1].textContent.trim();
    const nameB = b.cells[1].textContent.trim();
    return sortSelect.value === 'name-asc'
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
  visible.forEach(function (row) { tbody.appendChild(row); });
});
