const tabList = document.getElementById('tabList');
const favList = document.getElementById('favList');
const histList = document.getElementById('histList');

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('menuBtn').addEventListener('click', () => {
        new Contextual({
            isSticky: true,
            event: event,
            items: [
                {label: 'Settings', onClick: () => {  }}
            ]
        });
    });

    //#region Tab Events
    
    const tc = new NanoTabs('tabList', 'content', {showAddBtn: false});

    document.getElementById('addTab').addEventListener('click', () => {
        tc.addTab();
    });

    tc.on('tab-added', (tab, content) => {

        tab.addEventListener('closed', () => {
            tc.removeTab(tab.id);
        }, false);

        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";
        content.style.background = bgColor;
    });
    
    tc.on('tab-selected', (tab, content) => {
        console.log('tab selected', tab, content);
    });

    tc.on('tab-context-click', (tab, content) => {

        let menuItems = [];

        menuItems.push({label: 'New Tab', onClick: () => { tc.addTab(); }});
        menuItems.push({label: 'New Incognito Tab', onClick: () => { tc.addTab(); }});
        menuItems.push({type: 'seperator'});

        let groupItem = {type: 'submenu', label: 'Add tab to group', items: []};
        groupItem.items.push({label: 'New Group', onClick: () => {}});
        menuItems.push(groupItem);

        menuItems.push({label: 'Mute Tab', onClick: () => {}});
        if(tab.getAttribute('mode') == 'pinned') {
            menuItems.push({label: 'Undock Tab', onClick: () => {
                let firstDefault = tabList.querySelector('tab-element:not([mode=pinned])')

                tab.setAttribute('mode',null);
                firstDefault.before(tab);
            }});
        } else {
            menuItems.push({label: 'Dock Tab', onClick: () => { 
                let lastPinned = tabList.querySelectorAll('tab-element[mode=pinned]');
                lastPinned = lastPinned.item(lastPinned.length -1);

                tab.setAttribute('mode','pinned'); 
                lastPinned.after(tab);
            }});
        }
        menuItems.push({type: 'seperator'});
        menuItems.push({label: 'Close Tab', onClick: () => { tc.removeTab(tab.id); }});

        new Contextual({
            isSticky: false,
            event: event,
            items: menuItems
        });
    });
    
    tc.on('tab-removed', () => {
        console.log('tab removed');
    });
    
    tc.on('tab-allRemoved', () => {
        console.log('all tabs removed');
    });

    let tb1 = tc.addTab();
    tb1.tab.setAttribute('mode','pinned');
    tb1.tab.setAttribute('title','Tab 1');

    let tb2 = tc.addTab();
    let tb3 = tc.addTab();
    let tb4 = tc.addTab();
    
    //#endregion

    //#region Bookmark Events
    favList.addEventListener('item-click', (e) => {
        console.log(e.detail.url);
        let tb = tc.addTab();
        tb.tab.setAttribute('title','Tab 1');
    });

    favList.addEventListener('new-item', e => {
        const item = e.detail.el;

        item.addEventListener('contextmenu', function(e){
            e.preventDefault();
            new Contextual({
                isSticky: false,
                event: e,
                items: [
                    {label: 'test', onClick: () => {}}
                ]
            });
        });

    });

    favList.load([
        {title:'Link 1', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 2', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 3', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 4', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 5', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 6', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 6', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 6', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title:'Link 6', url:'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
    ]);



    document.getElementById('addFav').addEventListener('click', () => {
        console.log('Add Bookmark');
    });

    //#endregion

    //#region History Events
    
    histList.load([
        {title: 'Site 1', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-01-05T11:36:30.610Z'},
        {title: 'Site 1 - About us & really long title text with should shrink', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2021-01-05T11:36:30.610Z'},
        {title: 'Site 2', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-11-06T11:36:30.610Z'},
        {title: 'Site 3', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-11-05T11:36:30.610Z'},
        {title: 'Site 4', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-11-05T11:36:30.610Z'},
        {title: 'Site 5', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-12-05T11:36:30.610Z'},
        {title: 'Site 6', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-12-05T11:32:30.610Z'},
        {title: 'Site 7', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-12-05T11:34:30.610Z'},
        {title: 'Site 8', url: 'https://ohhaibrowser.com', icon: 'assets/favicon_default.png', timestamp: '2020-12-25T11:36:30.610Z'},
    ]);

    histList.addEventListener('item-click', (e) => {
        console.log(e.detail.url);
        let tb = tc.addTab();
        tb.tab.setAttribute('title','Tab 1');
    });

    histList.addEventListener('item-context', function(e) {
        let ogEvent = e.detail.event;
        console.log(e, event, ogEvent);
        new Contextual({
            isSticky: false,
            event: ogEvent,
            items: [
                {label: 'test', onClick: () => {}}
            ]
        });
    });

    //#endregion

});