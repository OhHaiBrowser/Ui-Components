export class Tab extends HTMLElement{ 
    #modes = {
        default: 'default',
        incognito: 'incog',
        pinned: 'pinned'
    };
    
    /**
     * 
     * @param {Object} opts 
     * @param {String} opts.mode
     * @param {String} opts.title
     * @param {String} opts.icon
     */
    constructor(opts = {}){
        super();

        let shadow = this.attachShadow({mode: 'open'}),
            outer = document.createElement('div'),
            btnMedia = document.createElement('a'),
            imgFavIco = document.createElement('img'),
            lblTitle = document.createElement('span'),
            btnClose = document.createElement('a'),
            stylesheet = document.createElement('style');

        outer.classList.add('ohhai-tab', opts.mode ? opts.mode : 'default');
        outer.addEventListener('click',() => {
            this.selected = true;
            this.dispatchEvent(new Event('select', {bubbles: true, composed: true}));
        });

        btnMedia.classList.add('tab-mediabtn', 'hidden');
        btnMedia.addEventListener('click', (e) => {
            e.stopPropagation();
            //Toggle play pause
            if(btnMedia.classList.contains('playing')){
                btnMedia.classList.remove('playing');
                btnMedia.classList.add('paused');
            }else{
                btnMedia.classList.remove('paused');
                btnMedia.classList.add('playing');
            }

            this.dispatchEvent(new Event('mediaClick', {bubbles: true, composed: true, detail: value}));
        });

        imgFavIco.classList.add('tab-favicon');
        imgFavIco.src = opts.icon ? opts.icon : '#';

        lblTitle.classList.add('tab-title');
        lblTitle.textContent = opts.title ? opts.title : 'New Tab';

        btnClose.classList.add('tab-close');
        btnClose.addEventListener('click', (e) => {
            e.stopPropagation();
            this.remove();
            this.dispatchEvent(new Event('close', {bubbles: true, composed: true}));
        });
        
        stylesheet.textContent = `
            
            /* Core tab styles */

            .ohhai-tab{display: flex; flex-direction: row; border-radius: 3px; user-select: none; height: 34px; min-width: 34px; transition: background-color 0.5s; cursor: pointer; outline: none; margin: 5px 0;}
            
            .tab-mediabtn{width: 16px; height: 16px; margin: 9px;}
                .tab-mediabtn.playing{}
                .tab-mediabtn.paused{}


            .tab-favicon{width: 16px; height: 16px; margin: 9px;}
            .tab-title{font-size: 13px; flex: 1; margin: 7px 4px 7px 4px; height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 20px;}
            .tab-close{width: 16px; height: 16px; border-radius: 8px; transition: background 0.3s, opacity 0.3s; margin: 9px 5px; opacity: 0;}
                .tab-close::before{content: "\\2716"; line-height: 16px; width: 16px; text-align: center; display: block; font-size: 10px;}
                    .tab-close:hover::before{color:#fff;}
                .tab-close:hover{background: #f53355;}

            .ohhai-tab.selected .tab-close{opacity: 1;}
            .ohhai-tab:hover .tab-close{opacity: 1;}
            
            .hidden{display: none;}

            /* Default tab styles */
            
            .ohhai-tab.default{width: 200px; background: #e4e4e4;}
                .ohhai-tab.default:hover{background-color: #dcdcdc;}
                .ohhai-tab.default.selected{background-color:#a2a7c2; box-shadow: 0px 1px 5px #999;}

            /* Incog tab styles */

            .ohhai-tab.incog{width: 200px; background-color:#708090}
                .ohhai-tab.incog:hover{}
                .ohhai-tab.incog .tab-title{color:#fff;}
                .ohhai-tab.incog .tab-close::before{color: #e4e4e4;}
                .ohhai-tab.incog.selected{background-color: #2F4F4F;}


            /* Pinned tab styles */

            .ohhai-tab.pinned{background: #e4e4e4; width: 34px;}
                .ohhai-tab.pinned:hover{background-color: #dcdcdc;}
                .ohhai-tab.pinned.selected{background-color:#a2a7c2; box-shadow: 0px 1px 5px #999;}
                .ohhai-tab.pinned .tab-title{display: none;} 
                .ohhai-tab.pinned .tab-close{display: none;}


        `;
        
        shadow.appendChild(stylesheet);
        shadow.appendChild(outer);
        outer.appendChild(btnMedia);
        outer.appendChild(imgFavIco);
        outer.appendChild(lblTitle);
        outer.appendChild(btnClose);
    }

    get mode(){
        let tabOuter = this.shadowRoot.querySelector('.ohhai-tab');
        return tabOuter.classList.contains('incog') ? this.modes.incognito : tabOuter.classList.contains('pinned') ? this.modes.pinned : this.modes.default;
    }

    setMode = {
        incognito(){

        },
        pinned(){

        },
        default(){

        }
    }

    set mode(value){
        let tabOuter = this.shadowRoot.querySelector('.ohhai-tab');
        tabOuter.classList.remove('default','incog','pinned');
        tabOuter.classList.add(value);
        this.dispatchEvent(new Event('modeChange', {bubbles: true, composed: true}));
    }
 
    set icon(value){
        let iconImg = this.shadowRoot.querySelector('.tab-favicon')
        iconImg.src = value;
    }
 
    get title(){
        return this.shadowRoot.querySelector('.tab-title').textContent;
    }
    set title(value){
        this.shadowRoot.querySelector('.tab-title').textContent = value;
        this.dispatchEvent(new Event('titleChange', {bubbles: true, composed: true, detail: value}));
    }

    get selected(){
        let tabOuter = this.shadowRoot.querySelector('.ohhai-tab');
        return tabOuter.classList.contains('selected');
    }
    set selected(value){
        let tabOuter = this.shadowRoot.querySelector('.ohhai-tab');
        tabOuter.classList.add('selected');
        this.dispatchEvent(new Event('selected', {bubbles: true, composed: true, detail: this}));
    }

    /**
     * Set the visiblity of the media controls
     * @param {Boolean} value 
     */
    showMediaControls(value){
        let mediaControl = this.shadowRoot.querySelector('.tab-mediabtn'),
            favicon = this.shadowRoot.querySelector('.tab-favicon');
        
        mediaControl.classList.toggle('hidden', value);
        mediaControl.classList.add('playing');

        favicon.classList.toggle('hidden', !value);
    }

    close(){
        this.remove();
        this.dispatchEvent(new Event('close', {bubbles: true, composed: true}));
    }

}