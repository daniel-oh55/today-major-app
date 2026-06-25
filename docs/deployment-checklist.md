# Vercel 배포 체크리스트

> Vercel 배포 전·후 점검 목록입니다.
> 현재 MVP 단계 기준 (더미 데이터, 광고 SDK 미연동, 상업 API 미연동)

---

## 배포 전: 로컬 검증

```bash
# 1. 코드 품질 검증
npm run lint
npx tsc --noEmit

# 2. 프로덕션 빌드 로컬 확인
npm run build
```

- [ ] lint 0 errors
- [ ] tsc 0 errors
- [ ] build 성공 (라우트 수 확인)
- [ ] `.env.local`이 git에 커밋되지 않음 (`git status` 확인)

---

## Vercel 환경변수 설정

Vercel 대시보드 → Settings → Environment Variables

### 필수 설정

| 변수명 | 값 | 환경 |
|--------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production |
| `BASEBALL_DATA_PROVIDER` | `dummy` | All (현재) |
| `BASEBALL_PROVIDER_RUNTIME_MODE` | `safe_dummy_fallback` | All (현재) |

### 주의 사항

- `BASEBALL_API_KEY`는 현재 설정하지 않습니다 (더미 단계).
- 실제 API Key 발급 후에는 `Production` 환경에만 추가합니다.
- `NEXT_PUBLIC_` 접두사 변수에 API Key를 절대 넣지 않습니다.
- Preview 환경에 실제 API Key를 노출하지 않습니다.

```bash
# Vercel CLI 예시 (원칙 수준 — 실제 명령은 Vercel 공식 문서 참고)
# vercel env add NEXT_PUBLIC_SITE_URL production
# vercel env add BASEBALL_PROVIDER_RUNTIME_MODE production
```

---

## 배포 후: 기능 검증

> 배포 직후 전체 기능 확인은 **[docs/deployment-smoke-test.md](deployment-smoke-test.md)** 체크리스트를 실행하고 결과를 **[docs/smoke-test-results.md](smoke-test-results.md)** 에 기록하세요.

### 라우팅

- [ ] `https://your-domain/` — 홈 정상
- [ ] `https://your-domain/players` — 선수 검색 정상
- [ ] `https://your-domain/favorites` — 즐겨찾기 정상
- [ ] `https://your-domain/privacy` — 개인정보처리방침 정상
- [ ] `https://your-domain/terms` — 이용약관 정상
- [ ] `https://your-domain/data-notice` — 데이터 안내 정상
- [ ] `https://your-domain/players/unknown-id` — 404 NotFound 정상
- [ ] `https://your-domain/games/unknown-id` — 404 NotFound 정상

### PWA / manifest

- [ ] `https://your-domain/manifest.json` — 200 OK, 유효한 JSON
- [ ] `https://your-domain/icons/icon-192.png` — 200 OK
- [ ] `https://your-domain/icons/icon-512.png` — 200 OK
- [ ] Chrome DevTools → Application → Manifest — 오류 없음
- [ ] "홈 화면에 추가" (iOS/Android) — "오늘의 메이저" 아이콘 표시

### 보안

- [ ] 서버 응답 헤더에 API Key 없음
- [ ] 클라이언트 번들에 `BASEBALL_API_KEY` 없음 (DevTools 검색)
- [ ] `robots: noindex` 적용 확인 (robots.txt 또는 meta)

---

## 현재 미연동 항목 (의도적)

아래 항목은 계약/검토 완료 후 별도로 진행합니다.

| 항목 | 상태 | 참고 문서 |
|------|------|----------|
| 상업 API 연동 | 미연동 | `docs/provider-poc-runbook.md` |
| 광고 SDK 연동 | 미연동 | `docs/ads-policy.md` |
| 개인정보처리방침 확정 | 임시 안내 | `/privacy` (임시) |
| 이용약관 확정 | 임시 안내 | `/terms` (임시) |
| PWA 아이콘 최종 디자인 | 자체 placeholder | `public/icons/` |

---

## 실제 API 연동 시 추가 배포 절차

실제 상업 API 계약 승인 후:

1. `docs/commercial-api-checklist.md` 전체 항목 확인
2. `.env.local`에 `BASEBALL_API_KEY` 설정 (로컬 테스트)
3. `BASEBALL_PROVIDER_RUNTIME_MODE=provider_enabled` 설정
4. 로컬에서 lint / tsc / build 검증
5. Vercel Production 환경변수에만 `BASEBALL_API_KEY` 추가
6. 배포 후 API 호출량·캐시 hit/miss 로그 확인
7. `docs/mvp-qa-checklist.md` 재검증

---

*이 문서는 Phase 12 기준으로 작성되었습니다. 실제 API 연동 시 업데이트하세요.*
