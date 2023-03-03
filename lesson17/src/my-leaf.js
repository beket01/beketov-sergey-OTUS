import {html, LitElement} from "lit";

class MyLeaf extends LitElement {
    static properties = {
        data: String,
    };

    render() {
        return html`
            <div>
                Id: ${this.data}
                <slot></slot>
            </div>`
    }
}

customElements.define("my-leaf", MyLeaf)
