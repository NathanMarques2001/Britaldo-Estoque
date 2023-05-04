export function toBeCalledWithAsync(received, ...args) {
  return received(...args)
    .then(() => {
      const pass = this.equals(received.mock.calls[0], args);
      if (pass) {
        return {
          message: () =>
            `expected ${this.utils.printReceived(
              received.mock.calls[0]
            )} not to equal ${this.utils.printExpected(args)}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${this.utils.printReceived(
              received.mock.calls[0]
            )} to equal ${this.utils.printExpected(args)}`,
          pass: false,
        };
      }
    })
    .catch((err) => {
      return {
        message: () => `expected the function to resolve, but it threw ${err}`,
        pass: false,
      };
    });
}

expect.extend({
  toBeCalledWithAsync,
});
