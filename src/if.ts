export class If<T> {
  readonly truthy: () => boolean;
  readonly value: () => T;

  constructor(truthy: () => boolean, value: () => T) {
    this.truthy = truthy;
    this.value = value;
  }

  elseIf(truthy: () => boolean, value: () => T): If<T> {
    if (this.truthy()) {
      return this;
    }

    return new If<T>(truthy, value);
  }

  else(value: () => T): T {
    return this.truthy() ? this.value() : value();
  }
}

export const iif = <T>(truthy: () => boolean, value: () => T) =>
  new If<T>(truthy, value);
