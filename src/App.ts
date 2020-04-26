import { SoftkeyManager } from "./SoftkeyManager";
import Renderable from "./Renderable";

export default class App extends Renderable {
    private _softkeyMgr: SoftkeyManager;
    private _contentContainer?: HTMLDivElement;

    constructor()
    {
        super();
        this._softkeyMgr = new SoftkeyManager(this);
    }

    init(parent: HTMLElement) {
        if(!this.needsInit()) {
            console.log('not initing, already init');
            return;
        } 

        // Add a render root to the container
        // Style it appropiately
        // Set the keydown handler
        this._root = document.createElement('div');
        this._root.className = 'kaifx-app-root';
        this._root.onkeydown = this.handleKeydown;
        parent.appendChild(this._root);
        
        // Create the content container
        this._contentContainer = document.createElement('div');
        this._contentContainer.className = 'kaifx-content';
        this._root.appendChild(this._contentContainer);

        // Init the softkey manager
        this._softkeyMgr.init(this._root);
    }

    render(force: boolean = false) {
        super.render(force);
        
        // Render the softkey manager
        this._softkeyMgr.render()
    }

    private handleKeydown = (ev: KeyboardEvent) => {
        switch(ev.key) {
            default:
                console.log(`keypress: ${ev.key}`);
        }
    };
}