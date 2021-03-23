export class WebControls extends HTMLElement {
    static get observedAttributes() { return ['url', 'backAvailable', 'forwardAvailable']; }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="plugins/iconmonstr/css/iconmonstr-iconic-font.min.css">
            <style>
                .web_controls {
                    padding: 15px 0;
                    display: flex;
                    flex-direction: row;
                }
                .web_controls > .nav_btn.back {
                    border-radius: 2px 0 0 2px;
                }
                .web_controls > .nav_btn.forward {
                    border-radius: 0px 2px 2px 0px;
                }

                    .web_controls > .nav_btn {
                        background: var(--controls-default);      
                        transition: background 0.5s;
                        border: none;
                        height: var(--timeline-item-height);
                        width: var(--timeline-item-width);
                        outline: none;
                        cursor: pointer;
                    }
                        .web_controls > .nav_btn:enabled:hover {
                            background: var(--controls-hover);
                        }
                        .web_controls > .nav_btn:disabled {
                            cursor: default;
                            background: var(--controls-disabled);
                            box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
                        }

                        .web_controls > .nav_btn:enabled:active {
                            box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
                            background: var(--controls-active);
                        }
                            .web_controls > .nav_btn.hidden {
                                display: none;
                            }
                                .web_controls > .nav_btn > i {
                                    font-size: 16px;
                                    line-height: var(--timeline-item-height);
                                    text-align: center;
                                    width: 100%;
                                    height: 100%;
                                    color: var(--controls-icon-default);
                                }
                                .web_controls > .nav_btn:disabled > i {
                                    font-size: 14px;
                                    color: var(--controls-icon-disabled);
                                }
                                .web_controls > .nav_btn:enabled:hover > i {
                                    color: var(--controls-icon-hover);
                                } 
                                .web_controls > .nav_btn:enabled:active > i {
                                    font-size: 14px;
                                    color: var(--controls-icon-active);
                                }



                    .web_controls > .url_outer {
                        height: var(--timeline-item-height);
                        flex: auto;
                        border-radius: 2px;
                        margin-left: 15px;
                        background: var(--controls-default);
                        transition: background 0.5s;
                        border: none;                     
                        outline: none;
                        display:flex;
                        flex-direction: row;
                        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
                    }
                        .web_controls > .url_outer:hover{
                            background: var(--controls-hover);
                        }
                        .web_controls > .url_outer.active {
                            background: var(--controls-active);
                            margin-left: 0px
                        }

                        .web_controls > .url_outer > .cert {
                            outline:none;
                            border:none;
                        }

                        .web_controls > .url_outer > .url_txt {
                            flex: auto;
                            border-radius: 0;
                            border: none;                     
                            outline: none;
                            padding: 10px;
                            font-size: 14px;     
                            background: transparent;
                            width: 100px;                          
                        }
            </style>
            <div class='web_controls'>
                <button class="nav_btn back" disabled><i class="im im-angle-left"></i></button>
                <button class='nav_btn refresh'><i class="im im-redo"></i></button>
                <button class="nav_btn forward" disabled><i class="im im-angle-right"></i></button>
                <div class='url_outer'>
                    <button class='cert'></button>
                    <input type="url" class="url_txt"/>
                </div>
                
            </div>
        `;
        const urlOuter = this.shadowRoot.querySelector('.url_outer');
        const urlBar = this.shadowRoot.querySelector('.url_txt');
        const backBtn = this.shadowRoot.querySelector('.back');
        const forwardBtn = this.shadowRoot.querySelector('.forward');
        const refreshBtn = this.shadowRoot.querySelector('.refresh');

        urlBar.addEventListener('focus', () => {
            urlOuter.classList.add('active');
            backBtn.classList.add('hidden');
            forwardBtn.classList.add('hidden');
            refreshBtn.classList.add('hidden');

        });
        urlBar.addEventListener('blur', () => {
            urlOuter.classList.remove('active');
            backBtn.classList.remove('hidden');
            forwardBtn.classList.remove('hidden');
            refreshBtn.classList.remove('hidden');
        });

        backBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('back'));
        });
        forwardBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('forward'));
        });
        refreshBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('refresh'));
        });
    }
    connectedCallback() {
        
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'url':
            case 'backAvailable':
            case 'forwardAvailable':
        }
    }
}