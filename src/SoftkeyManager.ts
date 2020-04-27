import App from "./App";
import Renderable from "./Renderable";

export interface ISoftkeyDefinitions {
    left: string | null;
    centre: string | null;
    right: string | null;
}

export class SoftkeyManager extends Renderable {
    private _app: App;
    
    private _softkeys: ISoftkeyDefinitions = {
        left: null,
        centre: null,
        right: null
    }

    constructor(app: App) {
        super();
        this._app = app;
    }

    init(parent: HTMLElement) {
        this._root = document.createElement('div');
        this._root.className = 'kaifx-softkeys';
        parent.appendChild(this._root);

        this.render();
    }

    setSoftkeys(softkeys: ISoftkeyDefinitions)
    {
        this._softkeys = softkeys;
        this.render();
    }

    private render() {
        this._root.innerHTML = `
        <span class="left">${this._softkeys.left ?? ''}</span>
        <span class="centre">${this._softkeys.centre ?? ''}</span>
        <span class="right">${this._softkeys.right ?? ''}</span>
        `;
    }
}