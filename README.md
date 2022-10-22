# statementjs

A simple library for run javascript statements inline and returning the values. Offers full typescript support.

## Installation

```sh
npm i --save statementjs
```

## Usage

```typescript
import {
  iif,
  itry,
  iswitch
} from 'statementjs';

// If
const ifValue = iif(() => false, () => "first if")
  .elseIf(() => false, () => "second if")
  .else(() => "else");

// Try
const tryValue = itry(() => {
  new Error("throw an error");
})
  .catchAll(error => {
    console.log(error) // Error<throw an error>

    return "actual value";
  })
  .finally(); // returns "actual value"

// Switch

const switchValue = iswitch(1)
  .case(() => 2, () => "nope")
  .case(() => 3, () => "not me")
  .case(() => 1, () => "yep")
  .default(() => "default value") // returns "yep"
```

For more details usage, [see the jsdocs](https://statementjs.netlify.app/)
