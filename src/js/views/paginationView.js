import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    
_parentElement = document.querySelector('.pagination');
_generateMarkup(){
const curpage = this._data.page;
const numPages = Math.ceil(this._data.results.length /this._data.resultsPerPage);
console.log(numPages);
console.log(curpage);

//Page 1, and there are other pages
if(curpage === 1 && numPages > 1){
    return `
    <button class="btn--inline pagination__btn--next">
            <span>${curpage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
}

//Last page
if(curpage === numPages && numPages > 1){
    return `
    <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curpage - 1}</span>
          </button>
    `;
}
//Other page
if(curpage < numPages){
    return `
    <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curpage - 1}</span>
            </button>
            
     </button>
          <button class="btn--inline pagination__btn--next">
          <span>${curpage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>


    `;
}
//Page 1, and there are NO other pages
return 'only 1 page'
}
}

export default new PaginationView();

