# Deployment Smoke Test

> Vercel Preview/Production 배포 직후 실행하는 최소 기능 확인 목록입니다.
> 현재 MVP 기준: 더미 데이터, 광고 SDK 미연동, 상업 API 미연동.
>
> **이 목록은 모든 배포 후 수동으로 실행해야 합니다.**

---

## 사전 확인

- [ ] 배포 URL이 접근 가능함 (Vercel Preview 또는 Production URL)
- [ ] `BASEBALL_PROVIDER_RUNTIME_MODE=safe_dummy_fallback` (또는 `dummy_only`) 설정 확인
- [ ] `BASEBALL_API_KEY`가 비어있거나 설정되지 않음 확인

---

## 1. 기본 접속

- [ ] `https://{배포URL}/` 접속 → 홈 화면 정상 표시 (HTTP 200)
- [ ] 페이지 타이틀이 "오늘의 메이저"로 표시됨
- [ ] 콘솔에 JavaScript 오류 없음

---

## 2. 홈 화면 (`/`)

- [ ] 오늘 날짜(KST 기준) 또는 더미 날짜가 표시됨
- [ ] 경기 카드 목록이 표시됨
- [ ] 전체/진행 중/예정/종료 필터 탭이 표시됨
- [ ] 상단 배너 광고 placeholder가 표시됨 (`home_top_banner`)
- [ ] 경기 목록 중간 네이티브 광고 placeholder가 표시됨 (`home_game_list_native`)
- [ ] 하단에 비공식 고지(DataSourceNotice)가 표시됨
- [ ] DataSourceNotice에 "비공식 팬앱" 문구가 있음
- [ ] DataSourceNotice에 개인정보처리방침·이용약관·데이터 안내 링크가 표시됨
- [ ] "공식 MLB 앱", "공식 기록" 표현이 없음

---

## 3. 경기센터 (`/games/[gameId]`)

- [ ] 홈 화면 경기 카드 탭 → 경기센터로 이동됨
- [ ] 스코어보드가 표시됨
- [ ] 라인업 또는 박스스코어 테이블이 표시됨
- [ ] 경기센터 하단에 `gamecenter_bottom_banner` 광고 placeholder 1개만 표시됨
- [ ] 경기센터에 `home_top_banner`, `player_detail_mid_native` 등 타 광고가 없음
- [ ] 경기 공유 버튼이 표시됨
- [ ] "문자중계", "AI 요약" 표현이 없음
- [ ] 존재하지 않는 gameId (`/games/unknown-id`) 접근 → NotFound 페이지 표시

---

## 4. 선수 검색 (`/players`)

- [ ] 검색창이 표시됨
- [ ] 검색어 입력 후 "검색" 버튼 탭 → 결과 목록 표시됨
- [ ] 검색 결과가 없을 때 EmptyState 표시됨
- [ ] 검색 결과 카드 탭 → 선수 상세로 이동됨

---

## 5. 선수 상세 (`/players/[playerId]`)

- [ ] 선수 이름, 팀, 포지션, 번호가 표시됨
- [ ] 시즌 스탯 요약이 표시됨
- [ ] 즐겨찾기 버튼이 표시됨
- [ ] 즐겨찾기 추가 → 버튼 상태 변경됨
- [ ] 즐겨찾기 해제 → 버튼 상태 원복됨
- [ ] 공유 버튼이 표시됨
- [ ] `player_detail_mid_native` 광고 placeholder가 표시됨
- [ ] 선수 사진이 표시되지 않음
- [ ] 존재하지 않는 playerId (`/players/unknown-id`) 접근 → NotFound 페이지 표시

---

## 6. 팀 상세 (`/teams/[teamId]`)

- [ ] 팀 이름, 리그/지구 정보가 표시됨
- [ ] 시즌 승패 기록이 표시됨
- [ ] 즐겨찾기 버튼이 표시됨
- [ ] 공유 버튼이 표시됨
- [ ] `team_detail_mid_native` 광고 placeholder가 표시됨
- [ ] 구단 로고가 표시되지 않음
- [ ] 비공식 안내(DataSourceNotice)가 하단에 표시됨
- [ ] 존재하지 않는 teamId (`/teams/unknown-id`) 접근 → NotFound 페이지 표시

---

## 7. 즐겨찾기 (`/favorites`)

