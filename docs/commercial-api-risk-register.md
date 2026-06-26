# 상업 API 리스크 등록부

> **작성 기준:** Phase 16 — 실제 문의 전 준비 단계
>
> **주의:** 이 문서는 식별된 리스크를 정리하기 위한 것입니다.
> 가격·기능·약관을 단정하지 않습니다. 각 리스크의 실제 발생 여부는 문의·계약 후 업데이트합니다.
>
> **연관 문서:**
> - Due Diligence: `docs/commercial-api-due-diligence.md`
> - 문의 로그: `docs/provider-contact-log.md`
> - POC 선정 기준: `docs/api-poc-selection-criteria.md`
> - 계약 전 체크리스트: `docs/commercial-api-checklist.md`

---

## Severity / Likelihood 기준

| 값 | Severity | Likelihood |
|----|----------|------------|
| high | 앱 서비스 중단 또는 법적 문제 | 가능성 높음 (문의 전 현재 단계에서 미확인) |
| medium | 기능 제한 또는 비용 증가 | 가능성 중간 |
| low | UX 불편 또는 경미한 제한 | 가능성 낮음 |

---

## 리스크 등록부

### R-01: 광고형 앱 사용 불허

| 항목 | 내용 |
|------|------|
| **리스크 설명** | API 제공사 약관이 광고형 무료 앱에서의 사용을 허용하지 않을 수 있음 |
| **severity** | high |
| **likelihood** | high (문의 전 미확인 — 모든 후보가 해당) |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 문의 최우선 항목으로 설정. `commercial_fit` 점수 0이면 해당 업체 POC 제외. 복수 업체에 동시 문의하여 대안 확보 |
| **status** | 미확인 — 문의 예정 |

---

### R-02: API 약관상 데이터 재표시 제한

| 항목 | 내용 |
|------|------|
| **리스크 설명** | API 약관이 데이터를 다수 사용자에게 동시에 표시(re-display)하거나 DB에 저장하는 것을 제한할 수 있음 |
| **severity** | high |
| **likelihood** | medium (제공사별 조건 상이) |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 문의 시 "다수 동시 사용자에게 표시 가능 여부" 명시적으로 확인. 저장/재배포 범위를 서면으로 확인 |
| **status** | 미확인 — 문의 예정 |

---

### R-03: 캐싱 제한

| 항목 | 내용 |
|------|------|
| **리스크 설명** | API 약관이 서버 캐시(in-memory, Redis 등)를 금지하거나 허용 시간을 매우 짧게 제한할 수 있음 |
| **severity** | medium |
| **likelihood** | medium |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 문의 시 서버 캐시 허용 시간 및 방식 확인. `CachePolicy`(`LIVE` / `DAILY` / `SEASON` 등) 구현 시 약관 범위 내로 설정 |
| **status** | 미확인 — 문의 예정 |

---

### R-04: 호출량 초과 비용

| 항목 | 내용 |
|------|------|
| **리스크 설명** | API 호출량 초과 시 예상보다 높은 과금이 발생할 수 있음. 특히 경기 진행 중 live traffic 급등 시 |
| **severity** | medium |
| **likelihood** | medium |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 문의 시 Rate limit 및 초과 과금 방식 확인. 캐싱으로 API 호출 최소화. `apiUsage.ts` 모니터링 활용. 호출량 알림 설정 예정 |
| **status** | 미확인 — 문의 예정 |

---

### R-05: 데이터 출처 고지 문구 미준수

| 항목 | 내용 |
|------|------|
| **리스크 설명** | API 제공사가 특정 로고·브랜드명·출처 문구 표시를 의무화할 경우, 앱 UX에 적용 불가능한 형식일 수 있음 |
| **severity** | medium |
| **likelihood** | medium |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 문의 시 출처 고지 의무 형식을 구체적으로 확인. `DataSourceNotice`에 Provider 이름 표시하는 방식은 이미 구현되어 있음. 로고 표시 의무는 별도 확인 필요 |
| **status** | 미확인 — 문의 예정 |

---

### R-06: 공식 MLB 데이터로 오인될 위험

| 항목 | 내용 |
|------|------|
| **리스크 설명** | "공식", "Official", "공식 기록" 등 표현을 사용하면 MLB 공식 앱처럼 오인될 수 있으며, 이는 API 약관 위반 및 권리 침해 문제로 이어질 수 있음 |
| **severity** | high |
| **likelihood** | low (현재 앱에서 해당 표현 없음 — 기존 원칙 준수 중) |
| **owner** | 프로젝트 담당자 |
| **mitigation** | "비공식 팬앱" 고지 및 DataSourceNotice 유지. "공식", "Official", "공식 기록" 표현 코드 레벨에서 금지. `docs/release-candidate-checklist.md` 섹션 11 준수 |
| **status** | 관리 중 — 기존 원칙 적용 |

---

