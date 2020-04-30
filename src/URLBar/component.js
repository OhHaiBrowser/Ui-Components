
export class UrlBar extends HTMLElement {

    static get observedAttributes() {
        return [
            'active-value',
            'inactive-value'
        ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='src/URLBar/style.css'/>
			<div class="componentOuter">
				<div class="urlOuter">
					<a id="SecureCheck" class="DoubleURLBtn Internal"></a>
					<input class="URLBar" type="text" id="URLBar" />
					<fav-btn class="URLButton" id='fav-btn'></fav-btn>
					<button id="Refresh" title="Refresh this page" class="URLButton Refresh"></button>             
				</div>
				<div id="URLAutoComplete" class="URL_AutoComplete AutoComplete_hidden"></div>
			</div>
        `;
    }
    attributeChangedCallback(attrName, oldVal, newVal) { 
        
    }
}