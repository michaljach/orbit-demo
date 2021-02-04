import { Component } from "./shared/component";
import "./containers/AppContainer/AppContainer";

class App extends Component {
  template() {
    return `
      <app-container></app-container>
    `;
  }
}

customElements.define("app-main", App);
