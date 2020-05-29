
export class FavoriteButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._checked = this.hasAttribute('checked') ? this.getAttribute('checked') === 'true' ? true : false : false; 
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='src/URLBar/FavoriteButton/style.css'/>
            <input type='checkbox' id='favBtn' ${this._checked ? 'checked': ''}/>
            <label class='favIcon' for='favBtn'></label>
        `;
        this.shadowRoot.getElementById('favBtn').addEventListener('change', (e) => {
            this.dispatchEvent(new CustomEvent('toggled', { detail: this.shadowRoot.getElementById('favBtn').checked }));
        });
    }
}