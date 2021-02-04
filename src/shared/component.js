export class Component extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = this.template();

    const templateContent = template.content.cloneNode(true);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateContent);
  }
}
