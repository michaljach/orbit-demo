import { Component } from "../../shared/component";
import { connect, disconnect, authorize } from "../../db/ipfs";
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

    db.events.on("replicated", (address) => {
      this.list = db
        .iterator({ limit: -1 })
        .collect()
        .map((item) => {
          return `<entry-component text="${item.payload.value.text}"></entry-component>`;
        })
        .join("");
      this.shadowRoot.getElementById("list").innerHTML = this.list;
    });

    this.shadowRoot.getElementById("list").innerHTML = this.list;
    const addContainer = this.shadowRoot.getElementById("add-container");
    addContainer.db = db;

    this.shadowRoot.getElementById(
      "peer"
    ).innerHTML = `<input type="text" value="${db.identity.id}">`;

    this.shadowRoot
      .getElementById("auth")
      .addEventListener("click", async () => {
        authorize(this.shadowRoot.getElementById("auth-id").value);
      });
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
      <div id="peer"></div>
      <add-container id="add-container"></add-container>
      <div id="list"></div>
      <input id="auth-id" type="text" value="">
      <button id="auth">authorize</button>
    `;
  }
}

customElements.define("app-container", AppContainer);
