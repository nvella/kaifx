import App from "./App";
import Renderable from "./Renderable";

export class SoftkeyManager extends Renderable {
    private _app: App;
    private _dirty: boolean = true;

    constructor(app: App) {
        super();
        this._app = app;
    }

    needsRender = () => this._dirty;

    init(parent: HTMLElement) {
        this._root = document.createElement('div');
        this._root.className = 'kaifx-softkeys';
        parent.appendChild(this._root);
    }

    render() {
        super.render();

        this._root.innerHTML = `
        <span class="left">Left Key</span>
        <span class="centre">Centre Key</span>
        <span class="right">Right Key</span>
        `;

        this._dirty = false;
    }
}