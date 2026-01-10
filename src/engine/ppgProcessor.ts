export function extractPPGFromFrame(frame: ImageData): number {
  let sum = 0
  const data = frame.data
  for (let i = 0; i < data.length; i += 4) {
    sum += data[i] // canal rouge
  }
  return sum / (data.length / 4)
}
