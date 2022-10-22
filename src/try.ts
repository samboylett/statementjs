type AbstractClass = new (...args: any) => any;

class Try<T> {
  readonly state: "error" | "success";
  readonly error?: any;
  readonly returnValue?: T;

  constructor(tryFn: () => T) {
    try {
      this.returnValue = tryFn();

      this.state = "success";
    } catch (e) {
      this.error = e;
      this.state = "error";
    }
  }

  catch<E extends AbstractClass>(
    type: E,
    catchFn: (e: InstanceType<E>) => T
  ): Try<T> {
    if (this.state === "error" && this.error instanceof type) {
      return new Try<T>(() => catchFn(this.error));
    }

    return this;
  }

  catchAll(catchFn: (e: any) => T): Try<T> {
    if (this.state === "error") {
      return new Try<T>(() => catchFn(this.error));
    }

    return this;
  }

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

export const itry = <T>(tryFn: () => T) => new Try<T>(tryFn);
