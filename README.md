# Todo 앱

바닐라 HTML/CSS/JavaScript로 만든 심플한 할 일 관리 앱입니다.

## 미리보기

- 할 일을 추가하고, 완료 체크 및 삭제가 가능합니다.
- 전체 / 진행중 / 완료 탭으로 항목을 필터링할 수 있습니다.
- 새로고침해도 데이터가 유지됩니다. (localStorage 저장)

## 기능

| 기능 | 설명 |
|------|------|
| 할 일 추가 | 입력창에 텍스트 입력 후 **추가** 버튼 또는 `Enter` 키 |
| 완료 처리 | 체크박스 클릭 → 취소선 표시 + 완료 시간 기록 |
| 삭제 | ✕ 버튼 클릭 |
| 탭 필터 | 전체보기 / 진행중 / 완료 탭으로 목록 전환 |
| 뱃지 | 각 탭에 항목 개수 실시간 표시 |
| 시간 표시 | 등록 시각 및 완료 시각 표시 |
| 데이터 유지 | localStorage에 자동 저장, 새로고침 후에도 복원 |

## 실행 방법

별도의 설치나 빌드가 필요 없습니다. `index.html` 파일을 브라우저에서 열면 바로 실행됩니다.

로컬 서버가 필요한 경우 아래 방법 중 하나를 사용하세요.

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

이후 브라우저에서 `http://localhost:8080` 접속

## 파일 구조

```
todo-app/
├── index.html   # 마크업 및 레이아웃
├── style.css    # 스타일
└── app.js       # 전체 동작 로직
```

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- localStorage API

## 주요 함수 (app.js)

| 함수 | 역할 |
|------|------|
| `addTodo()` | 입력값 검증 후 todo 생성 → 렌더링 + 저장 |
| `renderItem(todo)` | `<li>` 요소를 동적으로 생성해 목록에 추가 |
| `saveTodos()` | 현재 DOM 상태를 읽어 localStorage에 저장 |
| `applyFilter()` | 현재 탭에 따라 항목 표시/숨김 처리 |
| `updateBadges()` | 각 탭의 항목 개수 뱃지 갱신 |
| `formatTime(isoString)` | ISO 날짜 문자열을 한국어 형식으로 변환 |
