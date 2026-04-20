const API_BASE = '/api';

function loadRatings() {
  const jobNumber = document.getElementById('jobNumberInput').value.trim();

  if (!jobNumber) {
    alert('Bitte gib eine Jobnummer ein');
    return;
  }

  document.getElementById('currentJobNumber').textContent = jobNumber;
  document.getElementById('ratingsSection').style.display = 'block';
  document.getElementById('noJobSelected').style.display = 'none';

  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = '<p class="loading">Lädt Kommentare...</p>';

  fetch(`${API_BASE}/ratings/${encodeURIComponent(jobNumber)}`)
    .then(res => res.json())
    .then(ratings => {
      if (ratings.length === 0) {
        commentsList.innerHTML = '<p class="loading">Noch keine Bewertungen für diese Jobnummer. Sei der erste, der einen Kommentar hinterlässt!</p>';
      } else {
        commentsList.innerHTML = ratings.map(rating => `
          <div class="comment-item">
            <div class="comment-header">
              <div class="comment-rating">${'★'.repeat(rating.rating)}${'☆'.repeat(5 - rating.rating)}</div>
              <div class="comment-date">${formatDate(rating.createdAt)}</div>
            </div>
            <div class="comment-text">${escapeHtml(rating.comment)}</div>
          </div>
        `).join('');
      }
    })
    .catch(err => {
      commentsList.innerHTML = '<p class="error-message">Fehler beim Laden der Kommentare</p>';
      console.error(err);
    });
}

function submitRating(event) {
  event.preventDefault();

  const jobNumber = document.getElementById('jobNumberInput').value.trim();
  const rating = document.querySelector('input[name="rating"]:checked').value;
  const comment = document.getElementById('comment').value.trim();

  if (!jobNumber || !rating || !comment) {
    alert('Bitte alle Felder ausfüllen');
    return;
  }

  const submitBtn = event.target.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Wird abgesendet...';

  fetch(`${API_BASE}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobNumber,
      rating: parseInt(rating),
      comment
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Fehler beim Absenden');
      return res.json();
    })
    .then(() => {
      event.target.reset();
      document.querySelector('input[name="rating"]').checked = false;
      loadRatings();
      showSuccessMessage();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Bewertung abschicken';
    })
    .catch(err => {
      alert('Fehler beim Absenden der Bewertung');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Bewertung abschicken';
      console.error(err);
    });
}

function showSuccessMessage() {
  const form = document.querySelector('.add-rating');
  const message = document.createElement('div');
  message.className = 'success-message';
  message.textContent = '✓ Bewertung erfolgreich hinzugefügt!';
  form.insertBefore(message, form.firstChild);
  setTimeout(() => message.remove(), 3000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'gerade eben';
  if (minutes < 60) return `vor ${minutes}m`;
  if (hours < 24) return `vor ${hours}h`;
  if (days < 7) return `vor ${days}d`;

  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.getElementById('jobNumberInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') loadRatings();
});
