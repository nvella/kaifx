export default abstract class Renderable {
    private _unsureRoot?: HTMLElement;
    protected _children: Renderable[] = [];

    protected get _root(): HTMLElement {
        if(!this._unsureRoot) throw 'no root to render in (did you forget to call init()?)';
        return this._unsureRoot;
    }

    protected set _root(root: HTMLElement) {
        this._unsureRoot = root;
    }

    abstract init(parent: HTMLElement): void;
    
    needsInit(): boolean {
        return !this._unsureRoot;
    }

    needsRender(): boolean {
        // simple short circuit needsRender condition check
        for(var child of this._children)
        {
            if(child.needsRender()) return true;
        }
        return false;
    }

    addChild(child: Renderable)
    {
        this._children.push(child);
    }

    render(force: boolean = false): void {
        if(!force && !this.needsRender()) console.log(`no render required for ${this}`);
        
        for(var child of this._children)
        {
            if(force || child.needsRender()) child.render();
        }
    }
}