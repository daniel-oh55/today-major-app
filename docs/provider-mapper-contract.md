# Provider Mapper Contract

## 원칙

이 문서는 외부 API 응답을 내부 모델로 변환하는 mapper의 불변 계약을 정의합니다.
모든 provider adapter가 이 계약을 준수해야 합니다.

---

## 1. 외부 API 응답을 UI에서 직접 사용하지 않는다

```
외부 API → Provider → Mapper → 내부 모델 (AppGame, AppPlayer, ...) → UI
                      ↑
                      외부 타입은 여기까지만
```

- UI 컴포넌트(`src/components/`)는 내부 모델만 props로 받습니다.
- `BdlGame`, `MsfGameSchedule` 등 provider별 외부 타입은 `src/lib/providers/{provider}/types.ts`에만 존재합니다.
- 외부 타입을 service layer나 UI로 직접 전달하면 안 됩니다.

## 2. 모든 provider는 내부 표준 모델로 변환해야 한다

| 외부 데이터 | 내부 모델 |
|------------|----------|
| 경기 정보 | `AppGame` |
| 경기 상세 | `AppGameCenter` |
| 선수 정보 | `AppPlayerDetail` |
| 팀 정보 | `AppTeamDetail` |
| 박스스코어 행 | `AppBoxScorePlayer` |
| 이닝 스코어 | `AppLineScoreInning` |

내부 모델 정의: `src/lib/models/`

## 3. mapper는 null/undefined/누락 필드를 안전하게 처리해야 한다

```typescript
// 권장
homeScore: raw.home_score ?? 0,
venue:     raw.venue ?? undefined,

// 금지
homeScore: raw.home_score!,   // non-null assertion
```

- 외부 API는 언제든 필드를 누락할 수 있습니다.
- 필수 필드 누락 시 `AppDataError("invalid_response", ...)` throw.
- 선택 필드는 `?? undefined` 또는 `?? 기본값`으로 처리.

## 4. 날짜/시간은 KST 표시 기준으로 변환 가능한 형태를 유지한다

- 경기 시간(`gameTimeKst`)은 실제 연동 시 KST로 변환합니다.
- mapper stub에서는 `"TBD"` 또는 변환 전 원문을 유지하며, 변환 로직은 별도 유틸리티로 분리합니다.
- 날짜(`gameDate`)는 `"YYYY-MM-DD"` 형식을 유지합니다.

## 5. 팀 로고/선수 사진/영상 URL은 내부 모델에 포함하지 않는다

```typescript
// 금지: 내부 모델에 이미지/영상 URL 포함
interface AppTeam {
  logoUrl: string;       // ❌
  bannerImageUrl: string; // ❌
}

// 허용: 텍스트 기반 식별자만 사용
interface AppTeam {
  name: string;          // ✓
  abbreviation: string;  // ✓
}
```

- MLB/구단 로고, 선수 사진, 영상, 하이라이트는 권리 리스크 영역입니다.
- 내부 모델 및 mapper에 이미지/영상 URL을 포함하지 마세요.

## 6. provider별 고유 필드는 UI로 직접 넘기지 않는다

- `providerId`, `externalId`는 `AppProviderRef`에만 존재합니다.
- UI 컴포넌트는 `AppProviderRef`를 직접 렌더링하지 않습니다.
- provider 고유 메타데이터(예: API 버전, raw status code)는 mapper 내부에서 소비합니다.

## 7. mapper 실패 시 AppDataError로 정규화한다

```typescript
import { AppDataError } from "../errors";

export function mapBdlGame(raw: BdlGame): AppGame {
  if (!raw.id || !raw.home_team) {
    throw new AppDataError(
      "invalid_response",
      "balldontlie_skeleton",
      "mapBdlGame: missing required fields"
    );
  }
  // ...
}
```

- 일반 `Error`를 throw하지 말고 `AppDataError`를 사용하세요.
- `AppDataError`는 service layer에서 `toSafeClientMessage()`로 사용자 메시지로 변환됩니다.
- raw error 내용, API Key, response body는 클라이언트로 전달하지 않습니다.

## 8. 컴파일 타임 타입 검증

각 provider의 mapper는 `mappers.test.ts` (type-level) 파일을 함께 유지합니다.

```typescript
// mappers.test.ts — 런타임 테스트 프레임워크 불필요
function assertType<T>(_: T): void {}

assertType<AppGame>(mapBdlGame(FIXTURE_BDL_GAME));
assertType<AppPlayerDetail>(mapBdlPlayer(FIXTURE_BDL_PLAYER));
```

`npx tsc --noEmit` 실행 시 mapper 리턴 타입이 내부 모델과 불일치하면 컴파일 에러가 발생합니다.

---

## 파일 구조 패턴

```
src/lib/providers/{provider}/
  types.ts          — 외부 API 응답 타입 (fictional approximation)
  mappers.ts        — 변환 함수 (external → AppModel)
  mappers.test.ts   — compile-time 타입 검증 (no runtime runner)
  __fixtures__/
    index.ts        — 테스트용 fixture 데이터 (fictional, not real API response)
  {provider}Provider.ts  — BaseballDataProvider 구현체
```

---

*이 문서는 Phase 8 기준으로 작성되었습니다. 실제 API 연동 시 타입과 변환 로직을 업데이트하세요.*
