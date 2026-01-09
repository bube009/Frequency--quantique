export function calculateHRV(intervals: number[]): number {
  if (intervals.length < 2) return 0
  const mean = intervals.reduce((a, b) => a + b) / intervals.length
  const variance =
    intervals.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / intervals.length
  return Math.sqrt(variance)
}
