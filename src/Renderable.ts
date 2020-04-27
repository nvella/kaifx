export default abstract class Renderable {
    private _unsureRoot?: HTMLElement;

    protected get _root(): HTMLElement {
        if(!this._unsureRoot) throw 'no root to render in (did you forget to call init()?)';
        return this._unsureRoot;
    }

    protected set _root(root: HTMLElement) {
        this._unsureRoot = root;
    }

    abstract init(parent: HTMLElement): void;
    dispose(): void { }
    
    needsInit(): boolean {
        return !this._unsureRoot;
    }
}