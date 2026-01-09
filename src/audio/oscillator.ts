let ctx: AudioContext
let osc: OscillatorNode

export function play(freq: number) {
  ctx = new AudioContext()
  osc = ctx.createOscillator()
  osc.frequency.value = freq
  osc.connect(ctx.destination)
  osc.start()
}

export function stop() {
  osc?.stop()
  ctx?.close()
}
