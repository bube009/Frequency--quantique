export function calculateBPM(intervals: number[]): number {
  if (!intervals.length) return 0
  const avg = intervals.reduce((a, b) => a + b) / intervals.length
  return Math.round(60000 / avg)
}
