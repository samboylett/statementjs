/**
 * An inline try/catch statement class
 */
export class Try<T> {
  readonly state: "error" | "success";
  readonly error?: any;
  readonly returnValue?: T;

  /**
   * Instantiate the class
   *
   * @param {() => T} tryFn - Function to try running which may throw an error
   */
  constructor(tryFn: () => T) {
    try {
      this.returnValue = tryFn();

      this.state = "success";
    } catch (e) {
      this.error = e;
      this.state = "error";
    }
  }

  /**
   * Catch a specific error instance
   *
   * @param {E} type - The error type to catch
   * @param {(e: InstanceType<E>) => T} catchFn - Function to return a new value if the try function threw the specified error type, which can itself throw an error to be caught
   * @returns {Try<T>}
   */
  catch<E extends (new (...args: any) => any)>(
    type: E,
    catchFn: (e: InstanceType<E>) => T
  ): Try<T> {
    if (this.state === "error" && this.error instanceof type) {
      return new Try<T>(() => catchFn(this.error));
    }

    return this;
  }

  /**
   * Catch all errors
   *
   * @param {(e: any) => T} catchFn - Function to return a new value if the try function threw any error, which can itself throw an error to be caught
   * @returns {Try<T>}
   */
  catchAll(catchFn: (e: any) => T): Try<T> {
    if (this.state === "error") {
      return new Try<T>(() => catchFn(this.error));
    }

    return this;
  }

  /**
   * Get the final value returned by the try or catch functions
   *
   * @param {() => void} finallyFn - Optional function to run at the end of the of the statement
   * @returns {T}
   * @throws {any} Will throw any error that has not been caught
   */
  finally(finallyFn?: () => void): T {
    if (finallyFn) {
      finallyFn();
    }

    if (this.state === "success") {
      return this.returnValue as T;
    }

    throw this.error;
  }
}

/**
 * Return an instance of the Try class statement
 *
 * @param {() => T} tryFn - Function to try running which may throw an error
 * @returns {Try<T>}
 */
export const itry = <T>(tryFn: () => T) => new Try<T>(tryFn);
