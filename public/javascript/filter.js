document.addEventListener('DOMContentLoaded', function() {
  const filterInput = document.getElementById('filter-input');
  const buttons = document.querySelectorAll('.button-wrapper');

  const searchIndex = new JsSearch.Search('id');
  searchIndex.addIndex('title');

  searchIndex.addDocuments(
    window.searchData.map((title, id) => ({
      id,
      title
    }))
  );

  filterInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.trim();

    if (!searchTerm) {
      //show all
      buttons.forEach(button => (button.style.display = 'block'));
      return;
    }

    const results = searchIndex.search(searchTerm);

    buttons.forEach(button => {
      if (results.some(r => r.id === Number(button.dataset.index))) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
  });
});
