import Renderable from "../Renderable";
import { App } from "..";
import IReceivesInput from "../IReceivesInput";
import PageHeader from "../components/PageHeader";

export interface IPageState {
    pageTitle?: string | null;
}

export type AppUpdatePageStateCallback = (origin: Page, state: IPageState) => void;

export default class Page extends Renderable implements IReceivesInput {
    protected _app: App;    
    protected _updatePageStateCb: AppUpdatePageStateCallback;

    protected _title: string;
    
    constructor(app: App, title: string)
    {
        super();
        this._app = app;
        this._title = title;

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
    }

    render(force: boolean = false): void {
        this._root.innerText = "Hello world!\nHello world!\nHello world!\nHello world!\nHello world!\nHello world!\nHello world!\nHello world!\nHello world!\nHello world!\nHello world!\n";
    }

    setTitle(title: string) {
        if(this._title === title) return; // do nothing
        this._title = title;
        this.updatePageState();
    }

    protected updatePageState() {
        this._updatePageStateCb(this,
            {
                pageTitle: this._title
            });
    }
}