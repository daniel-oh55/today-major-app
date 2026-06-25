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

### Local preflight smoke test #1 — 2026-06-25

**테스트 URL:** `http://localhost:3099` (로컬 프로덕션 빌드 — `next build && next start`)<br />
**테스트 환경:** Local production build (Vercel Preview 배포 전 사전 검증)<br />
**App artifact tested:** `83125a6` (fix: smoke-test-results trailing whitespace and verdict clarity (P2))<br />
**Smoke result documentation commit:** `51958a8` (docs: Phase 14 smoke test results #1)<br />
**테스트 담당:** Claude Sonnet 4.6 (automated + static analysis)

> 이 섹션은 로컬 사전 검증 기록이며 Phase 14 release judgment로 사용하지 않습니다. 최종 릴리즈 판단은 아래 Vercel Preview smoke test 섹션 기준으로만 기록합니다.

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

#### Local preflight summary

| Total | Pass | Fail | Blocked | Not tested |
|-------|------|------|---------|------------|
| 31 | 23 | 0 | 0 | 8 |

> 로컬 사전 검증에서는 release blocker가 발견되지 않았지만, 실제 Vercel Preview/Production URL 기준 smoke test가 아니므로 release judgment를 내리지 않습니다.

---

### Vercel Preview smoke test #1 — 2026-06-25

**배포 URL:** `not available`<br />
**배포 환경:** Vercel Preview (URL 미확보로 실행 불가)<br />
**Deployed app commit SHA:** `not available` (Vercel deployment detail 확인 필요)<br />
**Smoke result documentation commit:** `51958a8` (docs: Phase 14 smoke test results #1)<br />
**테스트 담당:** Claude Sonnet 4.6 (documentation update)

> 실제 Vercel Preview 또는 Production URL이 제공되지 않아 Phase 14 release smoke test를 완료하지 못했습니다. localhost 결과는 release evidence로 사용하지 않습니다.

**테스트 환경:**

| 환경 | 실행 여부 |
|------|----------|
| Desktop Chrome (latest) | blocked — Vercel URL not available |
| Mobile viewport 375px (DevTools) | blocked — Vercel URL not available |
| PWA install check (Chrome Manifest 탭) | blocked — Vercel URL not available |

---

#### 테스트 결과표

> 결과 값: `pass` / `fail` / `blocked` / `not tested`

| # | 항목 | 결과 | 검증 방법 | 비고 |
|---|------|------|----------|------|
| 1 | 배포 URL 접근 가능 여부 | blocked | Vercel URL 확인 | Vercel Preview/Production URL 미확보 |
| 2 | 홈 화면 접속 (`/`) | not tested | Vercel HTTP | URL 미확보 |
| 3 | 오늘 경기 목록 표시 | not tested | Vercel runtime | URL 미확보 |
| 4 | 경기 필터 탭 동작 | not tested | 브라우저 | URL 미확보 |
| 5 | 경기센터 접속 (`/games/[gameId]`) | not tested | Vercel HTTP | URL 미확보 |
| 6 | 경기센터 스코어보드 표시 | not tested | Vercel runtime/browser | URL 미확보 |
| 7 | 경기센터 라인업/박스스코어 표시 | not tested | 브라우저 | URL 미확보 |
| 8 | 선수 검색 (`/players`) | not tested | Vercel HTTP/browser | URL 미확보 |
| 9 | 선수 상세 (`/players/[playerId]`) | not tested | Vercel HTTP | URL 미확보 |
| 10 | 팀 상세 (`/teams/[teamId]`) | not tested | Vercel HTTP | URL 미확보 |
| 11 | 즐겨찾기 (`/favorites`) | not tested | Vercel HTTP/browser | URL 미확보 |
| 12 | 즐겨찾기 추가/해제 동작 | not tested | 브라우저 | URL 미확보 |
| 13 | 공유 기능 (선수/팀/경기) | not tested | 브라우저 | URL 미확보 |
| 14 | 공유 완료 후 inline placeholder | not tested | 브라우저 | URL 미확보 |
| 15 | `/privacy` 접속 | not tested | Vercel HTTP | URL 미확보 |
| 16 | `/terms` 접속 | not tested | Vercel HTTP | URL 미확보 |
| 17 | `/data-notice` 접속 | not tested | Vercel HTTP | URL 미확보 |
| 18 | `manifest.json` (200 OK, 유효한 JSON) | not tested | Vercel HTTP | URL 미확보 |
| 19 | PWA 아이콘 4종 (200 OK) | not tested | Vercel HTTP | URL 미확보 |
| 20 | Chrome DevTools Manifest 오류 없음 | not tested | 브라우저 | URL 미확보 |
| 21 | 광고 placeholder 전 화면 표시 | not tested | 브라우저 | URL 미확보 |
| 22 | 광고 슬롯 위치·종류 정책 일치 | not tested | 브라우저 | URL 미확보 |
| 23 | DataSourceNotice 표시 (홈·팀 상세) | not tested | 브라우저 | URL 미확보 |
| 24 | DataSourceNotice 정책 링크 3종 | not tested | 브라우저 | URL 미확보 |
| 25 | 잘못된 ID 접근 → NotFound 표시 | not tested | Vercel HTTP | URL 미확보 |
| 26 | 모바일 375px 가로 스크롤 없음 | not tested | 브라우저 | URL 미확보 |
| 27 | 모바일 44px 터치 영역 | not tested | 브라우저 | URL 미확보 |
| 28 | API Key/secret 클라이언트 노출 없음 | not tested | Vercel response/bundle | URL 미확보 |
| 29 | 실제 외부 API 호출 없음 (Network 탭) | not tested | 브라우저 Network | URL 미확보 |
| 30 | 광고 SDK 스크립트 없음 | not tested | 브라우저 Network | URL 미확보 |
| 31 | MLB/구단 로고·선수 사진·영상 없음 | not tested | 브라우저 | URL 미확보 |
| 32 | 한국어 문자중계·AI 요약 없음 | not tested | 브라우저 | URL 미확보 |

---

#### Vercel smoke summary

| Total | Pass | Fail | Blocked | Not tested |
|-------|------|------|---------|------------|
| 32 | 0 | 0 | 1 | 31 |

#### Release Blocker 목록

> 아래 항목 중 하나라도 있으면 배포 중단/롤백

| # | 내용 | 관련 이슈 |
|---|------|----------|
| 1 | Vercel Preview/Production URL이 없어 release smoke test를 실행하지 못함 | Vercel URL 필요 |

#### Non-Blocker Follow-up 목록

> 다음 릴리즈 전 처리 예정

| # | 내용 | 우선순위 |
|---|------|----------|
| — | (없음 — 현재 상태는 blocker) | — |

---

#### 최종 판단

- [ ] **Ready for internal test**
- [ ] **Ready for deployment with non-blocker follow-up**
- [ ] **Needs fix before deployment**
- [x] **Blocked**

> **판단 근거:** 실제 Vercel Preview/Production URL 기준 결과가 없습니다. Vercel smoke table 기준 Total 32, Pass 0, Fail 0, Blocked 1, Not tested 31입니다. Vercel URL 확보 후 이 섹션을 실제 결과로 갱신해야 합니다.

---
