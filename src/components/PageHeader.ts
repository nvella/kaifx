import Renderable from "../Renderable";

export default class PageHeader extends Renderable {
    private _dirty: boolean = true;
    private _text: string = "";

    constructor(text: string)
    {
        super();
        this._text = text;
    }

    init(parent: HTMLElement) {
        this._root = document.createElement('div');
        this._root.className = 'kaifx-page-header';
        parent.appendChild(this._root);
    }

    needsRender = () => this._dirty;

    render(force: boolean = false) {
        if(!force && !this._dirty) return;

        this._root.innerText = this._text;

        this._dirty = false;
    }

    setText(text: string, deferRender: boolean = false) {
        if(this._text === text) return;
        
        this._text = text;
        this._dirty = true;

        if(!deferRender) this.render();
    }
}