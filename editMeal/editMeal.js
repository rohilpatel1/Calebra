function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

getId("addIngredient").addEventListener('click', _ => {
  const nodeWrapper = document.createElement('div');
  nodeWrapper.setAttribute('class', 'row');


  const node1 = document.createElement('input');
  node1.setAttribute('type', 'text')
  node1.setAttribute('placeholder', 'Ingredient');
  node1.setAttribute('class', 'ingredient');

  const node2 = document.createElement('input');
  node2.setAttribute('placeholder', 'Store Location');
  node2.setAttribute('class', 'store-location');

  const node3 = document.createElement('span');
  node3.classList.add('material-icons');
  node3.classList.add('remove-ingredient-button');
  const node3Text = document.createTextNode('close');
  node3.appendChild(node3Text);

  const node4 = document.createElement('br');

  nodeWrapper.append(node1, node2, node3, node4);
  getId('ingredientPanel').append(nodeWrapper);

  const removeButtons = document.getElementsByClassName('remove-ingredient-button')

  for (const button of removeButtons) {
  
    button.onclick = e => {
      let rows = document.querySelectorAll('.row');
      
      e.target.parentNode.remove();
    }
  }
});

let mealClickedStorage = JSON.parse(localStorage.getItem('mealClicked'));

if (mealClickedStorage) {
  getId('food-name').value = mealClickedStorage.name;
} else {
  location.href = "/mealMenu.html"
}

let { ingredients } = mealClickedStorage;

ingredients.forEach(ingred => {
  const nodeWrapper = document.createElement('div');
  nodeWrapper.setAttribute('class', 'row');


  const node1 = document.createElement('input');
  node1.setAttribute('type', 'text');
  node1.setAttribute('value', ingred.ingredient)
  node1.setAttribute('placeholder', 'Ingredient');
  node1.setAttribute('class', 'ingredient');

  const node2 = document.createElement('input');
  node2.setAttribute('placeholder', 'Store Location');
  node2.setAttribute('value', ingred.storeName)
  node2.setAttribute('class', 'store-location');

  const node3 = document.createElement('span');
  node3.classList.add('material-icons');
  node3.classList.add('remove-ingredient-button');
  const node3Text = document.createTextNode('close');
  node3.appendChild(node3Text);

  const node4 = document.createElement('br');

  nodeWrapper.append(node1, node2, node3, node4);
  getId('ingredientPanel').append(nodeWrapper);

  const removeButtons = document.getElementsByClassName('remove-ingredient-button')

  for (const button of removeButtons) {
  
    button.onclick = e => {
      let rows = document.querySelectorAll('.row');
      
      e.target.parentNode.remove();
    }
  }
});

getId("save-meal").addEventListener('click', _ => {
  const ingredients = document.querySelectorAll('.ingredient');
  const stores = document.querySelectorAll('.store-location');
  if (getId('food-name').value == "") return alert('Please fill out the name of your food')
  //let meal = { name: getId('food-name').value, ingredients: []}
  let ingreds = [];
  // for (let i in ingredients) {
  for (const i of ingredients.keys()) {
    if ((ingredients[i].value != "") && (stores[i].value != "")) {
      ingreds.push({
        ingredient: capitalizeFirstLetter(ingredients[i].value), 
        storeName: capitalizeFirstLetter(stores[i].value)
      });
    } else return alert("Please fill out all ingredients!");
  }

  userData.mealInformation.find(a => a.name == mealClickedStorage.name.trim()).ingredients = ingreds;
  userData.mealInformation.find(a => a.name == mealClickedStorage.name.trim()).name = getId('food-name').value;

  localStorage.setItem('data', JSON.stringify(userData));
  location.href = "/mealMenu.html";
});

getId('deleteMeal').addEventListener('click', _ => {
  let message = "Are you sure you want to delete this meal?";

  if (confirm(message) == true) {
    const index = userData.mealInformation.map(object => object.name.trim()).indexOf(mealClickedStorage.name.trim());

    if (index > -1) {
      userData.mealInformation.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(userData));
      location.href = "/mealMenu.html";
    } else return;
  } else return;
});