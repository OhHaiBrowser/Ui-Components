export class Tab extends HTMLElement {
    static get observedAttributes() { return ['aria-selected', 'mode', 'icon', 'title', 'actions']; }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="plugins/iconmonstr/css/iconmonstr-iconic-font.min.css">
            <style>
                .tab_outer {;
                    background: var(--controls-default);
                    border-radius: 2px;
                    height: 100%;
                    width: 100%;
                    display:flex;
                    align-items: center;
                    flex-direction: row;
                    box-sizing: border-box;
                    user-select:none;
                    transition: background 0.25s;
                    outline:none;
                }
                .tab_outer.pinned {
                    margin: 0;
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    aspect-ratio: 1/1;
                }
                    .tab_outer:hover{
                        background: var(--controls-hover);
                    }
                    .tab_outer.active {
                        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
                        background: var(--controls-active);
                    }
                .square_outer {
                    height:100%;
                    aspect-ratio: 1/1;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                .square_outer[hidden]{
                    display:none;
                }

                    #tab_img {
                        height: 16px;
                        width: 16px;               
                    }
                #tab_text {
                    flex:auto;
                    font-size: 14px;
                    height: 16px;
                    line-height: 16px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;          
                }
                #tab_close {
                    height:16px;
                    width: 16px;
                    border-radius:2px;
                    border:none;
                    background: transparent;
                    transition: background 0.25s;
                    outline:none;
                    padding:0;
                }
                    #tab_close:hover {
                        background: rgb(223 35 35 / 100%) !important;
                    }
                    .tab_outer.active #tab_close {
                        background: rgb(223 35 35 / 55%);
                    }

                    #tab_close > i {
                        font-size: 8px;
                        display:block;
                        margin:0px 2px;
                        color: transparent;
                    }
                        #tab_close:hover > i {
                            color: rgb(255 255 255 / 100%) !important;
                        }
                        .tab_outer.active #tab_close > i, .tab_outer:hover #tab_close > i {
                            color: rgb(0 0 0 / 55%);
                        }
            </style>
            <div class='tab_outer'>
                <div class='square_outer'>
                    <img id='tab_img'/>
                </div>       
                <span id='tab_text'></span>
                <div class='square_outer close'>
                    <button id='tab_close'><i class="im im-x-mark"></i></button>
                </div> 
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
                this.shadowRoot.querySelector('.square_outer.close').hidden = true;
                break;
            case 'default':
            default:
                this.shadowRoot.querySelector('.tab_outer').classList.remove('pinned');
                this.shadowRoot.getElementById('tab_text').hidden = false;
                this.shadowRoot.querySelector('.square_outer.close').hidden = false;
        }
    }
}