### R-07: 로고·선수 사진·영상 권리 미포함

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 스포츠 데이터 API 계약에 MLB/구단 로고, 선수 사진, 영상 사용 권한이 포함되지 않는 경우가 많음. API 계약만으로 이미지/영상을 사용하면 별도 권리 침해가 됨 |
| **severity** | high |
| **likelihood** | low (현재 앱에서 로고/사진/영상 없음 — 기존 원칙 준수 중) |
| **owner** | 프로젝트 담당자 |
| **mitigation** | MVP에서 MLB/구단 로고, 선수 사진, 영상, 하이라이트를 사용하지 않는다는 원칙 유지. 이 원칙은 API 계약 조건과 무관하게 변경하지 않음 |
| **status** | 관리 중 — 기존 원칙 적용 |

---

### R-08: 실시간 데이터 지연

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 상업 API의 실시간 스코어 데이터가 실제 경기보다 수 분 지연될 수 있음. 사용자가 지연을 인지하지 못하면 오해가 발생할 수 있음 |
| **severity** | low |
| **likelihood** | high (대부분의 저가 플랜에서 지연 발생) |
| **owner** | 프로젝트 담당자 |
| **mitigation** | DataSourceNotice에 데이터 지연 가능성 고지. API 계약 시 데이터 지연 수준 확인. 지연 시간을 UI에 표시하는 방안 검토 |
| **status** | 미확인 — 문의 예정 |

---

### R-09: Provider 장애

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 상업 API 제공사 장애 시 앱 전체 데이터가 중단될 수 있음 |
| **severity** | medium |
| **likelihood** | medium |
| **owner** | 프로젝트 담당자 |
| **mitigation** | `wrapProviderCall`의 fallback 처리 구조 유지. Provider 장애 시 `DummyProvider` fallback 또는 ErrorState UI 표시. `BASEBALL_PROVIDER_RUNTIME_MODE=safe_dummy_fallback` 모드 지원 |
| **status** | 기술 구조 준비됨 — 계약 후 실제 테스트 필요 |

---

### R-10: API 응답 구조 변경

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 제공사가 API 응답 schema를 변경하면 mapper가 crash되거나 잘못된 데이터를 표시할 수 있음 |
| **severity** | medium |
| **likelihood** | low |
| **owner** | 프로젝트 담당자 |
| **mitigation** | `validation.ts` raw response validation 구조 유지. mapper에서 optional chaining / null defense 적용 (기존 구현 유지). 제공사 changelog 구독 예정 |
| **status** | 기술 구조 준비됨 — 계약 후 실제 테스트 필요 |

---

### R-11: 비용 상승

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 제공사가 플랜 가격을 인상하거나 무료/저가 플랜을 폐지할 수 있음 |
| **severity** | medium |
| **likelihood** | low |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 계약 해지 조건(예고 기간, 중도 해지 조건) 확인. 복수 후보 평가하여 대안 확보. 비용 알림 구조 검토 |
| **status** | 미확인 — 문의 예정 |

---

### R-12: 앱스토어/플레이스토어 심사 리스크

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 앱스토어(Apple) 또는 구글 플레이에 배포 시, 스포츠 데이터 앱 정책 또는 광고 정책으로 심사 거절될 수 있음 |
| **severity** | medium |
| **likelihood** | medium |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 현재 MVP는 PWA(웹앱)이며 스토어 배포는 별도 Phase. 스토어 배포 전 Apple/Google 스포츠 데이터 앱 정책 별도 확인 필요. 비공식 앱임을 앱 설명에 명시 |
| **status** | 미착수 — 스토어 배포는 별도 Phase |

---

### R-13: 계약 해지 후 데이터 사용 제한

| 항목 | 내용 |
|------|------|
| **리스크 설명** | 계약 해지 후 캐시된 데이터 삭제 의무 또는 즉시 서비스 중단 의무가 있을 수 있음 |
| **severity** | medium |
| **likelihood** | medium |
| **owner** | 프로젝트 담당자 |
| **mitigation** | 계약 전 해지 조건 명확히 확인. `docs/api-poc-selection-criteria.md` 섹션 5 체크리스트 준수. DummyProvider fallback 구조로 즉시 전환 가능 |
| **status** | 미확인 — 문의 예정 |

---

## 리스크 현황 요약

| 코드 | 리스크 | Severity | Likelihood | Status |
|------|--------|----------|------------|--------|
| R-01 | 광고형 앱 사용 불허 | high | high | 미확인 |
| R-02 | 데이터 재표시 제한 | high | medium | 미확인 |
| R-03 | 캐싱 제한 | medium | medium | 미확인 |
| R-04 | 호출량 초과 비용 | medium | medium | 미확인 |
| R-05 | 출처 고지 문구 미준수 | medium | medium | 미확인 |
| R-06 | 공식 MLB 데이터 오인 | high | low | 관리 중 |
| R-07 | 로고·사진·영상 권리 미포함 | high | low | 관리 중 |
| R-08 | 실시간 데이터 지연 | low | high | 미확인 |
| R-09 | Provider 장애 | medium | medium | 기술 준비됨 |
| R-10 | API 응답 구조 변경 | medium | low | 기술 준비됨 |
| R-11 | 비용 상승 | medium | low | 미확인 |
| R-12 | 앱스토어 심사 리스크 | medium | medium | 미착수 |
| R-13 | 계약 해지 후 사용 제한 | medium | medium | 미확인 |

---

*이 문서는 Phase 16 기준으로 작성되었습니다. 문의 회신 후 각 리스크의 Status를 업데이트하세요.*
