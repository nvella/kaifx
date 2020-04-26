import App from "./App";
import Renderable from "./Renderable";

export interface ISoftkeyDefinitions {
    left?: string | null;
    centre?: string | null;
    right?: string | null;
}

export class SoftkeyManager extends Renderable {
    private _app: App;
    private _dirty: boolean = true;

    constructor(app: App) {
        super();
        this._app = app;
    }

    init(parent: HTMLElement) {
        this._root = document.createElement('div');
        this._root.className = 'kaifx-softkeys';
        parent.appendChild(this._root);
    }

    render(force: boolean = false) {
        if(!force && !this._dirty) return;

        this._root.innerHTML = `
        <span class="left">Left Key</span>
        <span class="centre">Centre Key</span>
        <span class="right">Right Key</span>
        `;

        this._dirty = false;
    }
}