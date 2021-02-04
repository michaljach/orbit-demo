# Zero dependency vanilla JS Web Components

Super easy and crazy fast.
[Learn more about Web Components.](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

- Zero dependecies
- Shadow DOM
- Encapsulated CSS and structure
- Simple and readable API
- Unbelievable performance

## Demo

[DEMO](https://michaljach.github.io/micro-web-components/)

## Getting started

Run `index.html`

### Example component

Reusable button component with styles.

```
class ButtonComponent extends Component {
  template() {
    return `
      <style>
        .button {
          cursor: pointer;
          background: #ccc;
          padding: 1rem;
          border: 0;
          border-radius: 0.4rem;
        }

        .button:hover {
          background: #999;
        }
      </style>

      <button class="button">${this.getAttribute("label")}</button>
    `;
  }
}

customElements.define("button-component", ButtonComponent);

```

#### Usage:

In another component (see `AppContainer.js`).

```
<button-component id="hello" label="Click me!"></button-component>
```
