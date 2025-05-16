export enum Sex {
  Male = "m",
  Female = "f",
}

const foodNames: string[] = [
  "Kellogg's Tresor",
  "Weihenstephan Haltbare Milch",
  "Mühle Frikadellen",
  "Volvic Tee",
  "Neuburger lockerer Sahnepudding",
  "Lagnese Viennetta",
  "Schöller 10ForTwo",
  "Ristorante Pizza Salame",
  "Schweppes Ginger Ale",
  "Mini Babybel",
];
const foodCalories: number[] = [137, 64, 271, 40, 297, 125, 482, 835, 37, 59];
const foodServings: number[] = [4, 8, 4, 12, 1, 6, 2, 2, 25, 20];

export function calcDateOnDiet( //todo: Funktionsnamen ändern
  currentWeightKg: number,
  targetWeightKg: number,
  heightCentimeters: number, 
  ageY: number, //todo: Variabelname zu ageYears abändern
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  if (ageY < 16 || heightM < 1.5) { //falls man es in centimeter ändert müsst hier heightCentimeter < 150
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  for (const index in foodNames) {
    const calories = foodCalories[index] || 0;
    const servings = foodServings[index] || 0;
    dailyCaloriesOnDiet += calories * servings;
  }
  let dailyCaloriesBasicMetabolicRate = 0;
  if (sex == Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Male)
      66.47 + 13.7 * currentWeightKg + 5.003 * heightCentimeters  - 6.75 * ageY, 
      //todo: Klammern hinzufügen das die Formel richtig ausgeführt wird und ebenfalls die variabelnname ändern und das * 100 entfernen.
    );
  } else {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Female)
      655.1 + 9.563 * currentWeightKg + 1.85 * heightCentimeters - 4.676 * ageY,
      //todo: Klammern hinzufügen das die Formel richtig ausgeführt wird und ebenfalls die variabelnname ändern und das * 100 entfernen.
    );
  }
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((9000 * weightGainKg) / dailyExcessCalories);
}
