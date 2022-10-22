export class Switch<Compare, Return> {
  #compare: Compare;
  #cases: {
    compareTo: () => Compare;
    valueIf: () => Return;
  }[] = [];

  constructor(compare: Compare) {
    this.#compare = compare;
  }

  case(compareTo: () => Compare, valueIf: () => Return): Switch<Compare, Return> {
    this.#cases.push({
      compareTo,
      valueIf,
    });

    return this;
  }

  default(valueIf: () => Return): Return {
    for (const switchCase of this.#cases) {
      if (switchCase.compareTo() === this.#compare) {
        return switchCase.valueIf();
      }
    }

    return valueIf();
  }
}

export const iswitch = <Compare, Return>(compare: Compare) => new Switch<Compare, Return>(compare);
