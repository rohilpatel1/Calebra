let userData = JSON.parse(localStorage.getItem('data')) || {
  mealInformation: []
};

let tags = {
	'&': '&amp',
	'<': '&lt',
	'>': '&gt'
};

function replaceTag(tag) {
	return tags[tag] || tag;
}

function escapeTags(str, tag) {
	return str.replace(/[&<>]/g, replaceTag);
}

let newWorker;
if (!localStorage.getItem('updateAvailable')) localStorage.setItem('updateAvailable', '0');

if(getId('updateButton')) getId('updateButton').addEventListener('click', _ => {
  newWorker.postMessage({ action: 'skipWaiting' });
  localStorage.setItem('updateAvailable', '0');
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", _ => {
    navigator.serviceWorker.register('/serviceWorker.js').then(reg => {
    }).catch(console.log)
  });

  let refreshing;

  navigator.serviceWorker.addEventListener('controllerchange', _ => {
    if (refreshing) return;

    location.reload();

    refreshing = true;
  });
}

//if (getId('newUpdateBox')) getId('newUpdateBox').style.display = "block";

function getId(id) {
  if (document.getElementById(id)) {
    return document.getElementById(id);
  }
}

getId('footer-meal-menu').addEventListener('click', _ => {
  location.href = "/mealMenu.html";
});

getId('footer-home').addEventListener('click', _ => {
  location.href = "/";
});

if (getId('add-dish')) {
  getId('add-dish').addEventListener('click', _ => {
    location.href = "/createMeal/createMeal.html";
  });
}

getId('footer-shopping-list').addEventListener('click', _ => {
  location.href = "/viewList/viewList.html";
});

getId('footer-settings').addEventListener('click', _ => {
  location.href = "/settings/settings.html";
});

if (userData.mealInformation) {
  userData.mealInformation.forEach(meal => {
    let checked = "";
    if (meal.addedToShoppingList) checked = "checked";

    if (getId('mealDishPanel')) getId('mealDishPanel').innerHTML += `
      <button class="mealDishButton">
        <span class = "mealDishButtonText">${escapeTags(meal.name)}</span>
        <label class = "toggle">
          <input type = "checkbox" class = "checkbox" ${checked}/>
          <span class = "slider round"></span>
        </label>
      </button>
      `
  });

  const meals = document.querySelectorAll('.mealDishButton');

  meals.forEach(meal => {
    meal.addEventListener('click', e => {
      let mealClicked = userData.mealInformation.find(a => a.name == e.target.innerText.trim());
      if (mealClicked)  {
        localStorage.setItem('mealClicked', JSON.stringify(mealClicked));
        location.href = "/editMeal/editMeal.html";
      }
    });
  });
}

document.querySelectorAll('.checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', e => {
    console.log(e.target.parentNode.parentNode.innerText.trim())
    let mealTargetted = userData.mealInformation.find(a => a.name == e.target.parentNode.parentNode.innerText.trim()).addedToShoppingList;

    if (mealTargetted) {
      userData.mealInformation.find(a => a.name == e.target.parentNode.parentNode.innerText.trim()).addedToShoppingList = false;
      localStorage.setItem('data', JSON.stringify(userData));
    }
    else {
      userData.mealInformation.find(a => a.name == e.target.parentNode.parentNode.innerText.trim()).addedToShoppingList = true;
      localStorage.setItem('data', JSON.stringify(userData));
    }
  });
});