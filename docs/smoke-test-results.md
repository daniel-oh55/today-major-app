# Smoke Test 결과 기록

> 배포 직후 `docs/deployment-smoke-test.md`를 실행한 결과를 여기에 기록합니다.
> Release Blocker/Non-Blocker 기준은 `docs/deployment-smoke-test.md` 하단을 참고하세요.

---

## 템플릿 — 새 테스트 실행 시 아래 블록을 복사하여 추가하세요

---

### 테스트 #N — YYYY-MM-DD

**배포 URL:** `https://`  
**배포 환경:** Preview / Production  
**Git 커밋:** (commit hash)  
**테스트 담당:** (담당자)

**테스트 환경:**

| 환경 | 실행 여부 |
|------|----------|
| Desktop Chrome (latest) | |
| Mobile viewport 375px (DevTools) | |
| PWA install check (Chrome Manifest 탭) | |

---

#### 테스트 결과표

> 결과 값: `pass` / `fail` / `blocked` / `not tested`

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 홈 화면 접속 (`/`) | | |
| 2 | 오늘 경기 목록 표시 | | |
| 3 | 경기 필터 탭 동작 | | |
| 4 | 경기센터 접속 (`/games/[gameId]`) | | |
| 5 | 경기센터 스코어보드 표시 | | |
| 6 | 경기센터 라인업/박스스코어 표시 | | |
| 7 | 선수 검색 (`/players`) | | |
| 8 | 선수 상세 (`/players/[playerId]`) | | |
| 9 | 팀 상세 (`/teams/[teamId]`) | | |
| 10 | 즐겨찾기 (`/favorites`) | | |
| 11 | 즐겨찾기 추가/해제 동작 | | |
| 12 | 공유 기능 (선수/팀/경기) | | |
| 13 | 공유 완료 후 inline placeholder | | |
| 14 | `/privacy` 접속 | | |
| 15 | `/terms` 접속 | | |
| 16 | `/data-notice` 접속 | | |
| 17 | `manifest.json` (200 OK, 유효한 JSON) | | |
| 18 | PWA 아이콘 4종 (200 OK) | | |
| 19 | Chrome DevTools Manifest 오류 없음 | | |
| 20 | 광고 placeholder 전 화면 표시 | | |
| 21 | 광고 슬롯 위치·종류 정책 일치 | | |
| 22 | DataSourceNotice 표시 (홈·팀 상세) | | |
| 23 | DataSourceNotice 정책 링크 3종 | | |
| 24 | 잘못된 ID 접근 → NotFound 표시 | | |
| 25 | 모바일 375px 가로 스크롤 없음 | | |
| 26 | 모바일 44px 터치 영역 | | |
| 27 | API Key/secret 클라이언트 노출 없음 | | |
| 28 | 실제 외부 API 호출 없음 (Network 탭) | | |
| 29 | 광고 SDK 스크립트 없음 | | |
| 30 | MLB/구단 로고·선수 사진·영상 없음 | | |
| 31 | 한국어 문자중계·AI 요약 없음 | | |

---

#### Release Blocker 목록

> 아래 항목 중 하나라도 있으면 배포 중단/롤백

| # | 내용 | 관련 이슈 |
|---|------|----------|
| — | (없음) | — |

#### Non-Blocker Follow-up 목록

> 다음 릴리즈 전 처리 예정

| # | 내용 | 우선순위 |
|---|------|----------|
| — | (없음) | — |

---

#### 최종 판단

- [ ] **Ready for internal test** — 모든 항목 pass, blocker 없음
- [ ] **Needs fix** — non-blocker만 있음, 다음 릴리즈 처리
- [ ] **Blocked** — release blocker 존재, 재배포 필요

---

---

## 과거 테스트 기록

> 실제 테스트 실행 후 결과를 위 템플릿에 따라 이 아래에 추가하세요.

*(현재 테스트 실행 이력 없음 — Phase 13 기준 초기 생성)*
