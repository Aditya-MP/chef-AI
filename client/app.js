const API_URL = 'http://localhost:5000/api';

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const generateBtn = document.getElementById('generate-recipes');

// State
let currentUser = null;
let selectedIngredients = [];
let dietaryPrefs = [];

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
generateBtn.addEventListener('click', fetchRecipes);

async function handleLogin(e) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    showDashboard();
  } catch (err) {
    console.error('Login failed:', err);
  }
}

function showDashboard() {
  authSection.style.display = 'none';
  dashboardSection.style.display = 'block';
  loadUserData();
}

async function loadUserData() {
  const token = localStorage.getItem('token');
  // Fetch user data and preferences
  // Implement similar to handleLogin
}

async function fetchRecipes() {
  try {
    const response = await fetch(`${API_URL}/recipes`, {
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    });
    
    const recipes = await response.json();
    renderRecipes(recipes);
  } catch (err) {
    console.error('Recipe fetch failed:', err);
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipe-results');
  container.innerHTML = '';
  
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
      <button class="save-btn">Save</button>
    `;
    container.appendChild(recipeCard);
  });
}