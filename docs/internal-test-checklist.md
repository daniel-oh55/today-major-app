# 내부 테스트 체크리스트

> **내부 테스트용 확인 목록입니다.**
> 현재 모든 데이터는 더미 데이터 기준입니다.
>
> Phase 15(모바일 UX 미세 개선) 항목은 `phase-15-internal-test-feedback` 브랜치 병합 후 이 문서에 추가됩니다.

---

## Phase 16.5 — UI/UX 폴리시 확인 항목

> 이 항목들은 Phase 16.5(`phase-16-5-product-ui-ux-polish`) 변경사항을 반영합니다.
> lint / tsc / build 기준: 오류 없음.

### DS-1. 디자인 시스템 통일성

- [ ] 모든 카드 컴포넌트가 `rounded-xl`을 사용한다 (StatCard, BoxScoreTable, LineupTable, RecentGameLogTable, RosterTable 등).
- [ ] Section 타이틀이 `text-sm font-semibold text-gray-700` 스타일로 표시된다 (`uppercase`, `tracking-wide` 없음).
- [ ] Section 타이틀이 한국어로 읽기 쉽게 표시된다 (불필요한 자간/대문자 없음).
- [ ] TeamStatSummary 내 "팀 타격", "팀 투구" 서브 레이블이 `text-xs font-medium text-gray-500` 스타일이다.
- [ ] GameShareCard "주요 기록" 레이블에 `uppercase tracking-wide`가 없다.
- [ ] TeamShareCard "최근 경기" 레이블에 `uppercase tracking-wide`가 없다.
- [ ] RosterTable 포지션 뱃지가 `rounded-md`를 사용한다.

### DS-2. EmptyState 시각적 개선

- [ ] EmptyState 컴포넌트에 ⚾ 이모지 아이콘이 표시된다.
- [ ] 검색 결과 없음, 라인업 없음, 이벤트 없음 등 각 EmptyState에 ⚾이 표시된다.
- [ ] EmptyState가 py-12 기준으로 적절한 세로 여백을 가진다.

### DS-3. AppHeader 터치 영역

- [ ] "← 뒤로" 링크가 `min-h-[44px]`을 충족한다 (경기센터, 선수 상세, 팀 상세 등).
- [ ] 경기 상세, 선수 상세, 팀 상세 진입 후 "← 뒤로" 탭 시 이전 화면으로 이동한다.

### DS-4. 팀 상세 헤더 중복 안내 제거

- [ ] 팀 상세(`/teams/[teamId]`) 헤더 영역에서 `※ 비공식 앱 · 더미 데이터 기준` 문구가 제거되었다.
- [ ] 팀 상세 하단 DataSourceNotice가 여전히 표시된다 (제거되지 않음).
- [ ] 동일한 안내가 두 번 표시되지 않는다.

### DS-5. 금지 표현 확인 (회귀 방지)

- [ ] 앱 전체에 "공식 MLB 앱" 표현이 없다.
- [ ] 앱 전체에 "MLB 공식 앱" 표현이 없다.
- [ ] 앱 전체에 "공식 기록" 표현이 없다.
- [ ] 앱 전체에 "Official MLB App" 표현이 없다.
- [ ] 앱 전체에 "AI 요약", "문자중계", "하이라이트" 표현이 없다.

---

## 스모크 테스트 비차단 후속 항목 (NB 시리즈)

> 아래 항목들은 Vercel Production 스모크 테스트에서 비차단(non-blocker)으로 분류된 후속 확인 사항입니다.
> `phase-15-internal-test-feedback` 상세 항목 참고.

| ID | 항목 | 상태 |
|----|------|------|
| NB-1 | BottomNav 터치 영역 min-h-[44px] 확인 | 해결됨 (Phase 15) |
| NB-2 | 선수 검색 input/버튼 min-h-[44px] 확인 | 해결됨 (Phase 15) |
| NB-3 | DataSourceNotice 경고 문구 단축 "(상업 API 미연동)" | 해결됨 (Phase 15) |
| NB-4 | AppHeader "← 뒤로" min-h-[44px] 확인 | 해결됨 (Phase 16.5) |
| NB-5 | StatCard `rounded-xl` 통일 | 해결됨 (Phase 16.5) |
| NB-6 | Section 타이틀 uppercase/tracking 제거 | 해결됨 (Phase 16.5) |
| NB-7 | 팀 헤더 중복 안내 문구 제거 | 해결됨 (Phase 16.5) |

---

## 관련 문서

- `docs/mvp-qa-checklist.md` — 전체 MVP QA 체크리스트 (14개 카테고리)
- `docs/deployment-checklist.md` — 배포 전 확인 목록
- `docs/release-candidate-checklist.md` — 릴리즈 후보 확인 목록

---

*이 문서는 Phase 16.5 기준으로 작성되었습니다.*
