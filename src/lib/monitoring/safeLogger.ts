import { AppDataError } from "@/lib/providers/errors";

interface SafeErrorLog {
  operation: string;
  kind: string;
  providerId?: string;
  isRetryable?: boolean;
}

// raw error 객체, stack trace, API Key, headers, raw response를 절대 포함하지 않습니다.
function normalizeErrorForLog(operation: string, error: unknown): SafeErrorLog {
  if (error instanceof AppDataError) {
    const retryable = error.kind === "rate_limited" || error.kind === "timeout";
    return {
      operation,
      kind: error.kind,
      providerId: error.providerId,
      isRetryable: retryable,
    };
  }
  return {
    operation,
    kind: "unknown",
  };
}

export function logApiRouteError(operation: string, error: unknown): void {
  const log = normalizeErrorForLog(operation, error);
  console.error("[api-route-error]", log);
}
