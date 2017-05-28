function pcancel(fn, {noReject} = {}) {
  return (...args) => {
    let cancel = null;

    const promise = new Promise((resolve, reject) => {
      cancel = (value) => noReject
        ? resolve(value)
        : reject(value === undefined ? createCancellationError() : value);

      fn(...args).then(resolve).catch(reject);
    });

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

export {
  pcancel as default,
};
