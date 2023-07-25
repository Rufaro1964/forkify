import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView  from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/boomarksView.js';
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

     //0) Update results view to mark selected search result
     resultsView.render(model.getSearchResultsPage());
     //Loading recipe
     await model.loadRecipe(id);
     // const {recipe} = model.state; 
     
     //2)Rendering recipe
     recipeView._clear();
     recipeView.render(model.state.recipe);
     
     // 3) Updating book marks view
     bookmarksView.update(model.state.bookmarks);
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
 
  //New render Result
  resultsView.render(model.getSearchResultsPage(goToPage));
  //New Pagination
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
//Update the recipe servings (in state)
model.updateServings(newServings);
//Update the recipe view
// recipeView.render(model.state.recipe);

recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
//1) Add/remove bookmar
if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
else model.deleteBookmark(model.state.recipe.id);
// 2) update recipe view
recipeView.update(model.state.recipe);

//3) render bookmarsk
bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
recipeView.addHandlerRender(controlRecipes);
recipeView.addHanderUpdateServings(controlServings);
recipeView.addHandlerAddBookmark(controlAddBookmark)
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);

}
init();

