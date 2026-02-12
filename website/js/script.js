// script.js - Chinese Food Recipes
const loadRecipesBtn = document.querySelector("#load-recipes-btn");
const showIngredientsBtn = document.querySelector("#show-ingredients-btn");
const recipesList = document.querySelector("#recipes-list");
const ingredientsList = document.querySelector("#ingredients-list");

const API_KEY =
  "73b1497dbad4468f117467169d2f81f6ecef4206a63acf5b21e23c8f5b9c578b";
const API_HOST = "chinese-food-db.p.rapidapi.com";

let allRecipes = [];
let selectedRecipeId = null;

// Function with parameter: getRecipes(limit)
const getRecipes = async (limit) => {
  if (!limit) {
    alert("Limit not set properly");
    return;
  }

  const url = `https://student-api-proxy.onrender.com/api/${API_HOST}/?limit=${limit}`;

  const options = {
    method: "GET",
    headers: { "X-API-Key": API_KEY },
  };

  recipesList.innerHTML = '<li class="list-group-item">Loading recipes...</li>';

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    allRecipes = result.data;

    recipesList.innerHTML = "";

    // Loop through recipes and display them
    allRecipes.forEach((recipe) => {
      const listItem = `
        <li class="list-group-item food-item" data-id="${recipe.id}">
          <strong>${recipe.title}</strong>
          <br><small>Difficulty: ${recipe.difficulty}</small>
        </li>
      `;
      recipesList.insertAdjacentHTML("beforeend", listItem);
    });

    // Add click event to each recipe item
    document.querySelectorAll(".food-item").forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".food-item").forEach((i) => {
          i.classList.remove("active-food");
        });
        item.classList.add("active-food");
        selectedRecipeId = item.getAttribute("data-id");
        showIngredientsBtn.disabled = false;
        const recipeTitle = item.querySelector("strong").textContent;
        console.log(
          `Selected recipe: ${recipeTitle} (ID: ${selectedRecipeId})`,
        );
      });
    });
  } catch (error) {
    recipesList.innerHTML = `
      <li class="list-group-item text-danger">
        Error loading recipes: ${error.message}
      </li>
    `;
  }
};

// Function with parameter: getRecipeIngredients(recipeId)
const getRecipeIngredients = async (recipeId) => {
  if (!recipeId) {
    alert("No recipe selected");
    return;
  }

  const url = `https://student-api-proxy.onrender.com/api/${API_HOST}/${recipeId}`;

  const options = {
    method: "GET",
    headers: { "X-API-Key": API_KEY },
  };

  ingredientsList.innerHTML =
    '<li class="list-group-item">Loading ingredients...</li>';

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const recipe = result.data;

    ingredientsList.innerHTML = "";

    // Display recipe title
    const titleItem = `
      <li class="list-group-item">
        <h5>${recipe.title}</h5>
        <p><small>Difficulty: ${recipe.difficulty} | ${recipe.portion} | ${recipe.time}</small></p>
      </li>
    `;
    ingredientsList.insertAdjacentHTML("beforeend", titleItem);

    // Display ingredients header
    ingredientsList.insertAdjacentHTML(
      "beforeend",
      '<li class="list-group-item"><strong>Ingredients:</strong></li>',
    );

    // Loop through ingredients and display them
    recipe.ingredients.forEach((ingredient, index) => {
      const listItem = `
        <li class="list-group-item ingredient-item">
          ${index + 1}. ${ingredient}
        </li>
      `;
      ingredientsList.insertAdjacentHTML("beforeend", listItem);
    });
  } catch (error) {
    ingredientsList.innerHTML = `
      <li class="list-group-item text-danger">
        Error loading ingredients: ${error.message}
      </li>
    `;
  }
};

// Load Recipes button event
loadRecipesBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getRecipes(15); // Load 15 recipes
});

// Show Ingredients button event
showIngredientsBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getRecipeIngredients(selectedRecipeId);
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("Chinese Food Recipes app loaded");
});
