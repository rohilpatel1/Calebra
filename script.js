let userData = JSON.parse(localStorage.getItem('data')) || {
  mealInformation: []
};

// if (!userData) {
//   userData = {
//     mealInformation: []
//   }
// } 

//getId('')

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async _ => {
    const res = await navigator.serviceWorker
      .register("/serviceWorker.js").catch(err => console.log("service worker not registered", err));

    if (res) console.log("Service Worker connected to the application")
  });
}

function getId(id) {
  return document.getElementById(id);
}

if (getId('footer-meal-menu')) getId('footer-meal-menu').addEventListener('click', _ => {
  location.href = "/mealMenu.html";
});

if (getId('footer-home')) getId('footer-home').addEventListener('click', _ => {
  location.href = "/";
});

if (getId('add-dish')) getId('add-dish').addEventListener('click', _ => {
  location.href = "/createMeal/createMeal.html";
});

if (getId('footer-shopping-list')) getId('footer-shopping-list').addEventListener('click', _ => {
  location.href = "/viewList/viewList.html";
});

if (userData.mealInformation) {
  userData.mealInformation.forEach(meal => {
    let checked = "";
    if (meal.addedToShoppingList) checked = "checked";

    if (getId('mealDishPanel')) getId('mealDishPanel').innerHTML += `
      <button class="mealDishButton">
        <span class = "mealDishButtonText">${meal.name}</span>
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
      let mealClicked = userData.mealInformation.find(a => a.name == e.target.innerText);

      if (mealClicked)  {
        localStorage.setItem('mealClicked', JSON.stringify(mealClicked));
        location.href = "/editMeal/editMeal.html";
      }
    });
  });
}

document.querySelectorAll('.checkbox').forEach(checkbox => {
  checkbox.addEventListener('click', e => {
    let mealTargetted = userData.mealInformation.find(a => a.name == e.target.parentNode.parentNode.innerText).addedToShoppingList;

    if (mealTargetted) {
      userData.mealInformation.find(a => a.name == e.target.parentNode.parentNode.innerText).addedToShoppingList = false;
      localStorage.setItem('data', JSON.stringify(userData));
    }
    else {
      userData.mealInformation.find(a => a.name == e.target.parentNode.parentNode.innerText).addedToShoppingList = true;
      localStorage.setItem('data', JSON.stringify(userData));
    }
  });
});