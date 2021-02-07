import { Component } from "../../shared/component";

class EntryComponent extends Component {
  template() {
    return `
      <div>${this.getAttribute("text")}</div>
    `;
  }
}

customElements.define("entry-component", EntryComponent);
