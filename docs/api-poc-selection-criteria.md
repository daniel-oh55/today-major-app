# API POC 후보 선정 기준

> **작성 기준:** Phase 16 — 실제 문의 전 준비 단계
>
> **주의:**
> - 이 문서는 POC 후보를 선정하기 위한 기준을 정의합니다.
> - 실제 점수는 각 업체와의 문의·회신 후에만 매깁니다. 현재는 scoring template만 작성합니다.
> - 가격·기능·약관을 단정하지 않습니다.
> - "사용 가능"이라고 확정 표현하지 않습니다.
>
> **연관 문서:**
> - Due Diligence: `docs/commercial-api-due-diligence.md`
> - 문의 로그: `docs/provider-contact-log.md`
> - 리스크 등록부: `docs/commercial-api-risk-register.md`
> - 계약 전 체크리스트: `docs/commercial-api-checklist.md`
> - POC Runbook: `docs/provider-poc-runbook.md`

---

## 1. 선정 원칙

### 최우선 원칙 (Pass/Fail)

아래 항목 중 하나라도 "불가" 또는 "미확인" 상태이면 해당 업체를 POC 후보로 진행하지 않습니다.

| 원칙 | 기준 | Pass 조건 |
|------|------|----------|
| **광고형 무료 앱 허용** | free mobile app monetized with ads 사용 명시적 허용 | 서면 또는 약관상 명시 확인 |
| **MVP 기능 최소 충족** | 오늘 경기 목록 / 경기센터 / 선수 검색 / 선수 상세 구현 가능 여부 | 4개 기능 모두 데이터 제공 확인 |
| **API Key 보안 준수** | 서버 전용 API Key 사용 가능 (NEXT_PUBLIC_ 노출 금지) | 서버-to-서버 호출 허용 확인 |
| **캐싱 최소 허용** | 서버 캐시(in-memory 또는 Redis) 사용 허용 | 캐싱 정책 확인 |

### 우선순위 기준

Pass/Fail 통과 후 아래 기준으로 우선순위를 결정합니다.

1. 광고형 무료 앱 허용 여부 (최우선)
2. MVP 초기 단계에서 감당 가능한 월 비용 수준
3. 오늘 경기 목록 / 경기센터 / 선수 검색 / 선수 상세 최소 구현 가능 여부
4. API 호출량 제한이 MVP traffic에 충분한지
5. 캐싱이 허용되는지 (서버 캐시 가능 여부)
6. 데이터 출처 고지 문구가 앱 UX에 적용 가능한지
7. 공식 앱처럼 보이지 않게 표시 가능한지 (비공식 팬앱 고지 가능 여부)
8. 장애·제한 발생 시 dummy fallback 또는 fallback UI가 가능한지
9. Provider Adapter 구조로 연결 가능한지 (`BaseballDataProvider` interface 구현 가능 여부)
10. 계약 해지 후 데이터 사용 제한이 명확한지

---

## 2. Scoring Template

> **현재 점수는 모두 TBD입니다.** 문의·회신 후에 점수를 매깁니다.
>
> 점수 기준: 0 (불가/미확인) / 1 (부분 충족) / 2 (충분 충족) / N/A (해당 없음)

### Scoring 항목 정의

| 항목 | 코드 | 설명 | 가중치 |
|------|------|------|--------|
| 상업 이용 적합성 | `commercial_fit` | 광고형 무료 앱 명시 허용 여부 | **x3** (최우선) |
| MVP 기능 적합성 | `mvp_feature_fit` | 경기 목록/경기센터/선수 검색/선수 상세 4개 기능 모두 제공 여부 | x2 |
| 비용 적합성 | `cost_fit` | MVP 초기 단계 감당 가능한 월 비용 | x2 |
| 캐싱 적합성 | `cache_fit` | 서버 캐시 허용 범위 (in-memory / Redis 등) | x1 |
| 연동 복잡도 | `integration_complexity` | Provider Adapter 구현 난이도 (낮을수록 좋음) | x1 |
| 법적/출처 명확성 | `legal_attribution_clarity` | 출처 고지 의무·공식 표시 금지 조건이 앱 UX에 적용 가능한지 | x2 |
| 규모 확장 리스크 | `scale_risk` | Traffic 증가 시 호출량·비용 급등 리스크 | x1 |

