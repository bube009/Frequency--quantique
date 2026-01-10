let lastPeakTime = 0

export function detectPeak(
  value: number,
  threshold: number,
  time: number
): number | null {
  if (value > threshold && time - lastPeakTime > 300) {
    lastPeakTime = time
    return time
  }
  return null
}

export function calculateBPMFromPeaks(peaks: number[]): number {
  if (peaks.length < 2) return 0
  const intervals: number[] = []
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1])
  }
  const avg = intervals.reduce((a, b) => a + b) / intervals.length
  return Math.round(60000 / avg)
}
