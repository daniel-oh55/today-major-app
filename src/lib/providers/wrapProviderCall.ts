import "server-only";
import { logApiUsage } from "../monitoring/apiUsage";
import { AppDataError } from "./errors";
import type { ProviderErrorKind } from "./errors";

export async function wrapProviderCall<T>(
  providerId: string,
  operation: string,
  fn: () => Promise<T>,
  cacheHit = false
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    logApiUsage({
      providerId,
      operation,
      cacheHit,
      durationMs: Date.now() - start,
      success: true,
    });
    return result;
  } catch (err) {
    const kind: ProviderErrorKind =
      err instanceof AppDataError ? err.kind : "unknown";
    logApiUsage({
      providerId,
      operation,
      cacheHit,
      durationMs: Date.now() - start,
      success: false,
      errorKind: kind,
    });
    throw err;
  }
}
