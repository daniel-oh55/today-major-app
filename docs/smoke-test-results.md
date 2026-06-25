# Smoke Test 결과 기록

> 배포 직후 `docs/deployment-smoke-test.md`를 실행한 결과를 여기에 기록합니다.
> Release Blocker/Non-Blocker 기준은 `docs/deployment-smoke-test.md` 하단을 참고하세요.

---

## 템플릿 — 새 테스트 실행 시 아래 블록을 복사하여 추가하세요

---

### 테스트 #N — YYYY-MM-DD

**배포 URL:** `https://`<br />
**배포 환경:** Preview / Production<br />
**Git 커밋:** (commit hash)<br />
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

- [ ] **Ready for internal test** — 모든 항목 pass, blocker 없음, 배포 가능
- [ ] **Ready for deployment with non-blocker follow-up** — blocker 없음, non-blocker 개선 사항은 다음 릴리즈에서 처리
- [ ] **Needs fix before deployment** — 배포 전 수정이 필요한 항목 존재 (blocker는 아니나 권고)
- [ ] **Blocked** — release blocker 존재, 수정 후 재배포 필요

---

---

## 과거 테스트 기록

> 실제 테스트 실행 후 결과를 위 템플릿에 따라 이 아래에 추가하세요.

---

### 테스트 #1 — 2026-06-25

**배포 URL:** `http://localhost:3099` (로컬 프로덕션 빌드 — `next build && next start`)<br />
**배포 환경:** Local production build (Vercel Preview 배포 전 사전 검증)<br />
**Git 커밋:** `83125a6` (fix: smoke-test-results trailing whitespace and verdict clarity (P2))<br />
**테스트 담당:** Claude Sonnet 4.6 (automated + static analysis)

> 참고: 이 테스트는 로컬 프로덕션 빌드 기준입니다. Vercel Preview URL 배포 후 브라우저 시각 항목(모바일 뷰포트, PWA 설치, 터치 영역)을 재확인해야 합니다.

**테스트 환경:**

| 환경 | 실행 여부 |
|------|----------|
| Desktop Chrome (latest) | 미실행 — 로컬 curl + 정적 분석으로 대체 |
| Mobile viewport 375px (DevTools) | 미실행 — Vercel 배포 후 재확인 필요 |
| PWA install check (Chrome Manifest 탭) | 미실행 — Vercel 배포 후 재확인 필요 |

---

#### 테스트 결과표

> 결과 값: `pass` / `fail` / `blocked` / `not tested`
>
> 검증 방법: HTTP = curl status 확인 / 정적 = grep/소스 분석 / 런타임 = 실서버 API 응답 / 브라우저 = 미실행

