import Page from "./Page";

export default class ListPage extends Page {
    private _items: ListItem[] = [];

    constructor(app: App, title: string) {
        super(app, title);
    }

}