### Scoring 템플릿 (미입력)

| 업체 | `commercial_fit` (x3) | `mvp_feature_fit` (x2) | `cost_fit` (x2) | `cache_fit` (x1) | `integration_complexity` (x1) | `legal_attribution_clarity` (x2) | `scale_risk` (x1) | 가중 합계 |
|------|----------------------|------------------------|-----------------|------------------|-------------------------------|-----------------------------------|-------------------|----------|
| BALLDONTLIE | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| MySportsFeeds | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| DataFeeds by Rolling Insights | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| SportsDataIO | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Sportradar | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

> 가중 합계 최대값: (2×3) + (2×2) + (2×2) + (2×1) + (2×1) + (2×2) + (2×1) = 6+4+4+2+2+4+2 = **24점**
>
> **주의:** 점수는 상대적 비교용입니다. `commercial_fit` 점수가 0이면 나머지와 무관하게 POC 후보에서 제외합니다.

---

## 3. MVP 최소 기능 요건

POC 후보가 되려면 아래 기능을 모두 제공해야 합니다.

| 기능 | 필요 API 데이터 | 설명 |
|------|----------------|------|
| 오늘 경기 목록 | 경기 일정 + 경기 상태 + 팀 정보 + 스코어 | 홈 화면 핵심 기능 |
| 경기센터 | 스코어보드 + 라인업 + 박스스코어 | `/games/[gameId]` |
| 선수 검색 | 이름 기반 검색 + 기본 정보 | `/players` 검색 |
| 선수 상세 | 시즌 스탯 (타자: AVG/OPS/HR/RBI, 투수: ERA/WHIP/SO/W-L) | `/players/[playerId]` |

---

## 4. 기술 적합성 요건

| 요건 | 설명 | 확인 방법 |
|------|------|----------|
| Provider Adapter 구현 가능 | `BaseballDataProvider` interface를 구현할 수 있어야 함 | API response → AppGame/AppPlayer/AppTeam 매핑 가능 여부 |
| 서버-to-서버 호출 | Next.js API Route / Server Component에서 호출 가능 | CORS 정책 확인 |
| JSON 응답 | API가 JSON 형식으로 응답하는지 | REST API 여부 확인 |
| HTTPS | HTTPS endpoint 제공 여부 | Endpoint 확인 |
| 한국 IP 접근 | 한국 서버(Vercel 한국 리전 또는 인근)에서 접근 허용 여부 | IP 제한 여부 확인 |

---

## 5. 계약 해지 조건 확인 항목

계약 해지 후 데이터 사용 제한이 명확해야 합니다.

- [ ] 계약 해지 후 캐시된 데이터 삭제 의무 여부
- [ ] 계약 해지 후 앱 서비스 중단 의무 여부
- [ ] 계약 기간 중 수집한 데이터의 계약 종료 후 처리 방식
- [ ] 계약 해지 예고 기간

---

## 6. POC 진행 절차

POC 후보 선정 후 실제 연동을 진행하기 위한 절차는 `docs/provider-poc-runbook.md`를 참고하세요.

```
[Phase 16] Due Diligence 준비
    ↓
[문의 발송] docs/provider-contact-template.md 기반
    ↓
[회신 수령] docs/provider-contact-log.md 기록
    ↓
[scoring 입력] 이 문서 scoring template 업데이트
    ↓
[POC 후보 확정] commercial_fit > 0, Pass/Fail 통과
    ↓
[POC 연동] docs/provider-poc-runbook.md
```

---

*이 문서는 Phase 16 기준으로 작성되었습니다. 문의 회신 후 scoring template을 채우세요.*
