export function calculateBPM(peaks: number[]): number {
  if (peaks.length < 2) return 0;
  const intervals = [];
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }
  const avg = intervals.reduce((a, b) => a + b) / intervals.length;
  return Math.round(60000 / avg);
}