- [ ] 즐겨찾기 페이지가 표시됨
- [ ] 즐겨찾는 팀/선수 목록이 표시됨 (또는 비어있을 때 EmptyState)
- [ ] 팀 항목 탭 → 팀 상세로 이동됨
- [ ] 선수 항목 탭 → 선수 상세로 이동됨
- [ ] `favorite_home_inline` 광고 placeholder가 표시됨
- [ ] BottomNav "즐겨찾기" 탭이 활성화됨

---

## 8. 공유 기능

- [ ] 선수 상세에서 공유 버튼 탭 → 공유 텍스트 생성됨
- [ ] 팀 상세에서 공유 버튼 탭 → 공유 텍스트 생성됨
- [ ] 경기센터에서 공유 버튼 탭 → 공유 텍스트 생성됨
- [ ] 공유 텍스트에 "공식", "Official" 표현이 없음
- [ ] 공유 완료 후 `share_complete_interstitial` placeholder가 인라인으로 표시됨 (전면 overlay 아님)

---

## 9. 정책 페이지

- [ ] `/privacy` — 개인정보처리방침 페이지 정상 표시
- [ ] `/terms` — 이용약관 페이지 정상 표시
- [ ] `/data-notice` — 데이터 안내 페이지 정상 표시
- [ ] 각 페이지 상단 "← 홈" 링크가 홈으로 이동됨
- [ ] 각 페이지에 임시 안내 배너(⚠)가 표시됨

---

## 10. PWA / manifest

- [ ] `https://{배포URL}/manifest.json` → 200 OK, 유효한 JSON
- [ ] `https://{배포URL}/icons/icon-192.png` → 200 OK
- [ ] `https://{배포URL}/icons/icon-512.png` → 200 OK
- [ ] `https://{배포URL}/icons/maskable-icon-192.png` → 200 OK
- [ ] `https://{배포URL}/icons/maskable-icon-512.png` → 200 OK
- [ ] Chrome DevTools → Application → Manifest → 오류 없음
- [ ] manifest `name: "오늘의 메이저"`, `short_name: "오늘메이저"` 확인

---

## 11. 모바일 375px 기준

- [ ] 홈 화면 — 가로 스크롤 없음
- [ ] 경기센터 — 테이블이 `overflow-x-auto`로 처리됨 (좌우 스크롤)
- [ ] 검색 input — 손가락으로 누르기 충분한 크기
- [ ] 즐겨찾기/공유 버튼 — 44px 이상 터치 영역
- [ ] BottomNav — 탭 3개 고르게 배치됨

---

## 12. 보안 / 비밀 노출 확인

- [ ] Chrome DevTools → Network → 응답 헤더에 `BASEBALL_API_KEY` 없음
- [ ] Chrome DevTools → Sources → 클라이언트 번들에 API Key 없음
  (`Ctrl+Shift+F`로 `BASEBALL_API_KEY`, `api_key`, `apiKey` 검색)
- [ ] `NEXT_PUBLIC_` 변수에 provider secret이 없음
- [ ] 응답 데이터에 내부 오류 메시지·stack trace가 없음

---

## 13. 금지 항목 회귀 확인

- [ ] MLB/구단 로고 이미지가 화면에 없음
- [ ] 선수 사진이 화면에 없음
- [ ] 영상·하이라이트 요소가 없음
- [ ] 실제 광고 SDK 스크립트가 로드되지 않음
  (Network 탭에서 `adsbygoogle`, `doubleclick`, `adsystem` 등 없음)
- [ ] 광고 Publisher ID가 노출되지 않음
- [ ] MLB Stats API (`api.mlb.com`) 호출이 없음
  (Network 탭에서 `api.mlb.com` 없음)
- [ ] 실제 외부 스포츠 API 호출이 없음
  (더미 데이터 모드 기준)
- [ ] "공식 MLB 앱", "Official MLB", "공식 기록" 표현이 화면에 없음
- [ ] 한국어 문자중계, AI 요약, pitch-by-pitch 기능이 없음

---

## 완료 기준

위 항목 전체 통과 시 해당 배포를 smoke test 완료로 판단합니다.

실패 항목이 있을 경우 이슈를 기록하고 배포를 롤백하거나 핫픽스를 진행하세요.

---

*이 문서는 Phase 12 기준으로 작성되었습니다. 상업 API 연동 또는 광고 SDK 연동 후 관련 항목을 추가해야 합니다.*
