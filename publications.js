(function () {
  var list = document.getElementById('publications-list');

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPublication(pub) {
    var authors = pub.authors.join(', ');
    var linkHtml = pub.link
      ? '<a href="' + escapeHtml(pub.link.url) + '">' + escapeHtml(pub.link.label) + '</a>'
      : '';

    return (
      '<div class="publication">' +
        '<p>' +
          '<strong>' + escapeHtml(pub.title) + '</strong><br>' +
          escapeHtml(authors) + '<br>' +
          '<em>' + escapeHtml(pub.venue) + '</em><br>' +
          linkHtml +
        '</p>' +
      '</div>'
    );
  }

  function render(publications) {
    var html = '';
    var currentYear = null;

    publications.forEach(function (pub) {
      if (pub.year !== currentYear) {
        currentYear = pub.year;
        html += '<span class="pub-year">' + escapeHtml(currentYear) + '</span>';
      }
      html += renderPublication(pub);
    });

    list.innerHTML = html;
  }

  fetch('publications.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Failed to load publications.json: ' + response.status);
      }
      return response.json();
    })
    .then(render)
    .catch(function (err) {
      list.textContent = 'Could not load publications.';
      console.error(err);
    });
})();
