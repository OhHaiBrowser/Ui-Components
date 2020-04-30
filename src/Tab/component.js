
export class Tab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='src/Tab/style.css'/>
            
        `;
    }
}