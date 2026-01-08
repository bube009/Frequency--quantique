let ctx: AudioContext;
let osc: OscillatorNode;

export function playFrequency(freq: number) {
  ctx = new AudioContext();
  osc = ctx.createOscillator();
  osc.frequency.value = freq;
  osc.type = 'sine';
  osc.connect(ctx.destination);
  osc.start();
}

export function stopFrequency() {
  osc?.stop();
  ctx?.close();
}
