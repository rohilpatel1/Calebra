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

getId('footer-meal-menu').addEventListener('click', _ => {
  location.href = "/mealMenu.html";
});

getId('footer-home').addEventListener('click', _ => {
  location.href = "/";
});

getId('add-dish').addEventListener('click', _ => {
  location.href = "/createMeal/createMeal.html";
});

if (userData.mealInformation) {
  userData.mealInformation.forEach(meal => {
    getId('mealDishPanel').innerHTML += `
      <button class="mealDishButton">
        <span class = "mealDishButtonText">${meal.name}</span>
        <label class = "toggle">
          <input type = "checkbox" class = "checkbox" />
          <span class = "slider round"></span>
        </label>
      </button>
      `
  });

  const meals = document.querySelectorAll('.mealDishButton');

  meals.forEach(meal => {
    meal.addEventListener('click', e => {
      let mealClicked = userData.mealInformation.find(a => a.name == e.target.innerText.replace('arrow_forward_ios', ''));

      if (mealClicked)  {
        localStorage.setItem('mealClicked', JSON.stringify(mealClicked));
        location.href = "/editMeal/editMeal.html";
      }
    });
  });
}