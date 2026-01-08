export function mapFrequency(coherence: number): number {
  if (coherence < 40) return 174;
  if (coherence < 70) return 417;
  return 528;
}
