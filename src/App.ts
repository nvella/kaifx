import * as _ from 'lodash';

import { SoftkeyManager } from "./SoftkeyManager";
import Renderable from "./Renderable";
import IReceivesInput from "./IReceivesInput";
import Page, { IPageState } from "./pages/Page";
import PageHeader from './components/PageHeader';

export interface IAppOptions {
    /** Hook the document keydown event for input. Set to false to call handleKeydown yourself.  */
    hookDocumentKeydown: boolean;
}

export default class App extends Renderable {
    private _options: IAppOptions;
    private _softkeyMgr: SoftkeyManager;

    private _pageHeader: PageHeader;
    private _pageContent?: HTMLElement;

    private _stack: Page[] = [];
    public get activePage(): Page | null {
        return _.last(this._stack) ?? null;
    }

    constructor(options: IAppOptions = { 
        hookDocumentKeydown: true 
    })
    {
        super();

        this._options = options;
        this._pageHeader = new PageHeader("");
        this._softkeyMgr = new SoftkeyManager(this);
    }

    init(parent: HTMLElement) {
        if(!this.needsInit()) {
            console.log('not initing, already init');
            return;
        } 

        // Set the keydown handler
        if(this._options.hookDocumentKeydown) 
            document.onkeydown = this.handleKeydownEvent;

        // Add a render root to the container
        // Style it appropiately
        this._root = document.createElement('div');
        this._root.className = 'kaifx-app-root';
        parent.appendChild(this._root);

        // Init the page header
        this._pageHeader.init(this._root);
        
        // Create the page content container
        this._pageContent = document.createElement('div');
        this._pageContent.className = 'kaifx-page-content';
        this._root.appendChild(this._pageContent);

        // Init the softkey manager
        this._softkeyMgr.init(this._root);
    }

    setOnlyPage(page: Page) {
        if(!this._pageContent) throw 'cannot set page without page content (did you forget to call App#init()?)';

        // Handle leave of current page and destory all existing pages
        if(this.activePage) this.activePage.handlePageLeave();
        for(var page of this._stack) page.dispose();
        this._stack = [];

        this._stack.push(page);

        if(page.needsInit()) page.init(this._pageContent);
        page.handlePageEnter();
    }

    pushPage(page: Page) {
        if(!this._pageContent) throw 'cannot set page without page content (did you forget to call App#init()?)';
        
        if(this.activePage) this.activePage.handlePageLeave();
        
        this._stack.push(page);
        if(page.needsInit()) page.init(this._pageContent);
        page.handlePageEnter();
    }

    popPage() {
        if(this._stack.length < 2 || !this.activePage) return;
    
        let page = this.activePage;
        this.activePage.handlePageLeave();
        this._stack.pop();
        page.dispose();

        this.activePage.handlePageEnter();
    }
    
    handleAppPageStateUpdate = (page: Page, pageState: IPageState) => {
        if(page !== this.activePage) console.log('not updating page state for inactive page');

        if(typeof(pageState.pageTitle) === 'string') {
            this._pageHeader.setText(pageState.pageTitle);
        }

        if(typeof(pageState.softkeys) === 'object')
            this._softkeyMgr.setSoftkeys(pageState.softkeys);
    }
    
    handleKeydownEvent = (ev: KeyboardEvent) => {
        switch(ev.key) {
            case 'ArrowRight':
                let newPage = new Page(this, `Page ${this._stack.length + 1}`);
                this.pushPage(newPage);
                break;
            case 'Backspace':
                if(this._stack.length > 2) {
                    this.popPage();
                    ev.preventDefault();
                }

                break;
            default:
                console.log(`keypress: ${ev.key}`);
                if(this.activePage) {
                    console.log('  passing to page');
                    this.activePage.handleKeydown(ev.key);
                }
        }
    };
}