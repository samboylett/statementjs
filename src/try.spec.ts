import { itry } from "./try";

describe("itry", () => {
  test("is a function", () => {
    expect(itry).toEqual(expect.any(Function));
  });

  test("returns value when function does not error", () => {
    expect(itry(() => 1).finally()).toEqual(1);
  });

  test("returns value when function does not error and catch present", () => {
    expect(
      itry(() => 1)
        .catchAll(() => 2)
        .finally()
    ).toEqual(1);
  });

  test("returns catch value when function errors", () => {
    expect(
      itry<number>(() => {
        throw new Error();
      })
        .catchAll(() => 2)
        .finally()
    ).toEqual(2);
  });

  test("returns second catch value when first also errors", () => {
    expect(
      itry<number>(() => {
        throw new Error();
      })
        .catchAll(() => {
          throw new Error();
        })
        .catchAll(() => 3)
        .finally()
    ).toEqual(3);
  });

  test("throws when error not caught", () => {
    const error = new Error();

    expect(() =>
      itry<number>(() => {
        throw error;
      }).finally()
    ).toThrow(error);
  });

  test("will throw when only catching specific error", () => {
    class SubError extends Error {}
    const error = new Error();

    expect(() =>
      itry<number>(() => {
        throw error;
      })
        .catch(SubError, () => 4)
        .finally()
    ).toThrow(error);
  });

  test("will return when when catching specific error", () => {
    class SubError extends Error {}
    const error = new SubError();

    expect(
      itry<number>(() => {
        throw error;
      })
        .catch(SubError, () => 4)
        .finally()
    ).toEqual(4);
  });

  test("will call finally fn when supplied", () => {
    const finallyFn = jest.fn();

    itry<number>(() => 5).finally(finallyFn);

    expect(finallyFn).toHaveBeenCalled();
  });

  test("will call finally fn even if uncaught error supplied", () => {
    const finallyFn = jest.fn();

    expect(() =>
      itry<number>(() => {
        throw new Error();
      }).finally(finallyFn)
    ).toThrow();

    expect(finallyFn).toHaveBeenCalled();
  });
});
