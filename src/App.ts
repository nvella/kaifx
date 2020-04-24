export default class App {
    private _root: HTMLElement;

    constructor(root?: HTMLElement) {
        if(root instanceof HTMLElement) {
            this._root = root;
        } else {
            this._root = document.body;
        }
    }

    init() {
        // We need to:
        //  Set keydown handler 
        //  Perform the initial render

        this._root.onkeydown = this.handleKeydown;
    }

    render(): HTMLElement {
        let el = new HTMLSpanElement();
        el.innerHTML = 'hello world';
        return el;
    }

    private renderToRoot() {
        let newRoot = this.render();
        this._root.parentElement?.replaceChild(newRoot, this._root);
        this._root = newRoot;
    }

    private handleKeydown = (ev: KeyboardEvent) => {
        switch(ev.key) {
            default:
                console.log(`keypress: ${ev.key}`);
        }
    };
}