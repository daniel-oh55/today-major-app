# Provider POC Runbook

실제 API 계약/승인 후 POC(Proof of Concept) 연동을 진행하기 위한 단계별 가이드입니다.

> **전제 조건:**
> - `docs/commercial-api-checklist.md`의 모든 항목을 계약 전 확인 완료
> - API 제공사에서 광고형 무료 앱 사용을 서면으로 승인
> - 실제 API Key 발급 완료

---

## 1단계: 환경변수 설정 (로컬 전용)

API Key는 `.env.local` 파일에만 저장합니다. **절대 커밋하지 마세요.**

```bash
# .env.local (git에 커밋하지 마세요 — .gitignore에 포함되어 있어야 합니다)
BASEBALL_DATA_PROVIDER=balldontlie_skeleton   # 실제 provider id로 교체
BASEBALL_API_KEY=your_real_api_key_here        # 실제 키 (절대 커밋 금지)
BASEBALL_API_BASE_URL=https://api.example.com  # 실제 base URL
BASEBALL_PROVIDER_RUNTIME_MODE=provider_enabled
BASEBALL_API_TIMEOUT_MS=5000
```

확인:
- `.gitignore`에 `.env.local`이 포함되어 있는지 확인하세요.
- `NEXT_PUBLIC_` 접두사 변수로 API Key를 설정하지 마세요.
- `git status`로 `.env.local`이 tracked되지 않는지 확인하세요.

---

## 2단계: Vercel 환경변수 (배포용)

Vercel 대시보드의 **Settings → Environment Variables**에서 설정합니다.
Vercel CLI를 사용한다면:

```bash
# 원칙 수준만 설명 — 실제 명령은 Vercel 공식 문서 참고
# vercel env add BASEBALL_API_KEY production
```

- `BASEBALL_API_KEY`는 **Production** 환경에만 추가합니다.
- Preview/Development 환경에는 추가하지 않거나 별도 테스트 키를 사용합니다.
- Vercel에서도 API Key는 서버 전용 변수로 유지합니다 (`NEXT_PUBLIC_` 금지).

---

## 3단계: Provider Adapter 구현 준비

`src/lib/providers/{provider_name}/{providerName}Provider.ts`를 구현합니다.

```typescript
import "server-only";
import type { BaseballDataProvider } from "../types";
import { PROVIDER_METADATA } from "../metadata";
import { wrapProviderCall } from "../wrapProviderCall";
import { AppDataError } from "../errors";

export class BallDontLieProvider implements BaseballDataProvider {
  readonly metadata = PROVIDER_METADATA.balldontlie_skeleton;

  constructor(private readonly apiKey: string, private readonly baseUrl: string) {}

  async getGamesByDate(params) {
    return wrapProviderCall(this.metadata.id, "games.today", async () => {
      // 실제 fetch 구현
      const raw = await this.fetchGames(params);
      return raw.map(mapBdlGame); // Phase 8에서 작성한 mapper 사용
    });
  }
}
```

**필수 준수 사항:**
- `import "server-only"` 반드시 포함
- 모든 외부 API 호출은 `wrapProviderCall`로 감쌉니다
- 응답은 반드시 mapper를 통해 내부 모델로 변환합니다
- 오류는 `AppDataError`로 정규화합니다
- raw API 응답을 UI나 service layer로 직접 전달하지 않습니다

---

## 4단계: Mapper Fixture Test 작성

실제 fetch 구현 전, 실제 API 응답 샘플을 fixture로 작성하고 mapper를 검증합니다.

```typescript
// src/lib/providers/{provider}/__fixtures__/real_sample.ts
// 실제 API 응답을 기반으로 작성 (로고 URL, 선수 사진 URL, 영상 URL 제외)
export const REAL_SAMPLE_GAME = {
  id: 12345,
  // ... 실제 응답 구조에 맞게 작성
};
```

```typescript
// src/lib/providers/{provider}/mappers.test.ts에 추가
assertType<AppGame>(mapBdlGame(REAL_SAMPLE_GAME));
```

그 후 `npx tsc --noEmit`으로 타입 검증을 실행합니다.

---

## 5단계: Cache Policy 연결

`wrapProviderCall`에 `WrapProviderCallOptions`를 전달하여 캐시 정책을 연결합니다.

```typescript
import { getCachePolicyForOperation } from "../operations";
import { CacheKeys } from "../../cache/cacheKeys";

async getGamesByDate({ dateKst }) {
  return wrapProviderCall(
    this.metadata.id,
    "games.today",
    async () => { /* fetch */ },
    false,
    {
      operationName: "games.today",
      cacheKey: CacheKeys.schedule(dateKst),
      cachePolicy: getCachePolicyForOperation("games.today"),
    }
  );
}
```

