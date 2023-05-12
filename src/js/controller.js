import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView  from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept();
}

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
    recipeView._clear();
    recipeView.render(model.state.recipe);
    
  } catch (error) {
    
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
try {
  resultsView.renderSpinner();
  resultsView._clear();
//1) Get search query
  const query = searchView.getQuery();
  if(!query) return;

  //2) load search results
  await model.loadSearchResults(query);
  // //3)Render results
  // console.log(model.state.search.results);
  // render all the results : resultsView.render(model.state.search.results);
  //renders maximum of 10 
  resultsView.render(model.getSearchResultsPage());
  // //4 Render intial pagination buttons
  paginationView.render(model.state.search);

} catch (err) {
  console.log(err);
}
};

const controlPagination = function(goToPage){
  console.log(goToPage);
  //New render Result
  resultsView.render(model.getSearchResultsPage(goToPage));
  //New Pagination
  paginationView.render(model.state.search);
}

const init = function(){
recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
}

init();

