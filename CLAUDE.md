# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 실행 방법

빌드 도구나 패키지 매니저가 없는 순수 바닐라 프로젝트다. `index.html`을 브라우저에서 직접 열면 된다.

로컬 개발 서버가 필요한 경우 (CORS 등):
```bash
# Python 3
python -m http.server 8080

# Node.js (npx 사용)
npx serve .
```

## 아키텍처

프레임워크나 번들러 없이 HTML/CSS/JS 3파일로 구성된 단일 페이지 앱이다.

### 데이터 흐름

```
사용자 입력 → addTodo() → renderItem() → DOM 추가
                              └→ saveTodos() → localStorage
페이지 로드 → loadTodos() → localStorage 읽기 → renderItem()
```

- **상태 저장소**: `localStorage`의 `'todos'` 키에 `{ id, text, done }` 배열을 JSON으로 저장
- **단방향 렌더링**: 별도의 상태 객체 없이 DOM 자체가 진실의 원천(source of truth)이며, `saveTodos()`는 현재 DOM을 읽어서 localStorage에 동기화
- **id**: `Date.now()`로 생성하므로 밀리초 단위 고유값

### 주요 함수 (app.js)

| 함수 | 역할 |
|------|------|
| `addTodo()` | 입력값 검증 후 todo 객체 생성 → `renderItem` + `saveTodos` 호출 |
| `renderItem(todo)` | `<li>` 요소를 동적 생성해 `#todoList`에 추가 |
| `saveTodos()` | DOM을 순회해 현재 상태를 localStorage에 저장 |
| `loadTodos()` | localStorage에서 불러와 각 항목을 `renderItem`으로 렌더링 |

### CSS 구조

- `.container`: 중앙 카드 레이아웃 (max-width 480px)
- `.done` 클래스: 완료 항목에 토글되며 `.todo-text`에 취소선 적용
- ID 선택자(`#todoInput`, `#addBtn`, `#todoList`)로 JS와 연결
