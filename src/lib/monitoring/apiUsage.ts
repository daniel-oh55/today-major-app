export interface ApiUsageRecord {
  providerId: string;
  operation: string;
  cacheHit: boolean;
  durationMs: number;
  success: boolean;
  errorKind?: string;
}

// No-op in production. Extend this to emit to a metrics backend when needed.
// API Key, raw response, PII는 절대 기록하지 마세요.
export function logApiUsage(record: ApiUsageRecord): void {
  if (process.env.NODE_ENV !== "development") return;
  const status = record.success ? "ok" : `err:${record.errorKind ?? "unknown"}`;
  const cache = record.cacheHit ? "HIT" : "MISS";
  console.debug(
    `[api-usage] ${record.providerId}/${record.operation} ${status} cache=${cache} ${record.durationMs}ms`
  );
}
