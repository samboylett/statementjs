import { iif } from "./if";

describe("iif", () => {
  test("is a function", () => {
    expect(iif).toEqual(expect.any(Function));
  });

  test("returns else value when if is false", () => {
    expect(iif(() => false, () => 2).else(() => 1)).toEqual(1);
  });

  test("returns if value when if is true", () => {
    expect(iif(() => true, () => 2).else(() => 1)).toEqual(2);
  });

  test("returns first if value when if is true and elseif true", () => {
    expect(iif(() => true, () => 2).elseIf(() => true, () => 3).else(() => 1)).toEqual(2);
  });

  test("returns first if value when if is true and elseif false", () => {
    expect(iif(() => true, () => 2).elseIf(() => false, () => 3).else(() => 1)).toEqual(2);
  });

  test("returns elseif value when if is false and elseif true", () => {
    expect(iif(() => false, () => 2).elseIf(() => true, () => 3).else(() => 1)).toEqual(3);
  });

  test("returns second elseif value when if is false and first elseif false", () => {
    expect(iif(() => false, () => 2).elseIf(() => false, () => 3).elseIf(() => true, () => 4).else(() => 1)).toEqual(
      4
    );
  });
});
