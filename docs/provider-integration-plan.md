# Provider 연동 계획

## 현재 상태 (Phase 9/10)

- 런타임 Provider: `DummyProvider` (개발용 더미 데이터)
- 등록된 skeleton: `BallDontLieProvider`, `MySportsFeedsProvider`, `SportsDataIOProvider`, `SportradarProvider`, `RollingInsightsProvider`
- BallDontLie + MySportsFeeds: 가상 external types + mapper skeleton + fixture 구비
- Provider runtime gate (`BASEBALL_PROVIDER_RUNTIME_MODE`) 및 timeout env (`BASEBALL_API_TIMEOUT_MS`) 추가 (Phase 9)
- `RUNTIME_READY_PROVIDERS`는 `src/lib/providers/metadata.ts` 단일 소스로 관리 (Phase 10)
- 실제 외부 API 호출: 없음

> **Phase 9/10은 POC 준비 및 MVP QA 단계입니다.** 실제 API 연결은 계약/약관 확인 후 진행하세요.
> `docs/api-provider-evaluation.md` 참고. `docs/commercial-api-checklist.md`의 모든 항목 확인 필수.
> 문의 템플릿은 `docs/provider-contact-template.md`, POC 절차는 `docs/provider-poc-runbook.md`를 참고하세요.

---

## 실제 API 연결 전 필요한 단계

```
계약 확인 → .env.local 설정 → Provider Adapter 구현 → Mapper 작성 → 통합 테스트
```

### 1단계: 계약 확인

`docs/commercial-api-checklist.md`의 모든 항목을 확인합니다.

- 광고 수익화 앱에서의 사용 허용 여부
- 데이터 범위 (라인업, 박스스코어, 실시간 스코어 등)
- 캐싱/저장/재배포 허용 범위
- 출처 고지 의무

### 2단계: 환경변수 설정

`.env.local`에 다음을 추가합니다. **절대 프론트엔드에 노출하지 마세요.**

```bash
# 서버 전용 (클라이언트 노출 금지)
BASEBALL_DATA_PROVIDER=balldontlie_skeleton  # 선택한 provider id
BASEBALL_API_KEY=your_api_key_here
BASEBALL_API_BASE_URL=https://api.example.com
```

`src/lib/providers/metadata.ts`의 `ProviderId` 타입에 해당 id가 있는지 확인합니다.
`src/lib/providers/metadata.ts`의 `RUNTIME_READY_PROVIDERS` 배열에 해당 id를 추가합니다. (단일 소스 — env.ts와 registry.ts는 이 배열을 import합니다.)

### 3단계: Provider Adapter 작성

`src/lib/providers/{provider_name}/{providerName}Provider.ts`를 구현합니다.

```typescript
// 예시: BallDontLieProvider 구현
import "server-only";
import type { BaseballDataProvider } from "../types";
import { PROVIDER_METADATA } from "../metadata";
import { wrapProviderCall } from "../wrapProviderCall";
import { AppDataError } from "../errors";
// ... 기타 import

export class BallDontLieProvider implements BaseballDataProvider {
  readonly metadata = PROVIDER_METADATA.balldontlie_skeleton;

  constructor(private readonly apiKey: string, private readonly baseUrl: string) {}

  async getGamesByDate(params) {
    return wrapProviderCall(this.metadata.id, "getGamesByDate", async () => {
      const raw = await this.fetchGames(params);
      return mapGames(raw); // mapper 함수 사용
    });
  }
  // ...
}
```

### 4단계: Mapper 작성

`src/lib/providers/{provider_name}/mappers.ts`에 외부 API 응답 → 내부 모델 변환 함수를 작성합니다.

**원칙:**
- UI 컴포넌트는 내부 모델(`AppGame`, `AppPlayer`, `AppTeam` 등)만 사용합니다.
- 외부 API 응답 타입은 mapper 내부에만 정의합니다.
- mapper에서 예외가 발생하면 `AppDataError("invalid_response", ...)` 로 변환합니다.

```typescript
// 예시 mapper 패턴
import type { AppGame } from "../../models/game";
import { AppDataError } from "../errors";

interface RawGame {
  id: number;
  home_team: { name: string; abbrev: string };
  // ...
}

export function mapGame(raw: RawGame): AppGame {
  if (!raw.id || !raw.home_team) {
    throw new AppDataError("invalid_response", "balldontlie_skeleton", "Unexpected game shape");
  }
  return {
    id: String(raw.id),
    homeTeam: raw.home_team.abbrev,
    // ...
  };
}
```

### 5단계: index.ts에 연결

`src/lib/providers/index.ts`의 switch문에 새 case를 추가합니다.

```typescript
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

## 캐시 적용 방식

실제 API 연결 시 `src/lib/cache/` 구조를 사용합니다.

```typescript
import { getCacheService } from "@/lib/cache/cacheService";
import { CacheKeys } from "@/lib/cache/cacheKeys";
import { CACHE_POLICIES } from "@/lib/cache/cachePolicy";

// 예시: schedule 캐싱
const cache = getCacheService();
const key = CacheKeys.schedule(dateKst);
const cached = await cache.get<AppGame[]>(key);
if (cached) return cached.data;

const data = await provider.getGamesByDate({ dateKst });
await cache.set(key, data, CACHE_POLICIES.schedule, "schedule");
return data;
```

> **주의:** 현재 `InMemoryCacheService`는 Vercel/serverless 환경에서 운영 보장 캐시가 아닙니다.
> 프로덕션에서는 Redis(Upstash 등)로 교체가 필요합니다.

---

## Rate Limit 대응 방식

Provider 호출이 rate limit에 걸릴 경우:

1. `AppDataError("rate_limited", providerId)` throw
2. Service layer에서 catch → `toSafeClientMessage()` 로 사용자 메시지 변환
3. 사용자에게는 "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요." 표시

raw API 에러 메시지는 절대 클라이언트에 전달하지 않습니다.

```typescript
// service layer 예시
import { AppDataError, toSafeClientMessage } from "@/lib/services/errors";

try {
  return await provider.getGamesByDate(params);
} catch (err) {
  if (err instanceof AppDataError) {
    // 서버 로그에만 기록
    console.error(`[gameService] ${err.kind} from ${err.providerId}`);
    // 사용자용 일반화 메시지
    throw new Error(toSafeClientMessage(err.kind));
  }
  throw new Error("데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
}
```

---

## Fallback UI 정책

| 상황 | UI |
|------|----|
| 데이터 없음 | `<EmptyState>` |
| 로드 에러 | `<ErrorState>` (일반화된 메시지) |
| 네트워크 타임아웃 | `<ErrorState>` |

`ErrorState`에는 내부 에러 메시지, provider 이름, API Key 관련 정보를 절대 표시하지 않습니다.

---

## API Key 보안 원칙

- API Key는 `BASEBALL_API_KEY` 환경변수에만 보관합니다.
- `NEXT_PUBLIC_` 접두사 변수로 API Key를 노출하지 않습니다.
- provider 코드는 `server-only` import로 서버 경계를 강제합니다.
- API Key, raw response 전체는 로그에 남기지 않습니다.

---

## 계약 확인 전 금지 사항

- 실제 외부 API를 프로덕션 데이터 소스로 사용 금지
- 계약 약관 미검토 상태에서 API 호출 코드 배포 금지
- MLB Stats API를 어떤 경우에도 사용 금지

---

*이 문서는 Phase 9/10 기준으로 작성되었습니다. 실제 API 연동 시 업데이트가 필요합니다.*
