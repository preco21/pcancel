import pcancel from '.';

describe('`pcancel()`', () => {
  test('should return `function`', () => {
    const fn = pcancel(delay);
    expect(fn).toBeInstanceOf(Function);
  });
});

function delay(time, msg = 'foo') {
  return new Promise((resolve) => setTimeout(resolve, time, msg));
}
