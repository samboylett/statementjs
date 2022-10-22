/**
 * An inline switch statement with cases and default
 */
export class Switch<Compare, Return> {
  #compare: Compare;
  #cases: {
    compareTo: () => Compare;
    valueIf: () => Return;
  }[] = [];

  /**
   * Create the class
   *
   * @param {Compare} compare - The value to compare each case to
   */
  constructor(compare: Compare) {
    this.#compare = compare;
  }

  /**
   * Add a case to the switch statement
   *
   * @param {() => Compare} compareTo - Function to return the value to compare to
   * @param {() => Return} valueIf - Function to return the return value if the comparison matches
   * @returns {Switch<Compare, Return>}
   */
  case(compareTo: () => Compare, valueIf: () => Return): Switch<Compare, Return> {
    this.#cases.push({
      compareTo,
      valueIf,
    });

    return this;
  }

  /**
   * Get the final value of the switch statement
   *
   * @param {() => Return} valueIf - Function to return the return value if none of the cases matched
   * @returns {Return}
   */
  default(valueIf: () => Return): Return {
    for (const switchCase of this.#cases) {
      if (switchCase.compareTo() === this.#compare) {
        return switchCase.valueIf();
      }
    }

    return valueIf();
  }
}

/**
 * Return an instance of the Switch class.
 *
 * @param {Compare} compare - Value to compare cases to
 * @returns {Switch<Compare, Return>}
 */
export const iswitch = <Compare, Return>(compare: Compare) => new Switch<Compare, Return>(compare);
