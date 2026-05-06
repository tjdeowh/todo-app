let currentTab = 'all';

const input    = document.getElementById('todoInput');
const addBtn   = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// ── 탭 ───────────────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentTab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach((b) =>
      b.classList.toggle('active', b === btn)
    );
    applyFilter();
  });
});

function applyFilter() {
  todoList.querySelectorAll('li').forEach((li) => {
    const isDone = li.classList.contains('done');
    const visible =
      currentTab === 'all'    ? true :
      currentTab === 'active' ? !isDone :
                                isDone;
    li.style.display = visible ? '' : 'none';
  });
}

// ── 뱃지 (항목 개수) ─────────────────────────────────────

function updateBadges() {
  const all  = todoList.querySelectorAll('li');
  const done = todoList.querySelectorAll('li.done');
  document.getElementById('badge-all').textContent    = all.length;
  document.getElementById('badge-active').textContent = all.length - done.length;
  document.getElementById('badge-done').textContent   = done.length;
}

// ── 시간 포맷 ─────────────────────────────────────────────

function formatTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleString('ko-KR', {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

// ── CRUD ─────────────────────────────────────────────────

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  renderItem({ id: Date.now(), text, done: false, createdAt: new Date().toISOString(), doneAt: null });
  saveTodos();
  applyFilter();
  updateBadges();

  input.value = '';
  input.focus();
}

function renderItem(todo) {
  const li = document.createElement('li');
  li.dataset.id = todo.id;
  if (todo.done) li.classList.add('done');

  // 완료 체크박스
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.done;
  checkbox.addEventListener('change', () => {
    const nowDone = checkbox.checked;
    li.classList.toggle('done', nowDone);

    // 완료 시간 갱신
    todo.doneAt = nowDone ? new Date().toISOString() : null;
    li.dataset.doneAt = todo.doneAt || '';
    doneTimeEl.textContent = todo.doneAt ? `완료: ${formatTime(todo.doneAt)}` : '';

    saveTodos();
    applyFilter();
    updateBadges();
  });

  // 텍스트
  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = todo.text;

  // 시간 표시 영역
  const timeWrap = document.createElement('div');
  timeWrap.className = 'time-wrap';

  const createdTimeEl = document.createElement('span');
  createdTimeEl.className = 'time-label';
  createdTimeEl.textContent = `등록: ${formatTime(todo.createdAt)}`;

  const doneTimeEl = document.createElement('span');
  doneTimeEl.className = 'time-label done-time';
  doneTimeEl.textContent = todo.doneAt ? `완료: ${formatTime(todo.doneAt)}` : '';

  timeWrap.append(createdTimeEl, doneTimeEl);

  // 텍스트 + 시간을 묶는 컬럼
  const textCol = document.createElement('div');
  textCol.className = 'text-col';
  textCol.append(span, timeWrap);

  // 삭제 버튼
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '✕';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTodos();
    updateBadges();
  });

  // dataset에 시간 저장 (saveTodos가 DOM에서 읽기 때문)
  li.dataset.createdAt = todo.createdAt || '';
  li.dataset.doneAt    = todo.doneAt    || '';

  li.append(checkbox, textCol, deleteBtn);
  todoList.appendChild(li);
}

// ── 저장 / 불러오기 ───────────────────────────────────────

function saveTodos() {
  const items = [...todoList.querySelectorAll('li')].map((li) => ({
    id:        li.dataset.id,
    text:      li.querySelector('.todo-text').textContent,
    done:      li.classList.contains('done'),
    createdAt: li.dataset.createdAt || null,
    doneAt:    li.dataset.doneAt    || null,
  }));
  localStorage.setItem('todos', JSON.stringify(items));
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('todos') || '[]');
  saved.forEach(renderItem);
  applyFilter();
  updateBadges();
});
