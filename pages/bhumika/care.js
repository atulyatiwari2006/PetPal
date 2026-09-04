/* =========================================================
   PET PAL — DAILY CARE
   Clean rewrite of the same logic, same features, same UI.
   Organized so each concept is easy to point to and explain.
   ========================================================= */

/* ---------- 1. CONSTANTS ---------- */
const STORAGE_KEY = 'petpal_care_state_v1';
const TODAY = new Date().toISOString().slice(0, 10);
const RING_RADIUS = 62;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/* Which checklist item should also flip when a meal/groom item
   is toggled from its own card. One place to edit the mapping. */
const CHECKLIST_LINKS = {
  meals: { breakfast: 'c-breakfast', lunch: 'c-lunch', dinner: 'c-dinner' },
  groom: { brush: 'c-brush' },
};

/* ---------- 2. STATE ---------- */
function defaultState() {
  return {
    date: TODAY,
    meals: { breakfast: false, lunch: false, dinner: false },
    qty: { breakfast: 1, lunch: 1, dinner: 1.5 },
    groom: { brush: false, teeth: false, ears: false, nails: false },
    checklist: {
      'c-breakfast': false, 'c-walk': false, 'c-brush': false,
      'c-lunch': false, 'c-water': false, 'c-dinner': false,
    },
    walks: { count: 0, distanceKm: 0, lastWalkText: '—' },
    walkRunning: false,
    walkStartedAt: null,
    streak: 4,
    weekHits: [true, true, false, true, true, false, false],
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();

  const saved = JSON.parse(raw);
  if (saved.date === TODAY) return saved; // same day → resume as-is

  // new day → fresh tasks, but keep streak history
  return { ...defaultState(), streak: saved.streak, weekHits: saved.weekHits };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

/* ---------- 3. SMALL HELPERS ---------- */
const $ = (id) => document.getElementById(id);
const countTrue = (obj) => Object.values(obj).filter(Boolean).length;
const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

function formatClock(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

let toastTimer;
function showToast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

/* ---------- 4. GENERIC TOGGLE (used by meals, grooming, checklist) ----------
   Every "click a card, flip a boolean, keep things in sync" action
   follows the same shape, so it's written once and reused.       */
function toggleTask(group, key, { linkTo, onDone } = {}) {
  state[group][key] = !state[group][key];

  // keep the full checklist in sync when a meal/groom item changes
  if (linkTo) state.checklist[linkTo] = state[group][key];

  if (state[group][key] && onDone) onDone();

  saveState();
  renderAll();
}

/* ---------- 5. MEALS ---------- */
function renderMeals() {
  document.querySelectorAll('.meal-item').forEach((el) => {
    const key = el.dataset.meal;
    el.classList.toggle('done', state.meals[key]);
    const unit = state.qty[key] === 1 ? 'cup' : 'cups';
    el.querySelector('.meal-qty').textContent = `${state.qty[key]} ${unit}`;
  });
  $('mealMeta').textContent = `${countTrue(state.meals)} of 3 meals logged`;
}

function stepQty(event, key, delta) {
  event.stopPropagation(); // don't also trigger the meal's own click toggle
  const next = state.qty[key] + delta * 0.5;
  state.qty[key] = Math.min(3, Math.max(0.5, next));
  saveState();
  renderMeals();
}

document.querySelectorAll('.meal-item').forEach((el) => {
  el.addEventListener('click', (event) => {
    if (event.target.closest('.qty-stepper')) return; // +/- buttons handle themselves
    const key = el.dataset.meal;
    toggleTask('meals', key, {
      linkTo: CHECKLIST_LINKS.meals[key],
      onDone: () => showToast(`${capitalize(key)} logged 🍖`),
    });
  });
});

/* ---------- 6. GROOMING ---------- */
function renderGroom() {
  document.querySelectorAll('.groom-item').forEach((el) => {
    el.classList.toggle('done', state.groom[el.dataset.groom]);
  });
  $('groomMeta').textContent = `${countTrue(state.groom)} of 4 done`;
}

document.querySelectorAll('.groom-item').forEach((el) => {
  el.addEventListener('click', () => {
    const key = el.dataset.groom;
    toggleTask('groom', key, {
      linkTo: CHECKLIST_LINKS.groom[key],
      onDone: () => showToast(`${el.querySelector('span').textContent} ✓`),
    });
  });
});

/* ---------- 7. FULL CHECKLIST ---------- */
function renderChecklist() {
  document.querySelectorAll('.check-row').forEach((el) => {
    el.classList.toggle('done', state.checklist[el.dataset.key]);
  });
  const done = countTrue(state.checklist);
  const total = Object.keys(state.checklist).length;
  $('checklistMeta').textContent = `${done} / ${total}`;
  return { done, total };
}

// clicking a checklist row also has to write back to the meal/groom card
const CHECKLIST_BACK_LINKS = {
  'c-breakfast': ['meals', 'breakfast'],
  'c-lunch': ['meals', 'lunch'],
  'c-dinner': ['meals', 'dinner'],
  'c-brush': ['groom', 'brush'],
};

document.querySelectorAll('.check-row').forEach((el) => {
  el.addEventListener('click', () => {
    const key = el.dataset.key;
    state.checklist[key] = !state.checklist[key];

    const back = CHECKLIST_BACK_LINKS[key];
    if (back) {
      const [group, subKey] = back;
      state[group][subKey] = state.checklist[key];
    }
    saveState();
    renderAll();
  });
});

/* ---------- 8. PROGRESS RING + PAW TRAIL ----------
   Both are DERIVED from the checklist — neither has its own
   stored "color" or "percent"; they're recalculated every render. */
function renderProgress() {
  const { done, total } = renderChecklist();
  const percent = Math.round((done / total) * 100);

  // ring: reveal more of the circle's stroke as percent grows
  $('ringPct').textContent = `${percent}%`;
  $('ringFg').style.strokeDashoffset =
    RING_CIRCUMFERENCE - (percent / 100) * RING_CIRCUMFERENCE;

  $('trailPct').textContent = `${percent}%`;

  // paw trail: rebuild every render; first `done` paws get .filled
  const row = $('pawRow');
  row.querySelectorAll('.paw').forEach((paw) => paw.remove());
  const denElement = row.querySelector('.paw-den');

  for (let i = 0; i < total; i++) {
    const paw = document.createElement('div');
    paw.className = i < done ? 'paw filled' : 'paw'; // <-- the color decision
    paw.innerHTML = `<svg viewBox="0 0 24 24">
      <path d="M12 21c-4-1-8-4.2-8-8.6C4 9 6.5 7 9 8c1 .4 1.6 1.2 3 1.2S13 8.4 14 8c2.5-1 5 1 5 4.4 0 4.4-4 7.6-8 8.6Z" fill="#2C4A3B"/>
    </svg>`;
    row.insertBefore(paw, denElement);
  }

  $('encourageBox').innerHTML = done === total
    ? '<b>All done! 🎉</b> Every task is checked off for today — great care!'
    : `<b>Almost there.</b> ${total - done} task${total - done === 1 ? '' : 's'} left to finish today's care.`;
}

/* ---------- 9. WALK TIMER ---------- */
let walkInterval = null;

function renderWalk() {
  $('walkDist').textContent = state.walks.distanceKm.toFixed(1);
  $('walkCount').textContent = state.walks.count;
  $('lastWalk').textContent = state.walks.lastWalkText;
  $('walkMeta').textContent = state.walks.count > 0
    ? `${state.walks.count} walk${state.walks.count === 1 ? '' : 's'} logged today`
    : 'No walk logged yet';

  const btn = $('walkBtn');
  btn.textContent = state.walkRunning ? 'End walk' : 'Start walk';
  btn.classList.toggle('active', state.walkRunning);
}

function startWalkTimer() {
  clearInterval(walkInterval);
  walkInterval = setInterval(() => {
    $('walkClock').textContent = formatClock(Date.now() - state.walkStartedAt);
  }, 1000);
}

function toggleWalk() {
  if (!state.walkRunning) {
    state.walkRunning = true;
    state.walkStartedAt = Date.now();
    saveState();
    startWalkTimer();
    showToast('Walk started 🚶 — have fun!');
    renderWalk();
    return;
  }

  // ending the walk
  const elapsedMs = Date.now() - state.walkStartedAt;
  const estDistanceKm = +(elapsedMs / 60000 * 0.08).toFixed(1); // ~4.8 km/h pace

  state.walks.count += 1;
  state.walks.distanceKm = +(state.walks.distanceKm + estDistanceKm).toFixed(1);
  state.walks.lastWalkText = `${formatClock(elapsedMs)} · ~${estDistanceKm} km`;
  state.checklist['c-walk'] = true;
  state.walkRunning = false;
  state.walkStartedAt = null;

  clearInterval(walkInterval);
  $('walkClock').textContent = '00:00';
  saveState();
  renderAll();
  showToast('Walk saved 🐾 nice job!');
}

/* ---------- 10. WEEK DOTS / STREAK ---------- */
function renderWeek() {
  const wrap = $('weekDots');
  wrap.innerHTML = '';
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = (new Date().getDay() + 6) % 7; // convert Sun=0 → Mon=0

  state.weekHits.forEach((hit, i) => {
    const dot = document.createElement('div');
    dot.className = `week-dot${hit ? ' hit' : ''}${i === todayIndex ? ' today' : ''}`;
    dot.title = labels[i];
    wrap.appendChild(dot);
  });

  $('streakNum').textContent = `${state.streak}🔥`;
}

/* ---------- 11. BULK ACTIONS ---------- */
function markAllVisible() {
  Object.keys(state.meals).forEach((k) => (state.meals[k] = true));
  Object.keys(state.groom).forEach((k) => (state.groom[k] = true));
  Object.keys(state.checklist).forEach((k) => (state.checklist[k] = true));
  saveState();
  renderAll();
  showToast('Everything marked done — great job! 🎉');
}

function resetDay() {
  if (!confirm("Reset all of today's care tasks?")) return;
  const { streak, weekHits } = state;
  state = { ...defaultState(), streak, weekHits };
  saveState();
  renderAll();
  showToast('Today has been reset.');
}

/* ---------- 12. RENDER EVERYTHING ---------- */
function renderAll() {
  renderMeals();
  renderGroom();
  renderProgress(); // also calls renderChecklist() internally
  renderWalk();
  renderWeek();
}

/* ---------- 13. BOOT ---------- */
renderAll();
if (state.walkRunning) startWalkTimer();