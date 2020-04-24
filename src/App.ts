import IRenderable from "./IRenderable";
import { SoftkeyManager } from "./SoftkeyManager";

export default class App implements IRenderable {
    private _root: HTMLElement;

    private _softkeyMgr: SoftkeyManager;

    constructor(root?: HTMLElement) {
        if(root instanceof HTMLElement) {
            this._root = root;
        } else {
            this._root = document.body;
        }

        this._softkeyMgr = new SoftkeyManager(this);
    }

    init() {
        // We need to:
        //  Set keydown handler 
        //  Perform the initial render

        this._root.onkeydown = this.handleKeydown;

        this.renderInsideRoot();
    }

    render(): HTMLElement[] {
        return [
            this._softkeyMgr.render()
        ];
    }

    private renderInsideRoot() {
        this._root.textContent = '';
        for(var el of this.render()) this._root.appendChild(el); // there is probably a smarter way to do this
    }

    private handleKeydown = (ev: KeyboardEvent) => {
        switch(ev.key) {
            default:
                console.log(`keypress: ${ev.key}`);
        }
    };
}