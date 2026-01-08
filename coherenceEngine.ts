export function coherenceScore(hrv: number): number {
  return Math.min(100, Math.max(0, hrv));
}
