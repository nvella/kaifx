import BaseListItem from "./BaseListItem";
import Renderable from "../../Renderable";

export default class ListItem extends BaseListItem {
    private _title: string;
    private _subtitle: string | null;

    private _titleDiv?: HTMLElement;
    private _subtitleDiv?: HTMLElement;

    constructor(title: string, subtitle?: string) {
        super();
        
        this._title = title;
        this._subtitle = subtitle ?? null;
    }

    init(parent: HTMLElement) {
        super.init(parent);

        this._titleDiv = document.createElement('h1');
        this._root.appendChild(this._titleDiv);
        
        this._subtitleDiv = document.createElement('h2');
        this._root.appendChild(this._subtitleDiv);

        this.render();
    }
    
    render() {
        super.render();
        
        if(!this._titleDiv || !this._subtitleDiv) return;

        this._titleDiv.innerText = this._title;
        if(this._subtitle) {
            this._subtitleDiv.hidden = false;
            this._subtitleDiv.innerText = this._subtitle;
        } else {
            this._subtitleDiv.hidden = true;
        }
    }

    onClick = () => {};
}