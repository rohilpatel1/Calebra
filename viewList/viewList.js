//let uData = JSON.parse(localStorage.getItem('data')) || {};

let everyIngredientArray = [];
let compiledIngredientArray = [];
let cleanIngredientArray = [];

userData.mealInformation.forEach(meal => {
  if (!meal.addedToShoppingList) return;

  meal.ingredients.forEach(ingredient => {
    everyIngredientArray.push(ingredient);
  });
});

everyIngredientArray.forEach(ingredient => {
  let count = 0;
  for (const checkIngredient of everyIngredientArray) {
    if (JSON.stringify(ingredient) == JSON.stringify(checkIngredient)) count++;
  }
  //count should never be 0

  compiledIngredientArray.push({
    ingredientName: ingredient.ingredient,
    ingredientStore: ingredient.storeName,
    ingredientCount: count
  });
});

uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
cleanIngredientArray = uniqueArray(compiledIngredientArray);

cleanIngredientArray.forEach(element => {
  getId('list-box').innerHTML += `<p>${element.ingredientCount} ${element.ingredientName} from ${element.ingredientStore}</p>`
});
