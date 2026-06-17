# MLB 경기 정보 앱 (비공식)

한국 사용자를 위한 미국 프로야구(MLB) 경기/선수 스탯 웹앱/PWA입니다.

## ⚠️ 중요 공지

- **이 앱은 공식 MLB 앱이 아닙니다.** MLB, MLBAM, 각 구단과 무관한 비공식 서비스입니다.
- **MLB Stats API를 정식 데이터 소스로 사용하지 않습니다.** 상업용 데이터 API 계약 전 별도 확인이 필요합니다.
- 데이터 정확성을 보장하지 않습니다.

---

## 기술 스택

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- 모바일 화면 우선 (375px 기준)

## 아키텍처

### Provider Adapter 패턴

외부 API 응답은 반드시 Provider Adapter에서 내부 모델(`AppGame`, `AppPlayer`, `AppTeam` 등)로 변환됩니다. UI 컴포넌트는 내부 모델만 사용합니다.

```
UI 컴포넌트 → Service → BaseballDataProvider (interface)
                              ↓
                    DummyProvider / BallDontLieProvider / MySportsFeedsProvider
                              ↓
                    내부 모델 (AppGame, AppPlayer, ...)
```

### 데이터 흐름

```
화면 → Service (gameService / playerService / teamService)
             → getBaseballDataProvider()
             → 환경변수 BASEBALL_DATA_PROVIDER에 따라 Provider 선택
             → AppGame[] / AppPlayer[] / AppTeamDetail 반환
```

## 환경 변수

`.env.local` 파일을 생성하고 다음을 설정합니다. **API Key는 절대 프론트엔드에 노출하지 마세요.**

```bash
# .env.local (서버 전용 — 클라이언트에 노출되지 않음)
BASEBALL_DATA_PROVIDER=dummy     # dummy | balldontlie | mysportsfeeds
BASEBALL_API_KEY=                # 실제 API Key (서버 전용)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 상업용 API 계약 전 확인 항목

| 항목 | 내용 |
|------|------|
| 데이터 재판매 허용 여부 | 광고 수익 목적 앱에서 데이터 사용 가능 여부 확인 |
| 실시간 데이터 제공 범위 | Live 스코어, 이닝별 데이터 허용 범위 확인 |
| 크레딧/출처 표기 의무 | Provider 로고, 출처 표기 필요 여부 |
| 요청 한도 및 비용 | RPM/RPD 제한, 월 비용 구조 |
| 지역 제한 | 한국 IP에서 접근 허용 여부 |

## 구현 현황

### Phase 0 (현재)
- [x] Next.js + TypeScript + Tailwind CSS 기반 구조
- [x] 내부 표준 모델 (`AppGame`, `AppPlayer`, `AppTeam`, `AppGameCenter` 등)
- [x] Provider interface + DummyProvider
- [x] Service 계층 (`gameService`, `playerService`, `teamService`)
- [x] 광고 슬롯 placeholder (실제 SDK 미연동)
- [x] 홈 화면 (오늘 경기 목록)
- [x] 경기 상세 화면 (스코어보드, 이닝, 라인업, 박스스코어, 이벤트)
- [x] 선수 검색/상세 화면
- [x] 팀 상세 화면

### 미포함 항목 (의도적 제외)
- MLB/구단 로고, 선수 사진, 영상, 하이라이트 (권리 리스크)
- 한국어 문자중계 / AI 요약 기능
- 실제 광고 SDK 연동
- 실시간 데이터 (현재 Dummy 데이터만 동작)

## 광고 슬롯 정책

| Placement | 위치 | 형태 |
|-----------|------|------|
| `home_top_banner` | 홈 상단 | 배너 |
| `home_game_list_native` | 경기 목록 중간 | 네이티브 |
| `gamecenter_bottom_banner` | 경기 센터 하단 | 배너 |
| `player_detail_mid_native` | 선수 상세 중간 | 네이티브 |
| `team_detail_mid_native` | 팀 상세 중간 | 네이티브 |
| `search_result_inline` | 검색 결과 인라인 | 네이티브 |
| `share_complete_interstitial` | 공유 완료 후 | 전면 |
| `favorite_home_inline` | 즐겨찾기 홈 인라인 | 네이티브 |

> 경기 센터에서는 전면 광고를 사용하지 않습니다.

## 개발 시작

```bash
npm install
npm run dev
```

빌드 및 lint:

```bash
npm run lint
npm run build
```
