/**
 * An inline if/else statement class, with optional elseifs.
 */
export class If<T> {
  readonly truthy: () => boolean;
  readonly value: () => T;

  /**
   * Create the class
   *
   * @param {() => boolean} truthy - The truthy evaluator for the first if
   * @param {() => T} value - Function to return the value if the statement is truthy
   */
  constructor(truthy: () => boolean, value: () => T) {
    this.truthy = truthy;
    this.value = value;
  }

  /**
   * Add an else if to the inline statement
   *
   * @param {() => boolean} truthy - The truthy evaluator for the first if
   * @param {() => T} value - Function to return the value if the statement is truthy
   * @returns {If<T>}
   */
  elseIf(truthy: () => boolean, value: () => T): If<T> {
    if (this.truthy()) {
      return this;
    }

    return new If<T>(truthy, value);
  }

  /**
   * Get the final value from the statement.
   *
   * @param {() => T} value - Function to return the value if all previous if statements were falsy
   * @returns {T}
   */
  else(value: () => T): T {
    return this.truthy() ? this.value() : value();
  }
}

/**
 * Return an instance of an inline if class
 *
 * @param {() => boolean} truthy - The truthy evaluator for the first if
 * @param {() => T} value - Function to return the value if the statement is truthy
 * @returns {If<T>}
 */
export const iif = <T>(truthy: () => boolean, value: () => T) =>
  new If<T>(truthy, value);
