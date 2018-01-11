export default function pcancel(fn, {noReject} = {}) {
  return (...args) => {
    let cancel = null;

    const promise = Promise.race([
      fn(...args),
      new Promise(
        (resolve, reject) =>
          (cancel = (value) =>
            noReject
              ? resolve(value)
              : reject(value === undefined ? createCancellationError() : value)),
      ),
    ]);

    return {
      promise,
      cancel,
    };
  };
}

function createCancellationError(msg = 'Promise has canceled') {
  const err = new Error(msg);
  err.canceled = true;

  return err;
}