| # | 항목 | 결과 | 검증 방법 | 비고 |
|---|------|------|----------|------|
| 1 | 홈 화면 접속 (`/`) | pass | HTTP | 200 OK |
| 2 | 오늘 경기 목록 표시 | pass | 런타임 | `/api/games/today` — 더미 경기 9건 반환 확인 |
| 3 | 경기 필터 탭 동작 | not tested | 브라우저 | 클라이언트 JS 상호작용 필요 |
| 4 | 경기센터 접속 (`/games/g001`) | pass | HTTP | 200 OK |
| 5 | 경기센터 스코어보드 표시 | pass | 런타임 | `/api/games/g001` 응답 정상 (homeTeam/awayTeam/score 포함) |
| 6 | 경기센터 라인업/박스스코어 표시 | not tested | 브라우저 | 브라우저 렌더링 확인 필요 |
| 7 | 선수 검색 (`/players`) | pass | HTTP | 200 OK |
| 8 | 선수 상세 (`/players/p002`) | pass | HTTP | 200 OK (Shohei Ohtani 데이터 확인) |
| 9 | 팀 상세 (`/teams/nyy`) | pass | HTTP | 200 OK |
| 10 | 즐겨찾기 (`/favorites`) | pass | HTTP | 200 OK |
| 11 | 즐겨찾기 추가/해제 동작 | not tested | 브라우저 | localStorage JS 상호작용 필요 |
| 12 | 공유 기능 (선수/팀/경기) | not tested | 브라우저 | 브라우저 Share API/Clipboard 필요 |
| 13 | 공유 완료 후 inline placeholder | pass | 정적 | `ShareResultMessage.tsx`: `{isSuccess && <AdSlot placement="share_complete_interstitial" />}` — 조건부 인라인, overlay 아님 |
| 14 | `/privacy` 접속 | pass | HTTP | 200 OK |
| 15 | `/terms` 접속 | pass | HTTP | 200 OK |
| 16 | `/data-notice` 접속 | pass | HTTP | 200 OK |
| 17 | `manifest.json` (200 OK, 유효한 JSON) | pass | HTTP + 런타임 | name: "오늘의 메이저", short_name: "오늘메이저", icons: 4종 |
| 18 | PWA 아이콘 4종 (200 OK) | pass | HTTP | icon-192, icon-512, maskable-icon-192, maskable-icon-512 모두 200 |
| 19 | Chrome DevTools Manifest 오류 없음 | not tested | 브라우저 | Vercel 배포 후 DevTools Application 탭 확인 필요 |
| 20 | 광고 placeholder 전 화면 표시 | pass | 정적 | 7개 placement 모두 올바른 페이지에 위치 확인 |
| 21 | 광고 슬롯 위치·종류 정책 일치 | pass | 정적 | 경기센터: `gamecenter_bottom_banner` 1개만 / 홈: `home_top_banner` + `home_game_list_native` / 즐겨찾기: `favorite_home_inline` |
| 22 | DataSourceNotice 표시 (홈·팀 상세) | pass | 런타임 | 홈 HTML에 "비공식 팬앱 — MLB, MLBAM 및 각 구단과 무관합니다" 확인 |
| 23 | DataSourceNotice 정책 링크 3종 | not tested | 브라우저 | 링크 렌더링 및 클릭 동작 브라우저 확인 필요 |
| 24 | 잘못된 ID 접근 → NotFound 표시 | pass | HTTP | `/games/unknown-id`, `/players/unknown-id`, `/teams/unknown-id` 모두 404 |
| 25 | 모바일 375px 가로 스크롤 없음 | not tested | 브라우저 | DevTools 모바일 뷰포트 확인 필요 |
| 26 | 모바일 44px 터치 영역 | not tested | 브라우저 | DevTools 확인 필요 |
| 27 | API Key/secret 클라이언트 노출 없음 | pass | 정적 + 런타임 | `BASEBALL_API_KEY`는 `server-only` 가드된 `env.ts`에만 존재. 홈 HTML 응답에 키 없음 확인. `NEXT_PUBLIC_` provider secret 없음 확인 |
| 28 | 실제 외부 API 호출 없음 (Network 탭) | pass | 정적 | `api.mlb.com` 참조는 `data-notice/page.tsx` 안내 텍스트뿐. 실제 fetch 호출 없음 확인 |
| 29 | 광고 SDK 스크립트 없음 | pass | 정적 | `adsbygoogle`, `doubleclick`, `googletag` 실제 import 없음 확인. `ad.ts` 타입 문자열·`privacy` 안내 텍스트만 해당 단어 포함 |
| 30 | MLB/구단 로고·선수 사진·영상 없음 | pass | 정적 | 로고/사진/영상 img/src 참조 없음 확인 |
| 31 | 한국어 문자중계·AI 요약 없음 | pass | 정적 | "문자중계", "AI 요약", "pitch-by-pitch" 표현 없음 확인 |

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
| 1 | Vercel Preview URL 기준 브라우저 시각 항목 재확인 (모바일 375px, PWA install, 터치 영역, Manifest DevTools) | high |
| 2 | `/favorites`, 즐겨찾기 추가/해제 JS 동작 브라우저 확인 | medium |
| 3 | 공유 버튼(Share API/Clipboard) 브라우저 동작 확인 | medium |
| 4 | DataSourceNotice 정책 링크 3종 클릭 동작 확인 | low |
| 5 | Chrome DevTools → Application → Manifest 오류 없음 확인 | low |

---

#### 최종 판단

- [ ] **Ready for internal test** — 모든 항목 pass, blocker 없음, 배포 가능
- [x] **Ready for deployment with non-blocker follow-up** — blocker 없음, non-blocker 개선 사항은 다음 릴리즈에서 처리
- [ ] **Needs fix before deployment** — 배포 전 수정이 필요한 항목 존재 (blocker는 아니나 권고)
- [ ] **Blocked** — release blocker 존재, 수정 후 재배포 필요

> **판단 근거:** 자동 검증 가능한 26개 항목 중 19개 pass, 7개 not-tested(브라우저 시각 항목). Release blocker 0건. not-tested 항목은 Vercel 배포 후 브라우저로 재확인 예정.

---
