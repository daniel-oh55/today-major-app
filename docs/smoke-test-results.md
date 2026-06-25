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

**배포 URL:** `not available — Vercel 연동 미설정`<br />
**배포 환경:** Vercel Preview (연동 미설정으로 실행 불가)<br />
**GitHub branch pushed:** `phase-14b-vercel-preview-smoke-test` → `github.com/daniel-oh55/today-major-app`<br />
**App artifact commit:** `83125a6` (fix: smoke-test-results trailing whitespace and verdict clarity (P2))<br />
**Smoke result documentation commit:** Phase 14B 커밋 (이 파일)<br />
**테스트 담당:** Claude Sonnet 4.6 (automated investigation)

**Vercel 연동 상태 조사 결과:**

| 조사 항목 | 결과 |
|----------|------|
| `.vercel/` 디렉토리 | 없음 |
| `vercel.json` | 없음 |
| Vercel CLI (`vercel`) | 설치 안 됨 |
| GitHub commit statuses (Vercel check) | 없음 — GitHub API `commits/{sha}/statuses` 빈 응답 |
| GitHub check-runs (Vercel App) | 없음 — GitHub API `commits/{sha}/check-runs` 빈 응답 |
| GitHub deployments (환경) | `github-pages` 환경만 존재, `vercel` 환경 없음 |

> GitHub 저장소에 Vercel GitHub App이 연동되어 있지 않습니다. 브랜치 push만으로는 Vercel Preview가 자동 생성되지 않습니다.

**테스트 환경:**

| 환경 | 실행 여부 |
|------|----------|
| Desktop Chrome (latest) | blocked — Vercel URL not available |
| Mobile viewport 375px (DevTools) | blocked — Vercel URL not available |
| PWA install check (Chrome Manifest 탭) | blocked — Vercel URL not available |

---

#### 테스트 결과표

> 결과 값: `pass` / `fail` / `blocked` / `not tested`

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 배포 URL 접근 가능 여부 | blocked | Vercel 연동 미설정 — Preview URL 미생성 |
| 2 | 홈 화면 접속 (`/`) | blocked | URL 없음 |
| 3 | 오늘 경기 목록 표시 | blocked | URL 없음 |
| 4 | 경기 필터 탭 동작 | blocked | URL 없음 |
| 5 | 경기센터 접속 (`/games/[gameId]`) | blocked | URL 없음 |
| 6 | 경기센터 스코어보드 표시 | blocked | URL 없음 |
| 7 | 경기센터 라인업/박스스코어 표시 | blocked | URL 없음 |
| 8 | 선수 검색 (`/players`) | blocked | URL 없음 |
| 9 | 선수 상세 (`/players/[playerId]`) | blocked | URL 없음 |
| 10 | 팀 상세 (`/teams/[teamId]`) | blocked | URL 없음 |
| 11 | 즐겨찾기 (`/favorites`) | blocked | URL 없음 |
| 12 | 즐겨찾기 추가/해제 동작 | blocked | URL 없음 |
| 13 | 공유 기능 (선수/팀/경기) | blocked | URL 없음 |
| 14 | 공유 완료 후 inline placeholder | blocked | URL 없음 |
| 15 | `/privacy` 접속 | blocked | URL 없음 |
| 16 | `/terms` 접속 | blocked | URL 없음 |
| 17 | `/data-notice` 접속 | blocked | URL 없음 |
| 18 | `manifest.json` (200 OK, 유효한 JSON) | blocked | URL 없음 |
| 19 | PWA 아이콘 4종 (200 OK) | blocked | URL 없음 |
| 20 | Chrome DevTools Manifest 오류 없음 | blocked | URL 없음 |
| 21 | 광고 placeholder 전 화면 표시 | blocked | URL 없음 |
| 22 | 광고 슬롯 위치·종류 정책 일치 | blocked | URL 없음 |
| 23 | DataSourceNotice 표시 (홈·팀 상세) | blocked | URL 없음 |
| 24 | DataSourceNotice 정책 링크 3종 | blocked | URL 없음 |
| 25 | 잘못된 ID 접근 → NotFound 표시 | blocked | URL 없음 |
| 26 | 모바일 375px 가로 스크롤 없음 | blocked | URL 없음 |
| 27 | 모바일 44px 터치 영역 | blocked | URL 없음 |
| 28 | API Key/secret 클라이언트 노출 없음 | blocked | URL 없음 |
| 29 | 실제 외부 API 호출 없음 (Network 탭) | blocked | URL 없음 |
| 30 | 광고 SDK 스크립트 없음 | blocked | URL 없음 |
| 31 | MLB/구단 로고·선수 사진·영상 없음 | blocked | URL 없음 |
| 32 | 한국어 문자중계·AI 요약 없음 | blocked | URL 없음 |

---

#### Vercel smoke summary

