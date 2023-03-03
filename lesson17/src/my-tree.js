import {css, html, LitElement} from "lit";
import "./my-leaf.js"

class MyTree extends LitElement {
    static properties = {
        data: Object,
    };

    static get styles() {
        return css`
            div {
              padding: 20px;
              margin: 20px;
              border: 2px solid #aaa;
              border-radius: 10px;
            }
        `
    }

    render() {
        let parseData = JSON.parse(this.data)

        return html`
            <div id="my-tree">
                
                <my-leaf data="${parseData.id}">
                    <br>
                    ${parseData.items?.map(
                            (item) => html`Items: <my-tree data="${JSON.stringify(item)}"></my-tree>`
                    )}
                </my-leaf>
            </div>
        `
    }
}

customElements.define("my-tree", MyTree)
