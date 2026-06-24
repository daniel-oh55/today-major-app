# Provider API Inquiry Template

> **Internal use only.** This template is for contacting API providers before signing a contract.
> All items below are "confirmation required" — do not assume any terms until the provider confirms in writing.
> Do NOT send until reviewing `docs/commercial-api-checklist.md` in full.

---

## English Inquiry Template

**Subject:** API Usage Inquiry — Non-official Baseball Stats App (Ad-Monetized, Free Mobile/Web)

---

Hi [Provider Name] Team,

I'm building a non-official, free-to-use baseball statistics app for Korean MLB fans. The app displays game schedules, scores, player stats, and team information. I'm evaluating API providers before signing a contract, and I have a few questions about your terms of use.

**About the app:**
- Type: Free mobile web app / PWA (no paid tier, no subscription)
- Monetization: Display advertising only (banner and native ads)
- Platform: Web (PWA) — potential future native app
- Region: Primarily Korean users; data displayed in Korean
- Branding: Clearly labeled as an unofficial, third-party app — not affiliated with MLB or any team
- No use of MLB logos, team logos, player photos, or video highlights

**Questions:**

1. **Ad-monetized free app use**
   Is it permitted to use your API in a free mobile/web app that is monetized with display advertising (banner ads, native ads)? Please confirm whether your Terms of Service allow this use case explicitly.

2. **PWA vs. native app**
   Are there different terms or pricing tiers for web/PWA apps vs. native iOS/Android apps? If we deploy to the App Store or Google Play in the future, would a separate agreement be required?

3. **Displaying data in the app**
   May we display scoreboard data, player statistics, and team statistics to end users within the app UI? Is re-display to multiple concurrent users covered by a standard API plan?

4. **Caching**
   What is the permitted caching duration for different data types (e.g., live scores, player stats, historical game data)? May we cache API responses on our server (e.g., Redis or in-memory cache) to reduce API call volume?

5. **Data storage and redistribution**
   May we store API response data in a database to serve cached responses to users? Is there a limit on the number of users who can be served from a cached response?

6. **Attribution requirements**
   Do you require us to display your brand name, logo, or a specific attribution string in the app? If yes, please provide the exact required text or logo usage guidelines.

7. **"Official data" representation**
   We do not intend to present data as "official MLB data" or imply an official affiliation. Are there any terms that restrict how we describe the data source (e.g., must not say "official," must add a disclaimer)?

8. **Rate limits**
   What are the request limits (requests per minute, requests per day) for the plan we would use? Are there different limits during live game windows?

9. **Overage charges**
   What happens if we exceed the rate limit? Is there an automatic overage charge, or are requests throttled/blocked? Please clarify the billing model for overages.

10. **Trial / sandbox access**
    Do you offer a trial period, sandbox environment, or free tier so we can validate the integration before committing to a paid plan?

11. **Logo, player photo, and video rights**
    We are NOT planning to use team logos, player photos, or video highlights in the MVP. However, for future reference — does your API provide image or video URLs, and if so, what are the usage rights for those assets?

**Note on MLB Stats API:**
We are not using the MLB Stats API (api.mlb.com) in this project. We are evaluating third-party commercial data providers only.

Thank you for your time. I look forward to hearing from you.

Best regards,
[Your Name]
[Contact Email]
[App/Project Name]

---

## 한국어 요약 (내부 참고용)

위 문의 메일은 아래 항목을 확인하기 위한 것입니다.

| 확인 항목 | 핵심 질문 |
|-----------|----------|
| 광고 수익화 허용 | 광고형 무료 앱에서 API 사용 가능한가 |
| PWA vs 네이티브 앱 | 플랫폼별 조건/가격 차이가 있는가 |
| 데이터 표시 권한 | 다수 사용자에게 스코어/스탯 표시 가능한가 |
| 캐싱 허용 범위 | 서버 캐시 허용 시간/방식 |
| 저장/재배포 제한 | DB 저장 후 다수 사용자에게 제공 가능한가 |
| 출처 표기 의무 | 로고/브랜드명 표기 필요 여부 및 형식 |
| 공식 표현 금지 | "공식 데이터" 표현 금지 조건 |
| Rate limit | 분당/일당 요청 한도 |
| 초과 호출 비용 | Rate limit 초과 시 과금 방식 |
| Trial/sandbox | 계약 전 테스트 환경 제공 여부 |
| 이미지/영상 권리 | 로고/선수 사진/영상 URL 사용 조건 |

> **중요:** MVP에서는 팀 로고, 선수 사진, 영상, 하이라이트를 사용하지 않습니다.
> 이 정책은 계약 조건과 무관하게 유지됩니다.

---

## 문의 전 체크리스트

- [ ] `docs/commercial-api-checklist.md` 전체 검토 완료
- [ ] `docs/api-provider-evaluation.md`에 해당 provider 상태 업데이트 준비
- [ ] 계약 전 production 데이터 소스로 사용하지 않을 것 확인
- [ ] API Key를 커밋하거나 클라이언트에 노출하지 않을 것 확인
- [ ] MLB Stats API (api.mlb.com)는 절대 사용하지 않을 것 확인

---

*이 문서는 Phase 9 기준으로 작성되었습니다. 계약 진행 시 업데이트가 필요합니다.*
