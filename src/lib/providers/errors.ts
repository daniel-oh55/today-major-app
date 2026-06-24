export type ProviderErrorKind =
  | "provider_unavailable"
  | "rate_limited"
  | "unauthorized"
  | "not_found"
  | "invalid_response"
  | "timeout"
  | "unknown";

export class AppDataError extends Error {
  constructor(
    public readonly kind: ProviderErrorKind,
    public readonly providerId: string,
    message?: string
  ) {
    super(message ?? kind);
    this.name = "AppDataError";
  }
}

export function toSafeClientMessage(kind: ProviderErrorKind): string {
  switch (kind) {
    case "not_found":
      return "요청하신 데이터를 찾을 수 없습니다.";
    case "rate_limited":
      return "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
    case "timeout":
      return "응답 시간이 초과됐습니다. 잠시 후 다시 시도해주세요.";
    case "unauthorized":
    case "provider_unavailable":
      return "현재 서비스를 이용할 수 없습니다.";
    case "invalid_response":
    case "unknown":
    default:
      return "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
  }
}
