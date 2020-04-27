import Renderable from "../Renderable";
import { App } from "..";
import IReceivesInput from "../IReceivesInput";
import PageHeader from "../components/PageHeader";
import { ISoftkeyDefinitions } from "../SoftkeyManager";

export interface IPageState {
    pageTitle?: string | null;
    softkeys?: ISoftkeyDefinitions
}

export type AppUpdatePageStateCallback = (origin: Page, state: IPageState) => void;

export default class Page extends Renderable implements IReceivesInput {
    protected _app: App;    
    protected _updatePageStateCb: AppUpdatePageStateCallback;

    protected _title: string;
    protected _softkeys: ISoftkeyDefinitions = {
        left: null,
        centre: null,
        right: null
    };
    
    constructor(app: App, title: string)
    {
        super();
        this._app = app;
        this._title = title;
        this._softkeys.centre = title;

        this._updatePageStateCb = app.handleAppPageStateUpdate;
    }
    
    handleKeydown = (key: string) => { };
    
    handlePageEnter = () => { 
        this._root.hidden = !this.isPageActive();
        this.updatePageState();
    };
    
    handlePageLeave = () => { 
        this._root.hidden = true;
    };
    
    isPageActive = () => this._app.activePage === this;
    
    init(parent: HTMLElement) {
        this._root = document.createElement('div');
        this._root.className = 'kaifx-page';
        this._root.hidden = !this.isPageActive();
        parent.appendChild(this._root);

        this.render();
    }

    dispose() {
        this._root.remove();
    }

    protected setTitle(title: string) {
        if(this._title === title) return; // do nothing
        this._title = title;
        this.updatePageState();
    }

    protected setSoftkeys(softkeys: ISoftkeyDefinitions) {
        this._softkeys = softkeys;
        this.updatePageState();
    }

    private render(force: boolean = false): void {
        this._root.innerText = `${this._title}`;
    }

    private updatePageState() {
        this._updatePageStateCb(this,
            {
                pageTitle: this._title,
                softkeys: this._softkeys
            });
    }
}