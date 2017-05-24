import pcancel from '.';

describe('`pcancel()`', () => {
  test('should return wrpped function', () => {
    const fn = pcancel(delay);
    expect(fn).toBeInstanceOf(Function);
  });
});

describe('`pcancel()` wrapper', () => {
  test('should return object that contains `Promise` instance and `cancel()` function', () => {
    const delayC = pcancel(delay);
    const p = delayC(4000);

    expect(p.promise).toBeInstanceOf(Promise);
    expect(p.cancel).toBeInstanceOf(Function);
  });

  test('should handle original promise', async () => {
    const delayC = pcancel(delay);
    const p = delayC(4000);

    await expect(p.promise).resolves.toBe('foo');
  });

  test('should handle promise cancellation', async () => {
    const delayC = pcancel(delay);
    const p = delayC(4000);

    p.cancel();

    await expect(p.promise).rejects.toEqual(new Error('Promise has canceled'));
  });
});

function delay(time, msg = 'foo') {
  return new Promise((resolve) => setTimeout(resolve, time, msg));
}
