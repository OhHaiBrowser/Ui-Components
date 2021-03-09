export class WebControls extends HTMLElement {
    static get observedAttributes() { return ['url', 'backAvailable', 'forwardAvailable']; }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .web_controls {
                    padding: 20px 0;
                    display: flex;
                    flex-direction: row;
                }
                    .web_controls > .nav_btn {
                        background: rgb(255 255 255 / 55%);
                        transition: background 0.5s;
                        border: none;
                        height: 35px;
                        width: 35px;
                        outline: none;
                        cursor: pointer;
                    }
                        .web_controls > .nav_btn.hidden {
                            display: none;
                        }
                        .web_controls > .nav_btn > svg {
                            margin: 3px;
                            color: rgb(0 0 0 / 55%);
                        }
                        .web_controls > .nav_btn:hover > svg {
                            color: rgb(0 0 0 / 70%);
                        } 

                    .web_controls > .nav_btn.back {
                        background: rgb(255 255 255);
                        border-radius: 2px 0 0 2px;
                    }
                    .web_controls > .nav_btn.forward {
                        border-radius: 0px 2px 2px 0px;
                    }
                        .web_controls > .nav_btn:hover {
                            background: rgb(255 255 255);
                        }


                    .web_controls > .url_outer {
                        flex: auto;
                        border-radius: 2px;
                        margin-left: 15px;
                        background: rgb(255 255 255 / 55%);
                        transition: background 0.5s;
                        border: none;                     
                        outline: none;
                        display:flex;
                        flex-direction: row;
                    }
                        .web_controls > .url_outer:hover{
                            background: rgb(255 255 255 / 70%);
                        }
                        .web_controls > .url_outer.active {
                            background: rgb(255 255 255 / 100%);
                            margin-left: 0px
                        }

                        .web_controls > .url_outer > .url_txt {
                            flex: auto;
                            border-radius: 0;
                            border: none;                     
                            outline: none;
                            padding: 9px;
                            font-size: 14px;     
                            background: transparent;                             
                        }

                        .web_controls > .url_outer > .refresh_btn {
                            transition: background 0.5s;
                            border: none;
                            height: 35px;
                            width: 35px;
                            outline: none;
                            cursor: pointer;
                            border-radius: 0px 2px 2px 0px;
                            margin-right: 2px;
                        }
                            .web_controls > .url_outer > .refresh_btn > svg {
                                margin: 8px;   
                                color: rgb(0 0 0 / 55%);
                            }
                            .web_controls > .url_outer > .refresh_btn:hover > svg {
                                color: rgb(0 0 0 / 70%);
                            }
            </style>
            <div class='web_controls'>
                <a class="nav_btn back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </a>
                <a class="nav_btn forward">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <div class='url_outer'>
                    <input type="url" class="url_txt"/>
                    <a class='refresh_btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                    </a>
                </div>
                
            </div>
        `;
        const urlOuter = this.shadowRoot.querySelector('.url_outer');
        const urlBar = this.shadowRoot.querySelector('.url_txt');
        const backBtn = this.shadowRoot.querySelector('.back');
        const forwardBtn = this.shadowRoot.querySelector('.forward');
        const refreshBtn = this.shadowRoot.querySelector('.refresh_btn');

        urlBar.addEventListener('focus', () => {
            urlOuter.classList.add('active');
            backBtn.classList.add('hidden');
            forwardBtn.classList.add('hidden');

        });
        urlBar.addEventListener('blur', () => {
            urlOuter.classList.remove('active');
            backBtn.classList.remove('hidden');
            forwardBtn.classList.remove('hidden');
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