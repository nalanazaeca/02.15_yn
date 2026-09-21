// Working copy: starts from data.js, then any local edits persist in localStorage
// until the writer downloads a new data.js and re-uploads it (the new file becomes
// the new baseline the next time this page loads fresh, since we bundle it via script tag).

let draft = loadDraft();

function loadDraft(){
  const saved = localStorage.getItem('site_draft');
  if (saved){
    try { return JSON.parse(saved); } catch(e) { /* fall through */ }
  }
  return { SITE: structuredClone(SITE), STORIES: structuredClone(STORIES) };
}

function saveDraft(){
  localStorage.setItem('site_draft', JSON.stringify(draft));
}

function slugify(str){
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function init(){
  document.getElementById('siteTagline').value = draft.SITE.tagline || '';
  document.getElementById('siteAbout').value = draft.SITE.about || '';
  renderStorySelect();
  renderChapterPreview();
}

function renderStorySelect(){
  const sel = document.getElementById('storySelect');
  sel.innerHTML = draft.STORIES.map(s => `<option value="${s.slug}">${s.title}</option>`).join('')
    + `<option value="__new__">+ Cerita baru...</option>`;
  onStorySelectChange();
}

function onStorySelectChange(){
  const sel = document.getElementById('storySelect');
  const newFields = document.getElementById('newStoryFields');
  newFields.style.display = sel.value === '__new__' ? 'block' : 'none';
  renderChapterPreview();
}

function currentStory(){
  const sel = document.getElementById('storySelect');
  if (sel.value === '__new__') return null;
  return draft.STORIES.find(s => s.slug === sel.value);
}

function renderChapterPreview(){
  const container = document.getElementById('chapterPreview');
  const story = currentStory();
  if (!story){
    container.innerHTML = '<p class="note">Cerita baru — belum ada bab.</p>';
    return;
  }
  if (!story.chapters.length){
    container.innerHTML = '<p class="note">Belum ada bab di cerita ini.</p>';
    return;
  }
  container.innerHTML = story.chapters.map((ch, i) => `
    <div class="preview-item">
      <span>${ch.label} — ${ch.title}</span>
      <button onclick="deleteChapter('${story.slug}', ${i})">hapus</button>
    </div>
  `).join('');
}

function deleteChapter(storySlug, index){
  const story = draft.STORIES.find(s => s.slug === storySlug);
  if (!story) return;
  if (!confirm(`Hapus bab "${story.chapters[index].title}"?`)) return;
  story.chapters.splice(index, 1);
  saveDraft();
  renderChapterPreview();
}

function saveSiteInfo(){
  draft.SITE.tagline = document.getElementById('siteTagline').value;
  draft.SITE.about = document.getElementById('siteAbout').value;
  saveDraft();
  flashStatus('addStatus', 'Info profil tersimpan.');
}

function addChapter(){
  const label = document.getElementById('chLabel').value.trim();
  const title = document.getElementById('chTitle').value.trim();
  const date = document.getElementById('chDate').value.trim();
  const content = document.getElementById('chContent').value.trim();

  if (!label || !title || !content){
    flashStatus('addStatus', 'Isi label, judul, dan isi cerita dulu ya.');
    return;
  }

  let story = currentStory();
  const sel = document.getElementById('storySelect');

  if (sel.value === '__new__'){
    const newTitle = document.getElementById('newStoryTitle').value.trim();
    const newDesc = document.getElementById('newStoryDesc').value.trim();
    if (!newTitle){
      flashStatus('addStatus', 'Isi judul cerita baru dulu ya.');
      return;
    }
    story = {
      slug: slugify(newTitle) || ('cerita-' + Date.now()),
      title: newTitle,
      description: newDesc,
      chapters: []
    };
    draft.STORIES.push(story);
  }

  const id = slugify(label) || ('bab-' + Date.now());
  story.chapters.push({ id, label, title, date, content });

  saveDraft();
  renderStorySelect();

  // keep the same story selected after re-render
  document.getElementById('storySelect').value = story.slug;
  onStorySelectChange();

  document.getElementById('chLabel').value = '';
  document.getElementById('chTitle').value = '';
  document.getElementById('chDate').value = '';
  document.getElementById('chContent').value = '';

  flashStatus('addStatus', `Bab "${title}" ditambahkan. Jangan lupa unduh data.js kalau sudah selesai.`);
}

function flashStatus(elId, msg){
  const el = document.getElementById(elId);
  el.textContent = msg;
  setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 4000);
}

function downloadData(){
  const fileContent =
`const SITE = ${JSON.stringify(draft.SITE, null, 2)};

const STORIES = ${JSON.stringify(draft.STORIES, null, 2)};
`;
  const blob = new Blob([fileContent], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  a.click();
  URL.revokeObjectURL(url);
}

function resetDraft(){
  if (!confirm('Buang semua perubahan yang belum diunduh dan kembali ke versi data.js yang sedang dipakai?')) return;
  localStorage.removeItem('site_draft');
  draft = loadDraft();
  init();
}

init();
