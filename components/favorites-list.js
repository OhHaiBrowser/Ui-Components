export class FavoritesList extends HTMLElement {
    #favList = [];
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #favList {
                    display:grid;
                    grid-template-columns: repeat( var(--timeline-grid-col) , var(--timeline-item-width));
                    grid-auto-rows: var(--timeline-item-height);
                    grid-column-gap: var(--timeline-grid-gap);
                    grid-row-gap: var(--timeline-grid-gap);
                }

                    .favItem {
                        display: flex;
                        background: var(--controls-default);
                        box-sizing: border-box;
                        border-radius: 2px;
                        transition: background 0.25s;
                        align-items: center;
                        justify-content: center;
                        aspect-ratio: 1 / 1;
                    }   
                        .favItem:hover{
                            background: var(--controls-hover);
                        }
                        .favItem:active {
                            background: var(--controls-active);
                        }
                    
                        .favItem > img {
                            width: 16px;
                            box-sizing: border-box;
                        }
            </style>
            <div id="favList">

            </div>
            <template>
                <div class='favItem'>
                    <img/ id='fav_img'>
                </div>
            </template>
        `;
    }
    load(list){
        this.#favList = list;
        list.forEach(item => {
            var clone = document.createElement('div');
            clone.classList.add('favItem');
            clone.innerHTML = `<img/ id='fav_img'>`;
            clone.querySelector('#fav_img').src =  'assets/favicon_default.png';

            this.dispatchEvent(new CustomEvent('new-item', {detail: {el: clone }}));
            this.shadowRoot.getElementById('favList').appendChild(clone);
        });
    }
    add(item) {
        
    }
    remove(item) {

    }
    export() {

    }
}

export class FavoritesItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .favItem {
                    display: inline-flex;
                    background: rgb(255 255 255 / 55%);
                    box-sizing: border-box;
                    border-radius: 2px;
                    transition: background 0.25s;
                    width: 50px;
                    height: 50px;
                    margin: 5px;
                    align-items: center;
                    justify-content: center;
                }   
                    .favItem:hover{
                        background: rgb(255 255 255 / 70%);
                    }
                
                    .favItem > img {
                        width: 50%;
                        box-sizing: border-box;
                    }
            </style>
            <div class='favItem'>
                <img/ id='fav_img'>
            </div>
        `;
    }
}