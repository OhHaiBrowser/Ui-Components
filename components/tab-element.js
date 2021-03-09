export class Tab extends HTMLElement {
    static get observedAttributes() { return ['aria-selected', 'mode', 'icon', 'title', 'actions']; }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .tab_outer {
                    height: 35px;
                    background: rgb(255 255 255 / 55%);
                    border-radius: 2px;
                    margin: 15px 0;
                    display:flex;
                    flex-direction: row;
                    box-sizing: border-box;
                    user-select:none;
                    transition: background 0.25s;
                    outline:none;
                }
                .tab_outer.pinned {
                    display:inline-block;
                    margin:0;
                }
                    .tab_outer:hover{
                        background: rgb(255 255 255 / 70%);
                    }
                    .tab_outer.active {
                        background: rgb(255 255 255 / 100%);
                    }
                #tab_img {
                    height: 16px;
                    width: 16px;
                    border-radius: 2px;
                    margin: 9px;                
                }
                #tab_text {
                    flex:auto;
                    font-size: 14px;
                    height: 16px;
                    line-height: 16px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;    
                    margin: 9px 5px;        
                }
                #tab_close {
                    height:16px;
                    width: 16px;
                    border-radius:2px;
                    border:none;
                    background: transparent;
                    transition: background 0.25s;
                    margin: 9px;
                    outline:none;
                    padding:0;
                }
                    #tab_close:hover {
                        background: rgb(223 35 35 / 100%) !important;
                    }
                    .tab_outer.active #tab_close {
                        background: rgb(223 35 35 / 55%);
                    }

                    #tab_close > svg {
                        display:block;
                        margin:0px 2px;
                        color: transparent;
                    }
                        #tab_close:hover > svg {
                            color: rgb(255 255 255 / 100%) !important;
                        }
                        .tab_outer.active #tab_close > svg, .tab_outer:hover #tab_close > svg {
                            color: rgb(0 0 0 / 55%);
                        }
            </style>
            <div class='tab_outer'>
                <img id='tab_img'/>
                <span id='tab_text'></span>
                <button id='tab_close'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
        `;
        this.shadowRoot.querySelector('.tab_outer').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('selected'));
        });
        this.shadowRoot.getElementById('tab_close').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('closed'));
        });
    }
    connectedCallback() {
        this.hasAttribute('aria-selected') == true ? this.shadowRoot.querySelector('.tab_outer').classList.add('active') : null;
        this.hasAttribute('icon') ? this.shadowRoot.getElementById('tab_img').src = this.getAttribute('icon') : this.shadowRoot.getElementById('tab_img').src = 'assets/favicon_default.png';
        this.hasAttribute('title') ? this.shadowRoot.getElementById('tab_text').textContent = this.getAttribute('title') : this.shadowRoot.getElementById('tab_text').textContent = 'New Tab';
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){ 
            case 'title':
                this.shadowRoot.getElementById('tab_text').textContent = newValue;
                break;
            case 'icon':
                this.shadowRoot.getElementById('tab_img').src = newValue;
                break;
            case 'aria-selected':
                this.shadowRoot.querySelector('.tab_outer').classList.toggle('active', (newValue == 'true'));  
                break; 
            case 'mode':
                this.switchMode(newValue);
                break;
            case 'actions':
                break;
        }
    }
    switchMode(mode) {
        switch(mode){
            case 'pinned':
                this.shadowRoot.querySelector('.tab_outer').classList.add('pinned');
                this.shadowRoot.getElementById('tab_text').hidden = true;
                this.shadowRoot.getElementById('tab_close').hidden = true;
                break;
            case 'default':
            default:
                this.shadowRoot.querySelector('.tab_outer').classList.remove('pinned');
                this.shadowRoot.getElementById('tab_text').hidden = false;
                this.shadowRoot.getElementById('tab_close').hidden = false;
        }
    }
}