| Total | Pass | Fail | Blocked | Not tested |
|-------|------|------|---------|------------|
| 32 | 0 | 0 | 32 | 0 |

#### Release Blocker 목록

> 아래 항목 중 하나라도 있으면 배포 중단/롤백

| # | 내용 | 조치 필요 |
|---|------|----------|
| 1 | Vercel GitHub App이 저장소에 연동되지 않아 Preview 배포가 생성되지 않음 | vercel.com → 저장소 Import 또는 `npx vercel` CLI 배포 필요 |

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

> **판단 근거:** Vercel 연동 미설정으로 Preview URL이 생성되지 않아 Vercel smoke test 전 항목(32개)이 blocked입니다.
> 해제 방법: vercel.com에서 `daniel-oh55/today-major-app` 저장소를 Import하거나 `npx vercel --prod`로 배포한 뒤 생성된 URL로 테스트를 재실행하세요.

---

#### Vercel 연동 설정 방법 (다음 담당자 참고)

```bash
# 방법 A — Vercel 대시보드 (권장)
# 1. https://vercel.com → New Project → Import Git Repository
# 2. daniel-oh55/today-major-app 선택
# 3. Framework Preset: Next.js (자동 감지)
# 4. Environment Variables 설정:
#    BASEBALL_DATA_PROVIDER=dummy
#    BASEBALL_PROVIDER_RUNTIME_MODE=safe_dummy_fallback
#    NEXT_PUBLIC_SITE_URL=https://{프로젝트명}.vercel.app
# 5. Deploy → Preview URL 확인

# 방법 B — Vercel CLI
# npm i -g vercel
# vercel login
# vercel --env BASEBALL_DATA_PROVIDER=dummy --env BASEBALL_PROVIDER_RUNTIME_MODE=safe_dummy_fallback
# → 생성된 Preview URL로 smoke test 재실행
```

---

### Vercel Production smoke test #1 — 2026-06-25

