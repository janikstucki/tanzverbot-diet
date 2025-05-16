import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(60, 70, 170, 16, Sex.Male)).toBeGreaterThan(0);
});


test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(60, 70, 170, 16, Sex.Male)).toBeCloseTo(1510);
});
