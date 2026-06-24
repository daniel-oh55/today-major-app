// Lightweight type guards for raw API response validation.
// Used by provider-specific validators to normalize shape errors into AppDataError.
// No external dependencies — avoids adding a schema library until real API integration.

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function hasString(obj: Record<string, unknown>, key: string): boolean {
  return typeof obj[key] === "string";
}

export function hasNonEmptyString(obj: Record<string, unknown>, key: string): boolean {
  return typeof obj[key] === "string" && (obj[key] as string).length > 0;
}

export function hasNumber(obj: Record<string, unknown>, key: string): boolean {
  const v = obj[key];
  return typeof v === "number" && !isNaN(v);
}

export function hasRecord(obj: Record<string, unknown>, key: string): boolean {
  return isRecord(obj[key]);
}
