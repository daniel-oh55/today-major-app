# Release Candidate 체크리스트

> Release Candidate 배포 전 최종 점검 목록입니다.
> 모든 항목이 통과되어야 RC 배포를 진행합니다.

---

## 1. 빌드 검증

- [ ] `npm run lint` — 0 errors, 0 warnings
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — 성공 (전체 라우트 생성 확인)
- [ ] 빌드 출력에 API Key·secret이 포함되지 않음
- [ ] `.env.local`이 빌드 결과에 포함되지 않음

## 2. 라우팅 검증

- [ ] `/` — 홈 (경기 목록) 정상 표시
- [ ] `/players` — 선수 검색 정상 표시
- [ ] `/players/[유효한playerId]` — 선수 상세 정상 표시
- [ ] `/players/unknown-id` — 404 NotFound 페이지로 이동
- [ ] `/games/[유효한gameId]` — 경기센터 정상 표시
- [ ] `/games/unknown-id` — 404 NotFound 페이지로 이동
- [ ] `/teams/[유효한teamId]` — 팀 상세 정상 표시
- [ ] `/teams/unknown-id` — 404 NotFound 페이지로 이동
- [ ] `/favorites` — 즐겨찾기 페이지 정상 표시
- [ ] `/privacy` — 개인정보처리방침 페이지 표시
- [ ] `/terms` — 이용약관 페이지 표시
- [ ] `/data-notice` — 데이터 안내 페이지 표시

## 3. 모바일 375px 검증

- [ ] 홈 화면 — 375px에서 가로 스크롤 없음
- [ ] 경기센터 — 라인스코어·박스스코어 테이블 `overflow-x-auto` 처리
- [ ] 선수 검색 — input + 검색 버튼 44px 이상 터치 영역
- [ ] 즐겨찾기·공유 버튼 — 44px 이상 터치 영역
- [ ] BottomNav — 탭 터치 영역 충분

## 4. PWA 설치 검증

- [ ] Chrome DevTools → Application → Manifest — 오류 없음
- [ ] 아이콘 192x192, 512x512 정상 로드
- [ ] maskable 아이콘 정상 로드
- [ ] `start_url: "/"` 정상 접근
- [ ] `display: "standalone"` 설정 확인
- [ ] iOS Safari "홈 화면에 추가" 후 앱 이름 "오늘의 메이저" 표시
- [ ] apple-touch-icon 정상 참조

## 5. manifest / icon 검증

- [ ] `/manifest.json` 응답 정상 (200 OK)
- [ ] `/icons/icon-192.png` 응답 정상
- [ ] `/icons/icon-512.png` 응답 정상
- [ ] `/icons/maskable-icon-192.png` 응답 정상
- [ ] `/icons/maskable-icon-512.png` 응답 정상
- [ ] 아이콘에 MLB/구단 로고가 없음 (자체 디자인 확인)
- [ ] manifest `name: "오늘의 메이저"` 확인
- [ ] manifest `short_name: "오늘메이저"` 확인

## 6. 내비게이션/접근성 검증

- [ ] BottomNav 활성 탭에 `aria-current="page"` 적용
- [ ] 홈 탭이 `/`에서 활성화
- [ ] 선수 탭이 `/players`에서 활성화
- [ ] 즐겨찾기 탭이 `/favorites`에서 활성화
- [ ] privacy/terms/data-notice 페이지에서 "← 홈" 링크 동작

## 7. 데이터 출처 고지 검증

- [ ] 홈 화면 하단 DataSourceNotice 표시
- [ ] 팀 상세 하단 DataSourceNotice 표시
- [ ] DataSourceNotice에 현재 더미 데이터 기준 경고(⚠) 표시
- [ ] DataSourceNotice에 개인정보처리방침·이용약관·데이터 안내 링크 표시
- [ ] "비공식 팬앱" 명확히 표시, "공식 MLB 앱" 표현 없음

## 8. 광고 placeholder 검증

- [ ] 실제 광고 SDK import 없음 (`window.adsbygoogle` 등)
- [ ] 광고 Publisher ID·App ID 하드코딩 없음
- [ ] 홈: `home_top_banner`, `home_game_list_native` 2종만
- [ ] 경기센터: `gamecenter_bottom_banner` 1개만
- [ ] `share_complete_interstitial` — 인라인 placeholder, 자동 overlay 아님
- [ ] `favorite_home_inline` — 즐겨찾기 페이지 전용

## 9. API Key / 보안 검증

- [ ] `NEXT_PUBLIC_` 접두사 변수에 API Key 없음
- [ ] API Key가 클라이언트 번들에 없음 (DevTools 소스 검색)
- [ ] `.env.local`이 `.gitignore`에 포함
- [ ] API Key 코드 하드코딩 없음 (`grep -r "BASEBALL_API_KEY" src/`)
- [ ] `server-only` import가 provider·env 파일에 있음

## 10. MLB Stats API 미사용 검증

- [ ] 소스코드에 `api.mlb.com` 참조 없음
- [ ] 소스코드에 MLB Stats API endpoint 참조 없음

## 11. 권리 리스크 검증

- [ ] MLB·구단 로고 이미지 없음
- [ ] 선수 사진 없음
- [ ] 영상·하이라이트 요소 없음
- [ ] "공식 MLB 앱", "Official", "공식 기록" 표현이 사용자 화면에 없음

## 12. 한국어 문자중계 / AI 요약 미사용 검증

- [ ] 문자중계 기능·표현 없음
- [ ] AI 요약 기능·표현 없음
- [ ] pitch-by-pitch 자연어 생성 없음

## 13. Vercel 환경변수 검증 (배포 직전)

- [ ] `BASEBALL_DATA_PROVIDER=dummy` 또는 미설정
- [ ] `BASEBALL_PROVIDER_RUNTIME_MODE=safe_dummy_fallback` 또는 미설정
- [ ] `BASEBALL_API_KEY` 미설정 (현재 더미 단계)
- [ ] `NEXT_PUBLIC_SITE_URL` 설정 (프로덕션 URL)
- [ ] `BASEBALL_API_KEY`가 Preview 환경에 노출되지 않음

## 14. 상업 API 계약 전 확인 항목

- [ ] 광고형 무료 앱 사용 가능 여부 확인 (`docs/commercial-api-checklist.md`)
- [ ] Provider 문의 템플릿 작성 (`docs/provider-contact-template.md`)
- [ ] API provider 평가 상태 업데이트 (`docs/api-provider-evaluation.md`)
- [ ] POC 운영 계획 확인 (`docs/provider-poc-runbook.md`)

## 15. 광고 SDK 연동 전 확인 항목

- [ ] Google AdSense 정책에서 스포츠 데이터 앱 허용 여부 확인
- [ ] 광고 배치 정책 최종 확인 (`docs/ads-policy.md`)
- [ ] 개인정보처리방침 업데이트 (광고 SDK 도입 시 GDPR/CCPA 요건 포함)
- [ ] 앱스토어/플레이스토어 배포 시 광고 관련 별도 정책 확인

---

*이 문서는 Phase 11 기준으로 작성되었습니다. 실제 서비스 출시 전 각 항목을 최신화하세요.*
