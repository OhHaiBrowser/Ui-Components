export class FavoritesList extends HTMLElement {
    #favList = [];
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #favList {
                    display:block; 
                }

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
        var template = this.shadowRoot.querySelector('template');
        list.forEach(item => {
            var clone = template.content.cloneNode(true);

            clone.getElementById('fav_img').src =  'assets/favicon_default.png';
            clone.querySelector('.favItem').addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('item-click', {detail: {url: item.url }}));
            });
            clone.querySelector('.favItem').addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.dispatchEvent(new CustomEvent('item-context', {detail: {el: e }}));
            });

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
    
}