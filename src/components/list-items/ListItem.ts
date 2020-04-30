import Renderable from "../../Renderable";

export default abstract class ListItem extends Renderable {
    private _selected: boolean = false;

    public get selected(): boolean { return this.selected; }
    public set selected(val: boolean) {
        if(val === this._selected) return;
        this._selected = val;
        this.render();
    }

    init(parent: HTMLElement): void {
        this._root = document.createElement('div');
        this._root.className = 'kaifx-listitem';
        parent.appendChild(this._root);
    }

    deinit() {
        this._root.remove();
    }

    abstract onSelect(): void;

    private render() {
        // Set CSS class
        let cssClass = 'kaifx-listitem';
        if(this._selected) cssClass += ' selected';
        this._root.className = cssClass;
    }
}