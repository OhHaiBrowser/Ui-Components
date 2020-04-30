
export class HistoryItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='src/HistoryItem/style.css'/>
            
        `;
    }
}