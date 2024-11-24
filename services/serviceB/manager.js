export default class Manager {
  constructor(windowSize) {
    this.windowSize = windowSize;
    this.times = [];
  }

  record(responseTime) {
    if (this.times.length >= this.windowSize) {
      this.times.shift();
    }
    this.times.push(responseTime);
  }

  getStats() {
    const min = Math.min(...this.times);
    const max = Math.max(...this.times);
    const avg = this.times.reduce((sum, t) => sum + t, 0) / this.times.length || 0;
    return { min, max, avg };
  }
}
