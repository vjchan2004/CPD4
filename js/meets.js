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
    const name = row.cells[0].textContent.toLowerCase();
    row.hidden = !name.includes(query);
  });

  //sort visible rows by name or date
  const visible = rows.filter(function (r) { return !r.hidden; });
  const sortValue = sortSelect.value;
  visible.sort(function (a, b) {
    if (sortValue === 'name-asc' || sortValue === 'name-desc') {
      const nameA = a.cells[0].textContent.trim();
      const nameB = b.cells[0].textContent.trim();
      return sortValue === 'name-asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else {
      //datetime attribute is YYYY-MM-DD so string comparison gives correct date order
      const dateA = a.querySelector('time').getAttribute('datetime');
      const dateB = b.querySelector('time').getAttribute('datetime');
      return sortValue === 'date-asc'
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    }
  });
  visible.forEach(function (row) { tbody.appendChild(row); });
});
