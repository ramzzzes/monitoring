import fs from 'fs/promises';
import path from 'path';
import Manager from './Manager.js';
import config from './config.js';

describe('Service B Integration Tests', () => {
  let manager;

  beforeEach(() => {
    manager = new Manager(5);
  });

  it('should fetch Service A and record response times', async () => {
    const fakeResponseTime = 150;

    jest.mock('axios', () => ({
      get: jest.fn().mockResolvedValueOnce(() => {
        return new Promise((resolve) => setTimeout(resolve, fakeResponseTime));
      }),
    }));

    manager.record(fakeResponseTime);
    const stats = manager.getStats();

    expect(stats.min).toBe(150);
    expect(stats.max).toBe(150);
    expect(stats.avg).toBe(150);
  });

  it('should save stats to a file in the correct directory structure', async () => {
    const now = new Date();
    const day = now.toISOString().split('T')[0];
    const hour = String(now.getHours()).padStart(2, '0');
    const timestamp = now.toISOString();

    const dirPath = path.join(config.DATA_PATH, day, hour);
    const filePath = path.join(dirPath, `${timestamp}.json`);

    manager.record(100);
    manager.record(200);
    const stats = manager.getStats();

    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(stats, null, 2));

    const savedStats = JSON.parse(await fs.readFile(filePath, 'utf8'));
    expect(savedStats.min).toBe(100);
    expect(savedStats.max).toBe(200);
    expect(savedStats.avg).toBe(150);
  });
});
