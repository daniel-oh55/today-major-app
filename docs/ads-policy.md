# 광고 정책 문서

## 개요

이 앱은 광고형 상업 앱으로 설계되어 있습니다. 현재(Phase 6)는 실제 광고 SDK가 연동되어 있지 않으며, 모든 광고 위치는 placeholder로 표시됩니다.

---

## 광고 슬롯 관리 원칙

- 모든 광고는 `AdSlot` 컴포넌트와 `AdPlacement` 타입으로 관리됩니다.
- 광고 위치(placement)는 `src/lib/models/ad.ts`에 타입으로 정의됩니다.
- 광고 슬롯 설정은 `src/lib/config/ads.ts`의 `AD_SLOT_CONFIGS`에서 관리됩니다.
- 화면별 허용 광고는 `AD_DISPLAY_POLICY`에 명시됩니다.
- 실제 SDK 연동 시 `src/lib/ads/providers/` 아래 새 provider 파일만 추가하면 됩니다.

---

## 지원 Placement 목록

| Placement | 화면 | 형태 | 허용 여부 |
|-----------|------|------|-----------|
| `home_top_banner` | 홈 상단 | banner | ✓ |
| `home_game_list_native` | 홈 경기 목록 중간 | native | ✓ |
| `gamecenter_bottom_banner` | 경기센터 하단 | banner | ✓ |
| `player_detail_mid_native` | 선수 상세 중간 | native | ✓ |
| `team_detail_mid_native` | 팀 상세 중간 | native | ✓ |
| `share_complete_interstitial` | 공유 완료 후 | interstitial | 인라인만 ✓ |
| `search_result_inline` | 검색 결과 인라인 | native | ✓ |
| `favorite_home_inline` | 즐겨찾기·홈 인라인 | native | ✓ |

---

## 화면별 광고 정책

### 홈 화면
- 허용: `home_top_banner`, `home_game_list_native`
- 전면광고(interstitial): 금지

### 경기센터 (가장 엄격)
- 허용: `gamecenter_bottom_banner` **1개만**
- 중간 네이티브 삽입: **금지**
- 전면광고(interstitial): **금지**
- 이유: 핵심 경기 정보(스코어, 이닝, 라인업)의 가독성 보호

### 선수 상세
- 허용: `player_detail_mid_native`

### 팀 상세
- 허용: `team_detail_mid_native`

### 검색 결과
- 허용: `search_result_inline`

### 즐겨찾기
- 허용: `favorite_home_inline`

### 공유 완료 후
- 허용: `share_complete_interstitial` (인라인 placeholder)
- **자동 전면광고(화면 덮기) 금지** — 공유 완료 후 콘텐츠 아래 인라인으로만 표시

---

## 현재 구현 상태

- 실제 광고 SDK: **미연동**
- 런타임 Provider: `placeholderAdProvider` (placeholder 표시만 담당)
- 개발 환경: placement ID가 표시됨 (`[광고 슬롯] home_top_banner` 등)
- 프로덕션: placeholder 영역 표시 (SDK 연동 시 실제 광고로 대체)

---

## 광고 SDK 연동 전 확인 필요 항목

실제 광고 SDK를 연동하기 전에 다음 항목을 반드시 확인해야 합니다.

| 항목 | 내용 |
|------|------|
| 광고 플랫폼 약관 | AdSense, GAM, AdMob 등 각 플랫폼의 콘텐츠 정책 준수 여부 확인 |
| 앱/웹/PWA 광고 허용 범위 | PWA(웹앱)에서 모바일 광고 SDK 사용 가능 여부 확인 |
| 개인정보·쿠키·동의 요건 | GDPR, CCPA, 국내 개인정보보호법 대응 — 동의 배너 필요 여부 |
| 아동 대상 여부 | COPPA 적용 가능 여부, 아동 대상 콘텐츠 광고 제한 규정 |
| 스포츠 데이터 제공사와 광고 수익화 동시 사용 가능 여부 | 데이터 API 계약과 광고 수익화 동시 허용 여부 확인 |
| MLB/구단 IP와의 관계 | 비공식 앱 기준 광고 수익화 허용 범위 |

---

## 보안 원칙

- 광고 관련 ID, API Key, Publisher ID는 **프론트엔드(클라이언트)에 절대 하드코딩하지 않습니다.**
- 필요한 경우 `.env.local`(서버 환경변수)에만 보관합니다.
- `NEXT_PUBLIC_` 접두사 변수는 클라이언트에 노출됩니다 — 비공개 키에 절대 사용하지 마세요.
- 외부 광고 SDK `<script>` 직접 삽입 금지 — 반드시 AdProvider 인터페이스를 통해 처리합니다.

---

## AdProvider 교체 방법

1. `src/lib/ads/providers/` 아래 새 파일 생성 (예: `adsenseProvider.ts`)
2. `AdProvider` 인터페이스 구현 (`src/lib/ads/types.ts` 참고)
3. `src/lib/ads/index.ts`의 `getAdProvider()`에서 새 provider 반환
4. 환경변수 `NEXT_PUBLIC_AD_PROVIDER`로 분기 (선택)

---

*이 문서는 Phase 6 기준으로 작성되었습니다. SDK 연동 시 업데이트가 필요합니다.*
