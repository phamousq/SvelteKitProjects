function linear(t) {
  return t;
}
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}
export {
  cubicInOut as a,
  cubicIn as b,
  cubicOut as c,
  sineOut as d,
  linear as l,
  sineIn as s
};
