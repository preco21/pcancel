function pcancel(fn) {
  return (...args) => {
    let cancel = null;

    const promise = new Promise((resolve, reject) => {
      cancel = (err = createCancellationError()) => reject(err);
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
