import { db } from "../../db/ipfs";
import { Component } from "../../shared/component";

class AddContainer extends Component {
  async connectedCallback() {
    const textarea = this.shadowRoot.getElementById("textarea");
    const addButton = this.shadowRoot.getElementById("add-button");

    addButton.addEventListener("click", () => {
      db.add({ text: textarea.value });
    });
  }

  template() {
    return `
      <div>
        <textarea id="textarea"></textarea>
        <button id="add-button">Add</button>
      </div>
    `;
  }
}

customElements.define("add-container", AddContainer);
