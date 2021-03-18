export class HamburgerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .hamburger_menu {
                    display: inline-block;
                    height: 30px;
                    width: 30px;
                }
                    .hamburger_menu > span {
                        display: block;
                        height: 3px;
                        margin: 5px 2px;
                        background: var(--controls-icon-default);
                        transition: background 0.2s;
                        border-radius: 5px;
                    }
                    .hamburger_menu:hover > span {
                        background: var(--controls-icon-hover);
                    }
                    .hamburger_menu:active > span {
                        background: var(--controls-icon-active);
                    }
            </style>
            <a class="hamburger_menu">
                <span></span>
                <span></span>
                <span></span>
            </a>
        `;
    }
}