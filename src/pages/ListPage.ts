import * as _ from 'lodash';

import { App } from "..";
import Page from "./Page";
import BaseListItem from "../components/list-items/BaseListItem";
import ListItem from '../components/list-items/ListItem';

export default class ListPage extends Page {
    private _items: BaseListItem[] = [];
    private _selectedIndex: number = 0;

    constructor(app: App, title: string) {
        super(app, title);
    }
    
    init(parent: HTMLElement) {
        super.init(parent);

        this.addListItem(new ListItem("Item 1", "Subtitle 1"));
        this.addListItem(new ListItem("Item 2", "Subtitle 2"));
        this.addListItem(new ListItem("Item 3", "Subtitle 3"));

        this.render();
    }

    render() {
        this.renderList();
    }
    
    addListItem(item: BaseListItem) {
        item.init(this._root);
        this._items.push(item);
    }

    handleKeydown = (key: string) => { 
        switch(key) {
            case 'ArrowUp':
                this._selectedIndex--;
                if(this._selectedIndex < 0) this._selectedIndex = Math.max(0, this.calculateSelectables() - 1);
                this.renderList();
                break;
            case 'ArrowDown':
                this._selectedIndex++;
                if(this._selectedIndex >= this.calculateSelectables()) this._selectedIndex = 0;
                this.renderList();
                break;
        }
    };

    private renderList() {
        for(var item of this._items) {
            if(item.isSelectable)
                item.selected = this.calculateSelectableIndex(item) == this._selectedIndex;

            item.render();
        }
    }

    private calculateSelectableIndex(item: BaseListItem) {
        let i = _.indexOf(this._items, item);
        for(let h = 0; h < i; h++) {
            if(!this._items[h].isSelectable) i--;
        }
        return i;
    }

    private calculateSelectables(): number {
        let i = 0;
        for(var item of this._items) {
            if(item.isSelectable) i++;
        }
        return i;
    }    
}