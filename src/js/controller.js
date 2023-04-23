import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView  from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
     if(!id) return;
     recipeView.renderSpinner();
     
     //Loading recipe
    await model.loadRecipe(id);
    // const {recipe} = model.state; 
  
    //2)Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch (error) {
    
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
try {
//1) Get search query
  const query = searchView.getQuery();
  if(!query) return;

  //2) load search results
  await model.loadSearchResults(query);
  //3)Render results
  console.log(model.state.search.results);
} catch (err) {
  console.log(err);
}
};


const init = function(){
recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResults);
}

init();

