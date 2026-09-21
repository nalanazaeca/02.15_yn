function renderHome(){
  const brandEl = document.querySelectorAll('[data-brand]');
  brandEl.forEach(el => el.textContent = SITE.name);

  const tagline = document.querySelector('[data-tagline]');
  if (tagline) tagline.textContent = SITE.tagline;

  const about = document.querySelector('[data-about]');
  if (about) about.textContent = SITE.about;

  const list = document.querySelector('[data-stories]');
  if (!list) return;

  if (!STORIES.length){
    list.innerHTML = '<p class="empty-note">Belum ada cerita. Tambahkan di js/data.js.</p>';
    return;
  }

  list.innerHTML = STORIES.map(story => {
    const rows = story.chapters.map((ch, i) => `
      <a class="chapter-row" href="chapter.html?story=${story.slug}&ch=${ch.id}">
        <span class="ch-num">${ch.label}</span>
        <span class="ch-title">${ch.title}</span>
        <span class="ch-date">${ch.date || ''}</span>
      </a>
    `).join('');

    return `
      <div class="story">
        <h3 class="story-title">${story.title}</h3>
        <p class="story-desc">${story.description || ''}</p>
        <div class="chapter-list">${rows || '<p class="empty-note">Belum ada bab.</p>'}</div>
      </div>
    `;
  }).join('');
}

function renderChapter(){
  const params = new URLSearchParams(window.location.search);
  const storySlug = params.get('story');
  const chId = params.get('ch');

  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = SITE.name);

  const story = STORIES.find(s => s.slug === storySlug);
  const container = document.querySelector('[data-chapter]');
  if (!container) return;

  if (!story){
    container.innerHTML = '<p class="empty-note">Cerita tidak ditemukan.</p>';
    return;
  }

  const idx = story.chapters.findIndex(c => c.id === chId);
  const chapter = story.chapters[idx];

  if (!chapter){
    container.innerHTML = '<p class="empty-note">Bab tidak ditemukan.</p>';
    return;
  }

  document.title = `${chapter.title} — ${story.title} — ${SITE.name}`;

  document.querySelector('[data-story-title]').textContent = story.title;
  document.querySelector('[data-story-title]').href = 'index.html#' + story.slug;
  document.querySelector('[data-chapter-title]').textContent = chapter.title;
  document.querySelector('[data-chapter-date]').textContent = chapter.date || '';

  const paragraphs = chapter.content.trim().split(/\n\s*\n/);
  container.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');

  const prev = story.chapters[idx - 1];
  const next = story.chapters[idx + 1];

  const prevEl = document.querySelector('[data-prev]');
  const nextEl = document.querySelector('[data-next]');

  if (prev){
    prevEl.href = `chapter.html?story=${story.slug}&ch=${prev.id}`;
    prevEl.innerHTML = `<span class="dir">Sebelumnya</span>${prev.title}`;
    prevEl.style.visibility = 'visible';
  } else {
    prevEl.style.visibility = 'hidden';
  }

  if (next){
    nextEl.href = `chapter.html?story=${story.slug}&ch=${next.id}`;
    nextEl.innerHTML = `<span class="dir">Berikutnya</span>${next.title}`;
    nextEl.style.visibility = 'visible';
  } else {
    nextEl.style.visibility = 'hidden';
  }
}
