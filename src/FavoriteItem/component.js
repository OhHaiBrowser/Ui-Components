
export class FavoriteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {
        this;this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='src/FavoriteItem/style.css'/>
            
        `;
    }
}