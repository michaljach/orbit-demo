import { Component } from "../../shared/component";
import { connect } from "../../db/ipfs";
import "../../components/EntryComponent/EntryComponent";
import "../../containers/AddContainer/AddContainer";

class AppContainer extends Component {
  async connectedCallback() {
    const { db } = await connect();

    this.list = db
      .iterator({ limit: -1 })
      .collect()
      .map((item) => {
        return `<entry-component text="${item.payload.value.text}"></entry-component>`;
      })
      .join("");

    this.shadowRoot.getElementById("list").innerHTML = this.list;
    const addContainer = this.shadowRoot.getElementById("add-container");
    addContainer.db = db;
  }

  template() {
    return `
      <style>
        @import url('https://rsms.me/inter/inter.css');

        :host {
          font-family: 'Inter', sans-serif;
        }
      </style>

      <h1>Golf 🌎</h1>
      <add-container id="add-container"></add-container>
      <div id="list"></div>
    `;
  }
}

customElements.define("app-container", AppContainer);