> **주의:** 현재 `InMemoryCacheService`는 Vercel/serverless 환경에서 운영 보장 캐시가 아닙니다.
> 프로덕션에서는 Redis(Upstash 등)로 교체가 필요합니다.

---

## 6단계: Safe Logger 사용

API 오류 로깅은 반드시 `safeLogger`를 사용합니다.

```typescript
import { logApiRouteError } from "@/lib/monitoring/safeLogger";

try {
  const data = await provider.getGamesByDate(params);
  return Response.json(data);
} catch (err) {
  logApiRouteError("games.today", err);
  return Response.json({ error: "데이터를 불러오지 못했습니다." }, { status: 500 });
}
```

- raw error object를 로그에 직접 출력하지 않습니다
- API Key, response body, request URL은 로그에 포함하지 않습니다

---

## 7단계: Provider Registry에 연결

`src/lib/config/env.ts`의 `RUNTIME_READY_PROVIDERS` 배열에 provider id를 추가합니다.
`src/lib/providers/index.ts`의 switch문에 새 case를 추가합니다.

```typescript
// env.ts
const RUNTIME_READY_PROVIDERS: ProviderId[] = ["dummy", "balldontlie_skeleton"];

// index.ts
import { BallDontLieProvider } from "./balldontlie/ballDontLieProvider";

switch (ENV.provider) {
  case "balldontlie_skeleton":
    _instance = new BallDontLieProvider(ENV.apiKey, ENV.apiBaseUrl);
    break;
  case "dummy":
  default:
    _instance = new DummyProvider();
    break;
}
```

---

## 8단계: Fallback UI 정책

POC 실패 시 UI는 아래 정책을 따릅니다.

| 상황 | UI |
|------|----|
| provider 오류 | `<ErrorState>` (일반화된 메시지) |
| 데이터 없음 | `<EmptyState>` |
| 타임아웃 | `<ErrorState>` |
| rate limit | `<ErrorState>` |

- `ErrorState`에 내부 오류 메시지, provider 이름, API Key 관련 정보를 절대 표시하지 않습니다.
- 오류 메시지는 `toSafeClientMessage(err.kind)`로 생성합니다.

---

## POC 성공 기준

아래 항목이 모두 동작해야 POC 완료로 판단합니다.

- [ ] 오늘 경기 목록 (홈 화면) — 실제 데이터로 표시
- [ ] 경기 상세 (경기센터) — 스코어, 이닝, 라인업, 박스스코어
- [ ] 선수 검색 — 이름 검색 결과 표시
- [ ] 선수 상세 — 기본 스탯 표시
- [ ] 팀 상세 — 기본 정보 표시
- [ ] API 호출량 로그 확인 (server 콘솔)
- [ ] 캐시 hit/miss 로그 확인
- [ ] 라이선스/출처 고지 문구 표시 (DataSourceNotice)
- [ ] 로고/선수 사진/영상 URL이 UI에 없음 확인
- [ ] "공식", "Official" 표현이 앱 내에 없음 확인
- [ ] API Key가 클라이언트 번들에 포함되지 않음 확인

---

## 중요 금지 사항

- API Key를 git에 커밋하지 않습니다
- API Key를 `NEXT_PUBLIC_` 변수로 노출하지 않습니다
- 로고, 선수 사진, 영상 URL을 앱 내에 사용하지 않습니다
- "공식", "Official", "공식 기록" 표현을 앱 내에 사용하지 않습니다
- MLB Stats API (api.mlb.com)는 어떤 경우에도 사용하지 않습니다
- 계약 확인 전 production 데이터 소스로 사용하지 않습니다

---

---

## Phase 16 연관 문서 (문의/검토 준비 단계)

> Phase 16은 실제 API 연동이 아니라 "문의/검토 준비 단계"입니다.
> POC Runbook은 문의·계약 완료 후 실제 연동 단계에서 사용합니다.
> 실제 API 연결은 계약·약관 확인 완료 후 별도 Phase에서 진행합니다.

- `docs/commercial-api-due-diligence.md` — 후보별 due diligence 항목 테이블
- `docs/provider-contact-log.md` — 문의 발송·회신 기록 로그
- `docs/api-poc-selection-criteria.md` — POC 후보 선정 기준 및 scoring template (이 문서 이전 단계)
- `docs/commercial-api-risk-register.md` — 상업 API 연동 리스크 등록부

---

*이 문서는 Phase 9 기준으로 작성되었습니다. 실제 API 연동 시 업데이트가 필요합니다.*
