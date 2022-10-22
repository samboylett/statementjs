import { iswitch } from "./switch";

describe("iswitch", () => {
  test("is a function", () => {
    expect(iswitch).toEqual(expect.any(Function));
  });

  test("returns default value when no cases supplied", () => {
    expect(iswitch("a").default(() => 1)).toEqual(1);
  });

  test("returns case if it matches", () => {
    expect(iswitch("a").case(() => "a", () => 2).default(() => 1)).toEqual(2);
  });

  test("returns second case if it matches", () => {
    expect(iswitch("a").case(() => "b", () => 2).case(() => "a", () => 3).default(() => 1)).toEqual(3);
  });

  test("returns first case that matches if multiple match", () => {
    expect(iswitch("a").case(() => "a", () => 2).case(() => "a", () => 3).default(() => 1)).toEqual(2);
  });
});
