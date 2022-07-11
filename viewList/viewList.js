let everyIngredientArray = [];
let compiledIngredientArray = [];
let cleanIngredientArray = [];

// let tags = {
// 	'&': '&amp',
// 	'<': '&lt',
// 	'>': '&gt'
// };

function replaceTag(tag) {
	return tags[tag] || tag;
}

function escapeTags(str, tag) {
	return str.replace(/[&<>]/g, replaceTag);
}

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

  compiledIngredientArray.push({
    ingredientName: ingredient.ingredient,
    ingredientStore: ingredient.storeName,
    ingredientCount: count
  });
});

uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
cleanIngredientArray = uniqueArray(compiledIngredientArray);

cleanIngredientArray.forEach(element => {
  getId('meal-ingredients').innerHTML += `
  <tr>
    <td>${escapeTags(element.ingredientName)}</td>
    <td>${escapeTags(element.ingredientStore)}</td>
    <td>${element.ingredientCount}</td>
  </tr>
  `
});
