import IRenderable from "./IRenderable";
import App from "./App";

const renderSoftkey = (text: string, cssClass: string) => {
    let span = document.createElement('span');
    span.innerText = text;
    span.className = cssClass;
    return span;
};

export class SoftkeyManager implements IRenderable {
    private _app: App;

    constructor(app: App) {
        this._app = app;
    }

    render(): HTMLElement {
        let root = document.createElement('div');
        root.className = 'kaifx-softkeys';

        root.appendChild(renderSoftkey('Left Key', 'left'));
        root.appendChild(renderSoftkey('Select', 'centre'));
        root.appendChild(renderSoftkey('Right Key', 'right'));

        return root;
    }
}