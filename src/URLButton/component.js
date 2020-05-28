
export class UrlButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='src/URLButton/style.css'/>
            <button class='btn'></button>
        `;
    }
}