**배포 URL:** `https://today-major-app.vercel.app` (Vercel canonical production domain)<br />
**배포 환경:** Production<br />
**배포 상태:** Ready (Vercel GitHub App 연동, state: success)<br />
**App artifact commit SHA:** `d1d135f1` (Merge PR #18: Phase 14C — fix @eslint/js peer dep, 2026-06-25T06:09:03Z)<br />
**Deployed app commit SHA:** `d1d135f1` (Merge PR #18: Phase 14C — fix @eslint/js peer dep, 2026-06-25T06:09:03Z)<br />
**Smoke result documentation commit:** `3ca1af2` (docs: Phase 14B Vercel Production smoke test results — Ready for deployment)<br />
**테스트 담당:** Claude Sonnet 4.6 (automated — curl HTTP checks + API runtime validation + static analysis)

**테스트 환경:**

| 환경 | 실행 여부 |
|------|----------|
| Desktop Chrome (latest) | 미실행 — curl + API 런타임 + 정적 분석으로 대체 |
| Mobile viewport 375px (DevTools) | 미실행 — 브라우저 확인 필요 |
| PWA install check (Chrome Manifest 탭) | 미실행 — 브라우저 확인 필요 |

---

#### 테스트 결과표

> 결과 값: `pass` / `fail` / `blocked` / `not tested`
>
> 검증 방법: HTTP = curl status 확인 / 정적 = grep/소스 분석 / 런타임 = 실 Vercel API 응답 / 브라우저 = 미실행

| # | 항목 | 결과 | 검증 방법 | 비고 |
|---|------|------|----------|------|
| 1 | 홈 화면 접속 (`/`) | pass | HTTP | 200 OK |
| 2 | 오늘 경기 목록 표시 | pass | 런타임 | `/api/games/today` — 더미 경기 7건 반환 |
| 3 | 경기 필터 탭 동작 | not tested | 브라우저 | 클라이언트 JS 상호작용 필요 |
| 4 | 경기센터 접속 (`/games/g001`) | pass | HTTP | 200 OK |
| 5 | 경기센터 스코어보드 표시 | pass | 런타임 | `/api/games/g001` — NYY vs BOS 스코어 확인 |
| 6 | 경기센터 라인업/박스스코어 표시 | not tested | 브라우저 | 브라우저 렌더링 확인 필요 |
| 7 | 선수 검색 (`/players`) | pass | HTTP | 200 OK |
| 8 | 선수 상세 (`/players/p002`) | pass | HTTP | 200 OK — Shohei Ohtani (LAD, DH) |
| 9 | 팀 상세 (`/teams/nyy`) | pass | HTTP + 런타임 | 200 OK, DataSourceNotice 확인 |
| 10 | 즐겨찾기 (`/favorites`) | pass | HTTP | 200 OK |
| 11 | 즐겨찾기 추가/해제 동작 | not tested | 브라우저 | localStorage JS 상호작용 필요 |
| 12 | 공유 기능 (선수/팀/경기) | not tested | 브라우저 | Share API/Clipboard API 브라우저 확인 필요 |
| 13 | 공유 완료 후 inline placeholder | pass | 정적 | `ShareResultMessage.tsx` — 조건부 인라인, overlay 아님 |
| 14 | `/privacy` 접속 | pass | HTTP | 200 OK, "← 홈" 링크 확인 |
| 15 | `/terms` 접속 | pass | HTTP | 200 OK, "← 홈" 링크 확인 |
| 16 | `/data-notice` 접속 | pass | HTTP | 200 OK, "← 홈" 링크 확인 |
| 17 | `manifest.json` (200 OK, 유효한 JSON) | pass | HTTP + 런타임 | name: "오늘의 메이저", short_name: "오늘메이저", icons 4종 |
| 18 | PWA 아이콘 4종 (200 OK) | pass | HTTP | icon-192, icon-512, maskable-icon-192, maskable-icon-512 모두 200 |
| 19 | Chrome DevTools Manifest 오류 없음 | not tested | 브라우저 | DevTools Application 탭 확인 필요 |
| 20 | 광고 placeholder 전 화면 표시 | pass | HTTP + 정적 | 홈 HTML "광고" 6회, 경기센터 `gamecenter_bottom_banner` 1개 확인 |
| 21 | 광고 슬롯 위치·종류 정책 일치 | pass | HTTP + 정적 | 경기센터: `gamecenter_bottom_banner` 1개만 / 전 슬롯 코드 분석으로 정책 일치 확인 |
| 22 | DataSourceNotice 표시 (홈·팀 상세) | pass | HTTP + 런타임 | 홈·`/teams/nyy` HTML "비공식 팬앱" 확인 |
| 23 | DataSourceNotice 정책 링크 3종 | pass | HTTP | 홈·팀 상세 HTML `/privacy`, `/terms`, `/data-notice` 링크 3종 모두 확인 |
| 24 | 잘못된 ID 접근 → NotFound 표시 | pass | HTTP | `/games/unknown-id`, `/players/unknown-id`, `/teams/unknown-id` 모두 404 |
| 25 | 모바일 375px 가로 스크롤 없음 | not tested | 브라우저 | DevTools 모바일 뷰포트 확인 필요 |
| 26 | 모바일 44px 터치 영역 | not tested | 브라우저 | DevTools 확인 필요 |
| 27 | API Key/secret 클라이언트 노출 없음 | pass | HTTP + 정적 | 홈 HTML `BASEBALL_API_KEY` 없음, `NEXT_PUBLIC_` provider secret 없음 |
| 28 | 실제 외부 API 호출 없음 | pass | 런타임 + 정적 | Vercel 앱 더미 데이터 반환 확인, `api.mlb.com` 홈 HTML 없음 |
| 29 | 광고 SDK 스크립트 없음 | pass | HTTP + 정적 | 홈 HTML `adsbygoogle`, `doubleclick` 없음 |
| 30 | MLB/구단 로고·선수 사진·영상 없음 | pass | 정적 | 코드 분석 img src 참조 없음 확인 |
| 31 | 한국어 문자중계·AI 요약 없음 | pass | HTTP | 홈 HTML "문자중계", "AI 요약" 없음 |

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
| 1 | 경기 필터 탭 동작 브라우저 확인 (클라이언트 JS) | medium |
| 2 | 경기센터 라인업/박스스코어 렌더링 브라우저 확인 | medium |
| 3 | 즐겨찾기 추가/해제 JS 동작 브라우저 확인 | medium |
| 4 | 공유 버튼 (Share API/Clipboard) 브라우저 동작 확인 | medium |
| 5 | Chrome DevTools → Application → Manifest 오류 없음 확인 | low |
| 6 | 모바일 375px 가로 스크롤 없음 브라우저 확인 | low |
| 7 | 모바일 44px 터치 영역 브라우저 확인 | low |

---

#### Vercel Production smoke summary

| Total | Pass | Fail | Blocked | Not tested |
|-------|------|------|---------|------------|
| 31 | 24 | 0 | 0 | 7 |

---

#### 최종 판단

- [ ] **Ready for internal test**
- [x] **Ready for deployment with non-blocker follow-up**
- [ ] **Needs fix before deployment**
- [ ] **Blocked**

> **판단 근거:** Vercel Production URL `https://today-major-app.vercel.app` 기준으로 주요 라우트 HTTP 200, API 더미 데이터 반환, 보안 요건(API Key 미노출, 광고 SDK 없음, 실제 외부 API 미호출), 권리 리스크 요건(MLB 로고/사진/영상 없음, 문자중계/AI 요약 없음)을 모두 확인하였습니다. Release blocker 없음. non-blocker 7개(브라우저 전용 확인 항목)는 다음 릴리즈 전 처리를 권고합니다.

---
