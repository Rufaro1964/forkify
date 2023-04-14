import * as model from './model.js';
import recipeView  from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// dotenv = require('dotenv-safe');

// dotenv.config({
//   allowEmptyValues:true,
//   example:'./.env.example'
// });

// if(result.error){
//   throw result.error;
// }
// const env = result.parsed;
// for(const key in evv){
//   process.env[key] = env[key];
// }

// const apiKey = process.env.API_KEY;

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
     if(!id) return;
     recipeView.renderSpinner();
     
     //Loading recipe
    await model.loadRecipe(id);
    // const {recipe} = model.state; 
  
    //2)Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch (error) {
    alert(error);
  }
}

const ch = ['hashchange','load']
ch.forEach(ev => window.addEventListener(ev,controlRecipes));
// controlRecipes();

// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)