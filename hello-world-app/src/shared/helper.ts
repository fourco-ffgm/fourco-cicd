export function increment(current: number, max = 10) {
  if (current < max) {
    return current + 1;
  }
  return current;
}

function decrement(current: number, min = 0) {
  if (current > min) {
    return current - 1;
  }
  return current;
}

function reset() {
  return 0;
}
